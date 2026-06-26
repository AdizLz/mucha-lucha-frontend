import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top px-4 ${scrolled ? "scrolled" : ""}`}>
      <div className="container-fluid navbar-inner">
        <NavLink className="navbar-brand" to="/">
          <span className="brand-icon">🤼‍♂️</span>
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

            <li className="nav-item ms-lg-3">
              <button className="carrito-btn">
                🛒
                <span className="carrito-contador">0</span>
              </button>
            </li>

            <li className="nav-item ms-lg-2">
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