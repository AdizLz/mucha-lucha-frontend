// src/context/CarritoContext.jsx
import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  const agregar = (producto) => setItems((prev) => [...prev, producto]);
  const quitar = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <CarritoContext.Provider value={{ items, agregar, quitar }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}