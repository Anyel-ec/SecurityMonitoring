import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css'; 

export default function PostgresConnectionForm() {
  const [formData, setFormData] = useState({
    host: '',
    port: '5432',
    username: '',
    password: '',
    database: '',
    connectionName: '',
    comment: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí podrías enviar los datos al backend para que sean procesados
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px' }}>
      <h2 className="text-center">Configuración de Conexión a PostgreSQL</h2>
      <Form onSubmit={handleSubmit}>
        
        {/* Dirección IP */}
        <div className="input-with-icon">
          <i className="bi bi-hdd-network"></i>
          <Form.Control 
            type="text" 
            placeholder="Dirección IP o Host (Ej: 127.0.0.1)" 
            name="host"
            value={formData.host}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Puerto */}
        <div className="input-with-icon">
          <i className="bi bi-plug"></i>
          <Form.Control 
            type="number" 
            placeholder="Puerto (Ej: 5432)" 
            name="port"
            value={formData.port}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Nombre de Usuario */}
        <div className="input-with-icon">
          <i className="bi bi-person"></i>
          <Form.Control 
            type="text" 
            placeholder="Nombre de Usuario" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Contraseña */}
        <div className="input-with-icon">
          <i className="bi bi-lock"></i>
          <Form.Control 
            type="password" 
            placeholder="Contraseña" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Base de Datos */}
        <div className="input-with-icon">
          <i className="bi bi-database"></i>
          <Form.Control 
            type="text" 
            placeholder="Nombre de la Base de Datos" 
            name="database"
            value={formData.database}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Nombre de la Conexión */}
        <div className="input-with-icon">
          <i className="bi bi-link"></i>
          <Form.Control 
            type="text" 
            placeholder="Nombre de la Conexión" 
            name="connectionName"
            value={formData.connectionName}
            onChange={handleChange}
            required 
          />
        </div>

        {/* Comentario */}
        <div className="input-with-icon">
          <i className="bi bi-chat-dots"></i>
          <Form.Control 
            as="textarea" 
            placeholder="Añade un comentario opcional" 
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        {/* Botón de Guardar */}
        <Button variant="primary" type="submit" className="mt-3">
          <i className="bi bi-save"></i> Guardar Conexión
        </Button>
      </Form>
    </div>
  );
}
