import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import SwitchToggle from '../components/switch/SwitchToggle';
export default function Header({ darkMode, toggleTheme }) {
  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"}>
      <Container>
        <Navbar.Brand href="#">Mi Aplicación</Navbar.Brand>
        {/* Usar el SwitchToggle */}
        <SwitchToggle isOn={darkMode} handleToggle={toggleTheme} />
      </Container>
    </Navbar>
  );
}