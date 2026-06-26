// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/variables.css";  // 1. variables primero
import "./styles/globals.css";    // 2. reset/base después, ya puede usar var()
import "./styles/buttons.css";    // 3. componentes reutilizables

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);