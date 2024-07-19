import React from 'react';
import logo from '../assets/welcome-image.jpg';
import '../styles/styles.css';

const Logo: React.FC = () => {
  return <img src={logo} alt="Logo" className="logo" />;
};

export default Logo;
