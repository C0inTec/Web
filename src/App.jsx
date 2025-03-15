import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/LoginPage.jsx';
import Registro from './Pages/Register/RegisterPage.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Progress from './Pages/Progress/progress.jsx';
import WalletPage from './Pages/Wallet/WalletPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progresso" element={<Progress />} />
        <Route path="/carteira" element={<WalletPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;