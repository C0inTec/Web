import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./Pages/Register/RegisterPage.jsx";
import Login from "./Pages/Login/LoginPage.jsx";
import Renda from "./Pages/Renda/RendaPage.jsx"

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Rota para login */}
        <Route path="/login" element={<Login />} />
        {/* Rota para registro */}
        <Route path="/registro" element={<Registro />} />
        {/* Rota para registos */}
        <Route path="/renda" element={<Renda />} />
      </Routes>
    </Router>
  );
}

export default App;