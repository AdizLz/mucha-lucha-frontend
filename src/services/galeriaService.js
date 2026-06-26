import galeriaJSON from "../data/galeria.json";

export async function getGaleria() {
  return Promise.resolve(galeriaJSON);
  // futuro: const res = await fetch("http://localhost:8080/api/galeria"); return res.json();
}