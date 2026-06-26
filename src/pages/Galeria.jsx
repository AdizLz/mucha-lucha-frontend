import { useEffect, useState, useRef } from "react";
import { getGaleria } from "../services/galeriaService";
import CardGaleria from "../components/CardGaleria";
import "./Galeria.css";

const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "eventos", nombre: "Eventos" },
  { id: "mascaras", nombre: "Máscaras" },
  { id: "fans", nombre: "Fans" },
  { id: "leyendas", nombre: "Leyendas" },
];

export default function Galeria() {
  const [items, setItems] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [seleccionado, setSeleccionado] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    getGaleria().then(setItems);
  }, []);

  const visibles =
    categoriaActiva === "todos"
      ? items
      : items.filter((i) => i.categoria === categoriaActiva);

  const scrollAGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="galeria-page">

     {/* HEADER */}
      <section className="galeria-hero">
        <div className="page-container">
          <p className="section-kicker mb-0">Revive los mejores</p>
          <h1 className="section-title mb-0">
            MOMENTOS DEL <span className="text-accent">RING</span>
          </h1>
          <p className="galeria-subtitle">
            Las mejores luchas, los luchadores más icónicos y la pasión de los
            fans, todo en un solo lugar.
          </p>
        </div>
      </section>



      {/* FILTROS + GRID */}
      <section className="page-container galeria-content" ref={gridRef}>
        <div className="filtros-categoria">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              className={`filtro-btn ${categoriaActiva === cat.id ? "active" : ""}`}
              onClick={() => setCategoriaActiva(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
          <span className="contador-galeria">{visibles.length} fotos</span>
        </div>

        <div className="galeria-grid">
          {visibles.map((item) => (
            <CardGaleria key={item.id} item={item} onClick={setSeleccionado} />
          ))}
        </div>
      </section>

      {/* LIGHTBOX propio, sin Bootstrap modal */}
      {seleccionado && (
        <div className="lightbox" onClick={() => setSeleccionado(null)}>
          <button className="lightbox-cerrar" onClick={() => setSeleccionado(null)}>
            ✕
          </button>
          <img
            src={seleccionado.img}
            alt={seleccionado.alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          {seleccionado.nombre && (
            <p className="lightbox-caption">{seleccionado.nombre}</p>
          )}
        </div>
      )}
    </main>
  );
}