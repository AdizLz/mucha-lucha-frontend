import { useEffect, useState } from "react";
import { getProductos } from "../services/productosService";
import CardProducto from "../components/CardProducto";
import { useCarrito } from "../context/CarritoContext";
import "./Mercancia.css";

const CATEGORIAS = [
  { id: "mascaras", nombre: "Máscaras" },
  { id: "ropa", nombre: "Ropa" },
  { id: "juguetes", nombre: "Juguetes" },
  { id: "posters", nombre: "Pósters" },
];
  
  function quitarAcentos(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
export default function Mercancia() {
  const [productos, setProductos] = useState([]);
  const [categoriasActivas, setCategoriasActivas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const { agregar } = useCarrito();




  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  useEffect(() => {
    if (!popupVisible) return;
    const t = setTimeout(() => setPopupVisible(false), 2000);
    return () => clearTimeout(t);
  }, [popupVisible]);

  const toggleCategoria = (id) => {
    setCategoriasActivas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
 
  const visibles = productos.filter((p) => {
    const coincideCategoria =
      categoriasActivas.length === 0 || categoriasActivas.includes(p.categoria);
    const coincideBusqueda = quitarAcentos(p.nombre).includes(
      quitarAcentos(busqueda)
    );
    return coincideCategoria && coincideBusqueda;
  });
  

  const agregarAlCarrito = (producto) => {
    agregar(producto);
    setPopupVisible(true);
  };

  return (
    <main className="mercancia-page">
      {/* HEADER */}
      <section className="mercancia-hero">
        <div className="page-container">
          <p className="section-kicker mb-0">🛍️ Tienda Oficial</p>
          <h1 className="section-title mb-0">
            MERCANCÍA <span className="text-accent">OFICIAL</span>
          </h1>
        </div>
      </section>

      <div className="page-container mercancia-layout">
        {/* SIDEBAR */}
        <aside className="mercancia-sidebar">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <h4 className="sidebar-title">Categoría</h4>
          <ul className="sidebar-filtros">
            {CATEGORIAS.map((cat) => (
              <li key={cat.id}>
                <label className="checkbox-filtro">
                  <input
                    type="checkbox"
                    checked={categoriasActivas.includes(cat.id)}
                    onChange={() => toggleCategoria(cat.id)}
                  />
                  {cat.nombre}
                </label>
              </li>
            ))}
          </ul>

          {categoriasActivas.length > 0 && (
            <button
              className="btn-limpiar-filtros"
              onClick={() => setCategoriasActivas([])}
            >
              Limpiar filtros ✕
            </button>
          )}
        </aside>

        {/* GRID */}
        <section className="mercancia-grid-wrap">
          <p className="resultados-count">{visibles.length} productos</p>

          {visibles.length === 0 ? (
            <p className="text-muted">No encontramos productos con ese filtro.</p>
          ) : (
            <div className="productos-grid-full">
              {visibles.map((p) => (
                <CardProducto key={p.id} producto={p} onAgregar={agregarAlCarrito} />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className={`popup ${popupVisible ? "show-popup" : ""}`}>
        ✅ Producto agregado al carrito
      </div>
    </main>
  );
}