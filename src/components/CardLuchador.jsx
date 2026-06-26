// src/components/CardLuchador.jsx
export default function CardLuchador({ luchador }) {
  const esRudo = luchador.bando === "Rudo";

  return (
    <article className={`card-luchador ${esRudo ? "rudo" : "tecnico"}`}>
      <div className="luchador-imgwrap">
        <img src={luchador.imagen} alt={luchador.nombre} className="luchador-img" />
        <span className={`bando-badge ${esRudo ? "badge-rudo" : "badge-tecnico"}`}>
          {luchador.bando}
        </span>
      </div>
      <div className="luchador-body">
        <h3>{luchador.nombre}</h3>
        <p className="luchador-tecnica">⚡ {luchador.tecnica}</p>
        <p className="luchador-bio">{luchador.biografia}</p>
      </div>
    </article>
  );
}