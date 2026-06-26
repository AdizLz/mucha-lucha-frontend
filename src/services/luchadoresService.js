import luchadoresJSON from "../data/luchadores.json";

export async function getLuchadores() {
  return Promise.resolve(luchadoresJSON);
  // futuro: const res = await fetch("http://localhost:8080/api/luchadores"); return res.json();
}