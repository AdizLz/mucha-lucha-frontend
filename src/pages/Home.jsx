// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getProductos } from "../services/productosService";
import "./Home.css";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  return (
    <main className="site-home">
      {/* HERO */}
      <section className="hero-home">
        <div className="page-container hero-content">
          <span className="evento-badge">
            <span className="dot-rojo"></span> Próximo Evento: Triplemania XXXII
          </span>

          <h1 className="hero-title">
            DONDE LA<br />
            <span className="text-accent">LEYENDA</span><br />
            SE FORJA
          </h1>

          <p className="hero-subtitle">
            La plataforma definitiva de lucha libre mexicana. Eventos en vivo,
            mercancía oficial y las noticias más calientes del ring.
          </p>

          <a href="#mercancia" className="btn btn-danger btn-lg mt-3">
            Ver lo último en lucha
          </a>
        </div>
      </section>

      {/* MERCANCÍA */}
      <section className="mercancia-section" id="mercancia">
        <div className="page-container">
          <div className="section-heading d-flex justify-content-between align-items-end">
            <div>
              <p className="section-kicker mb-0">🛍️ Tienda Oficial</p>
              <h2 className="section-title mb-0">
                MERCANCÍA <span className="text-accent">OFICIAL</span>
              </h2>
            </div>
            <a href="/mercancia" className="section-link">Ver tienda →</a>
          </div>

          <div className="productos-grid">
            {productos.map((p) => (
              <article className="producto-card" key={p.id}>
                {p.badge && <span className="producto-badge">{p.badge}</span>}
                <img src={p.img} alt={p.nombre} className="producto-img" />
                <div className="producto-body">
                  <h3>{p.nombre}</h3>
                  <p>${p.precio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}