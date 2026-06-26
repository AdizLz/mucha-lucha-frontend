export default function CardGaleria({ item, onClick }) {
  return (
    <div className="card-galeria" onClick={() => onClick(item)}>
      <img src={item.img} alt={item.alt} className="galeria-img" loading="lazy" />
      {item.nombre && (
        <div className="galeria-overlay">
          <h4>{item.nombre}</h4>
        </div>
      )}
    </div>
  );
}