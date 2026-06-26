import { useEffect, useState } from "react";
import { getNoticias } from "../services/noticiasService";
import CardNoticia from "../components/CardNoticia";
import "./Noticias.css";

function quitarAcentos(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getNoticias().then(setNoticias);
  }, []);

  const destacada = noticias.find((n) => n.destacada);
  const secundarias = noticias.filter((n) => !n.destacada).slice(0, 3);
  const resto = noticias.filter((n) => !n.destacada);

  const visibles = resto.filter((n) =>
    quitarAcentos(n.titulo).includes(quitarAcentos(busqueda))
  );

  return (
    <main className="noticias-page">

      {/* HEADER */}
      <section className="noticias-header">
        <div className="page-container">
          <p className="section-kicker mb-0">Última Hora</p>
          <h1 className="section-title mb-0">
            Noticias <span className="text-accent">DESTACADAS</span>
          </h1>
          <p className="noticias-subtitle">
            Toda la información del mundo de la lucha libre mexicana.
          </p>
        </div>
      </section>

      {/* MAGAZINE: destacada + secundarias */}
      {destacada && (
        <section className="page-container noticia-magazine">
          <div className="destacada-grande">
            <img src={destacada.img} alt={destacada.titulo} className="destacada-img" />
            <div className="destacada-overlay">
              <span className="card-noticia-tag">{destacada.categoria}</span>
              <h2>{destacada.titulo}</h2>
              <p>{destacada.texto}</p>
              <a href={destacada.link} className="btn btn-danger btn-sm mt-2">
                Leer la nota completa
              </a>
            </div>
          </div>

          <div className="secundarias-lista">
            {secundarias.map((n) => (
              <CardNoticia key={n.id} noticia={n} compacta />
            ))}
          </div>
        </section>
      )}

      {/* GRID GENERAL + BUSCADOR */}
      <section className="page-container noticias-grid-wrap">
        <div className="grid-header">
          <h3>Todas las noticias</h3>
          <input
            type="text"
            className="form-control buscador-noticias"
            placeholder="Buscar chisme o luchador..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {visibles.length === 0 ? (
          <p className="text-muted">No encontramos noticias con ese filtro.</p>
        ) : (
          <div className="noticias-grid">
            {visibles.map((n) => (
              <CardNoticia key={n.id} noticia={n} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}