import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./Pages/Register/RegisterPage.jsx";
import Login from "./Pages/Login/LoginPage.jsx";

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
      </Routes>
    </Router>
  );
}

export default App;