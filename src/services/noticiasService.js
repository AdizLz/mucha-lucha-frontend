import noticiasJSON from "../data/noticias.json";

export async function getNoticias() {
  return Promise.resolve(noticiasJSON);
  // futuro: const res = await fetch("http://localhost:8080/api/noticias"); return res.json();
}