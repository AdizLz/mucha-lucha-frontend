import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
// Íconos de react-icons en vez de emojis: se ven consistentes en cualquier
// sistema operativo/navegador (los emojis se dibujan distinto en Windows,
// Mac, Android, etc. y eso rompe la armonía visual).
import { FaShoppingCart, FaTimes, FaMask } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { items, quitar } = useCarrito();
  const total = items.reduce((acc, p) => acc + p.precio, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top px-4 ${scrolled ? "scrolled" : ""}`}>
      <div className="container-fluid navbar-inner">
        <NavLink className="navbar-brand" to="/">
          <FaMask className="brand-icon" />
          <span className="brand-text">
            MUCHA<span className="text-accent-alt"> LUCHA</span>
          </span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/mercancia">Mercancía</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/noticias">Noticias</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/luchadores">Luchadores</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/galeria">Galería</NavLink></li>

            <li className="nav-item carrito-wrapper">
              <button
                className="carrito-btn"
                onClick={() => setCarritoAbierto((prev) => !prev)}
              >
                <FaShoppingCart />
                <span className="carrito-contador">{items.length}</span>
              </button>

              {carritoAbierto && (
                <div className="carrito-dropdown">
                  {items.length === 0 ? (
                    <p className="carrito-vacio">Tu carrito está vacío</p>
                  ) : (
                    <>
                      <ul className="carrito-lista">
                        {items.map((p, i) => (
                          <li key={`${p.id}-${i}`} className="carrito-item">
                            <img src={p.img} alt={p.nombre} />
                            <div className="carrito-item-info">
                              <span>{p.nombre}</span>
                              <span className="carrito-item-precio">
                                ${p.precio.toLocaleString()}
                              </span>
                            </div>
                            <button
                              className="carrito-item-quitar"
                              onClick={() => quitar(p.id)}
                              aria-label="Quitar producto"
                            >
                              <FaTimes />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="carrito-total">
                        <span>Total</span>
                        <strong>${total.toLocaleString()}</strong>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>

            <li className="nav-item">
              <button className="btn btn-danger btn-sm iniciar-sesion-btn">
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}