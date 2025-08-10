// In src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import ContactUs from './ContactUs.jsx';
import Login from './Login.jsx'; // <-- Import Login
import Signup from './Signup.jsx'; // <-- Import Signup
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<ContactUs />} />
        <Route path="/login" element={<Login />} /> {/* <-- Add Login Route */}
        <Route path="/signup" element={<Signup />} /> {/* <-- Add Signup Route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);