import productosJSON from "../data/productos.json";

export async function getProductos() {
  // FASE ACTUAL: JSON local (sin backend)
  return Promise.resolve(productosJSON);

  // FASE FUTURA: cuando tengas Spring Boot + MySQL, reemplazas
  // las dos líneas de arriba por esto:
  //
  // const res = await fetch("http://localhost:8080/api/productos");
  // return res.json();
}