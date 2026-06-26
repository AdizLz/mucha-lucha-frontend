import { useEffect, useState } from "react";
import { getLuchadores } from "../services/luchadoresService";
import CardLuchador from "../components/CardLuchador";
import "./Luchadores.css";

export default function Luchadores() {
  const [luchadores, setLuchadores] = useState([]);
  const [filtroBando, setFiltroBando] = useState("Todos");

  useEffect(() => {
    getLuchadores().then(setLuchadores);
  }, []);

  const visibles =
    filtroBando === "Todos"
      ? luchadores
      : luchadores.filter((l) => l.bando === filtroBando);

  return (
    <main className="luchadores-page">
      {/* HEADER */}
      <section className="luchadores-header">
        <div className="page-container">
          <p className="section-kicker mb-0">🤼 Salón de la Fama</p>
          <h1 className="section-title mb-0">
            ALGUNOS <span className="text-accent">LUCHADORES</span>
          </h1>
          <p className="noticias-subtitle">
            Las leyendas que forjaron la historia del ring mexicano.
          </p>
        </div>
      </section>

      {/* FILTROS + GRID */}
      <section className="page-container luchadores-content">
        <div className="filtros-bando">
          {["Todos", "Tecnico", "Rudo"].map((b) => (
            <button
              key={b}
              className={`filtro-btn ${filtroBando === b ? "active" : ""}`}
              onClick={() => setFiltroBando(b)}
            >
              {b === "Tecnico" ? "Técnicos" : b === "Rudo" ? "Rudos" : "Todos"}
            </button>
          ))}
          <span className="contador-luchadores">{visibles.length} luchadores</span>
        </div>

        <div className="luchadores-grid">
          {visibles.map((l) => (
            <CardLuchador key={l.id} luchador={l} />
          ))}
        </div>
      </section>
    </main>
  );
}