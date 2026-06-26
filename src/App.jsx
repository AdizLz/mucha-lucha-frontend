import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Luchadores from "./pages/Luchadores";
import Mercancia from "./pages/Mercancia";
import Noticias from "./pages/Noticias";
import Galeria from "./pages/Galeria";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/luchadores" element={<Luchadores />} />
          <Route path="/mercancia" element={<Mercancia />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/galeria" element={<Galeria />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;