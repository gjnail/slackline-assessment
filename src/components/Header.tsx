import React from 'react';
import logo from '../assets/images/stackline_logo.jpg'
import '../App.css';

const Header: React.FC = () => (
  <header className="header">
    <img src={logo} alt="Stackline Logo" className="logo" />
  </header>
);

export default Header;
