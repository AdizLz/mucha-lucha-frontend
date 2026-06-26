// src/components/CardProducto.jsx
export default function CardProducto({ producto, onAgregar }) {
  return (
    <div className="card-producto">
      {producto.badge && <span className="producto-badge">{producto.badge}</span>}
      <div className="card-producto-imgwrap">
        <img src={producto.img} alt={producto.nombre} className="producto-img" />
      </div>
      <div className="producto-body">
        <h3>{producto.nombre}</h3>
        <p className="producto-precio">${producto.precio.toLocaleString()}</p>
        <button className="btn btn-danger btn-sm w-100" onClick={() => onAgregar(producto)}>
          🛒 Agregar
        </button>
      </div>
    </div>
  );
}