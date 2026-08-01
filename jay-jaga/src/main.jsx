import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrowdProvider } from "./contexts/CrowdContext";

import App from "./App";
import About from "./pages/About";
import Festivals from "./pages/Festivals";
import History from "./pages/History";
import Rathyatra from "./pages/Rathyatra";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import HotelBooking from "./pages/HotelBooking";
import ConfirmBooking from "./pages/ConfirmBooking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SuccessfulPayment from "./pages/SuccessfulPayment";
import CrowdIntensityMain from "./components/CrowdIntensity/CrowdIntensityMain";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CrowdProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/"                       element={<App />} />
          <Route path="/about"                  element={<About />} />
          <Route path="/festivals"              element={<Festivals />} />
          <Route path="/history"                element={<History />} />
          <Route path="/rathyatra"              element={<Rathyatra />} />
          <Route path="/gallery"                element={<Gallery />} />
          <Route path="/crowd"                  element={<CrowdIntensityMain />} />
          <Route path="/contact"                element={<Contact />} />
          <Route path="/hotels"                 element={<HotelBooking />} />
          <Route path="/login"                  element={<Login />} />
          <Route path="/signup"                 element={<Signup />} />
          <Route path="/confirm-booking/:id"    element={<ConfirmBooking />} />
          <Route path="/booking-success/:id"    element={<SuccessfulPayment />} />
        </Routes>
      </CrowdProvider>
    </BrowserRouter>
  </StrictMode>
);
