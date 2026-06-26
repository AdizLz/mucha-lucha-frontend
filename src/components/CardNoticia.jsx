export default function CardNoticia({ noticia, compacta = false }) {
  if (compacta) {
    return (
      <a href={noticia.link} className="card-noticia-compacta">
        <img src={noticia.img} alt={noticia.titulo} className="compacta-img" />
        <div className="compacta-body">
          <span className="card-noticia-tag">{noticia.categoria}</span>
          <h4>{noticia.titulo}</h4>
        </div>
      </a>
    );
  }

  return (
    <article className="card-noticia">
      <div className="card-noticia-imgwrap">
        <img src={noticia.img} alt={noticia.titulo} className="card-noticia-img" />
        <span className="card-noticia-tag tag-flotante">{noticia.categoria}</span>
      </div>
      <div className="card-noticia-body">
        <h3>{noticia.titulo}</h3>
        <p>{noticia.texto}</p>
        <a href={noticia.link} className="card-noticia-link">Leer más →</a>
      </div>
    </article>
  );
}