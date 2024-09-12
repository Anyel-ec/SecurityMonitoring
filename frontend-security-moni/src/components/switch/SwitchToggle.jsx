import { useState } from 'react';
import './SwitchToggle.css'; 

export default function SwitchToggle({ isOn, handleToggle }) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <span>{isOn ? 'Encendido' : 'Apagado'}</span>
    </div>
  );
}
