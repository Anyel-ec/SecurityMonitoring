import PropTypes from 'prop-types'; // Importar el módulo PropTypes
export default function SwitchToggle({ isOn, handleToggle }) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

// Validación de las props
SwitchToggle.propTypes = {
  isOn: PropTypes.bool.isRequired, // Se espera que 'isOn' sea un booleano y es requerido
  handleToggle: PropTypes.func.isRequired, // 'handleToggle' debe ser una función y es requerida
};