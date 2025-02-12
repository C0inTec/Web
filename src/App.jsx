import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registro from "./Pages/Register/RegisterPage.jsx";
import Login from "./Pages/Login/LoginPage.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Loginreg from "./Pages/LoginReg/loginreg.jsx";
import Test from "./Pages/TestApi/apiTest.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial redireciona para /login */}
        <Route path="/" element={<Navigate to="/login"/>} />
        {/* Rota para login */}
        <Route path="/login" element={<Login />} />
        {/* Rota para registro */}
        <Route path="/registro" element={<Registro />} />
      
        <Route path="/dashboard" element={<Dashboard/>} />

        <Route path="/teste" element={<Loginreg/>} /> 
        <Route path="/testeApi" element={<Test/>} /> 


      </Routes>
    </Router>
  );
}

export default App;