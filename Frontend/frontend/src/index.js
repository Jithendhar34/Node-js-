import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContactUs from "./ContactUs"; // <-- IMPORT THIS
// Assuming you also have Login and Signup components
// import Login from "./Login";
// import Signup from "./Signup";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<ContactUs />} /> {/* <-- ADD THIS ROUTE */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  </BrowserRouter>
);