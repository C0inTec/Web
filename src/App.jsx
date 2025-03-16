import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/LoginPage.jsx';
import Registro from './Pages/Register/RegisterPage.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Progress from './Pages/Progress/progress.jsx';
import WalletPage from './Pages/Wallet/WalletPage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx'; // Importe o componente Navbar

// Layout compartilhado que inclui a Navbar
const SharedLayout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Navbar fixa no topo */}
      <main>{children}</main> {/* Conteúdo da página */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas sem Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas com Navbar */}
        <Route
          path="/dashboard"
          element={
            <SharedLayout>
              <Dashboard />
            </SharedLayout>
          }
        />
        <Route
          path="/progresso"
          element={
            <SharedLayout>
              <Progress />
            </SharedLayout>
          }
        />
        <Route
          path="/carteira"
          element={
            <SharedLayout>
              <WalletPage />
            </SharedLayout>
          }
        />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;