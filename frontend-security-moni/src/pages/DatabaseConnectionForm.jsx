import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; 

export default function DatabaseConnectionForm() {
  const [database, setDatabase] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px' }}>
      <h2 className="text-center">Configuración de Conexión a Base de Datos</h2>
      <Form onSubmit={handleSubmit}>
        {/* Base de Datos */}
        <div className="input-with-icon">
          <i className="bi bi-server"></i>
          <Form.Select value={database} onChange={(e) => setDatabase(e.target.value)} required>
            <option value="" disabled>Selecciona una base de datos</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
          </Form.Select>
        </div>

        {/* Puerto */}
        <div className="input-with-icon">
          <i className="bi bi-plug"></i>
          <Form.Control type="number" placeholder="Ej: 5432" required />
        </div>

        {/* Dirección IP */}
        <div className="input-with-icon">
          <i className="bi bi-hdd-network"></i>
          <Form.Control type="text" placeholder="Ej: 127.0.0.1" required />
        </div>

        {/* Nombre de Usuario */}
        <div className="input-with-icon">
          <i className="bi bi-person"></i>
          <Form.Control type="text" placeholder="Nombre de Usuario" required />
        </div>

        {/* Contraseña */}
        <div className="input-with-icon">
          <i className="bi bi-lock"></i>
          <Form.Control type="password" placeholder="Contraseña" required />
        </div>

        {/* Nombre de la Base de Datos */}
        <div className="input-with-icon">
          <i className="bi bi-file-earmark-text"></i>
          <Form.Control type="text" placeholder="Nombre de la Base de Datos" required />
        </div>

        {/* Nombre de la Conexión */}
        <div className="input-with-icon">
          <i className="bi bi-link"></i>
          <Form.Control type="text" placeholder="Nombre de la Conexión" required />
        </div>

        {/* Comentario */}
        <div className="input-with-icon">
          <i className="bi bi-chat-dots"></i>
          <Form.Control as="textarea" placeholder="Añade un comentario opcional" />
        </div>

        {/* Botón de Guardar */}
        <Button variant="primary" type="submit" className="mt-3">
          <i className="bi bi-save"></i> Guardar Conexión
        </Button>
      </Form>
    </div>
  );
}
