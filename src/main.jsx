import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // This is your Home page
import About from "./pages/About";
import Festivals from "./pages/Festivals";
import History from "./pages/History";
import Rathyatra from "./pages/Rathyatra";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/history" element={<History />} />
        <Route path="/rathyatra" element={<Rathyatra />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
