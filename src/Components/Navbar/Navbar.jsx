import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Estilos da Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/progresso" className="navbar-link">Progresso</Link>
        </li>
        <li className="navbar-item">
          <Link to="/carteira" className="navbar-link">Carteira</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;