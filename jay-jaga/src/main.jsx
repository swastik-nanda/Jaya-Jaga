import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // This is your Home page
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/history" element={<History />} />
        <Route path="/rathyatra" element={<Rathyatra />} />
        <Route path="/gallery" element={<Gallery></Gallery>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/hotels" element={<HotelBooking></HotelBooking>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/confirm-booking/:id" element={<ConfirmBooking />} />
        <Route path="/booking-success/:id" element={<SuccessfulPayment />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
