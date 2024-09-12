import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

export default function DatabaseConnectionForm() {
  const [database, setDatabase] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 className="text-center">Configuración de Conexión a Base de Datos</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="database">
          <Form.Label>Base de Datos</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-server"></i>
            </InputGroup.Text>
            <Form.Select value={database} onChange={(e) => setDatabase(e.target.value)} required>
              <option value="" disabled>Selecciona una base de datos</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mongodb">MongoDB</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="port">
          <Form.Label>Puerto</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-plug"></i>
            </InputGroup.Text>
            <Form.Control type="number" placeholder="Ej: 5432" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="ip">
          <Form.Label>Dirección IP</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-hdd-network"></i>
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Ej: 127.0.0.1" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Nombre de Usuario</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-person"></i>
            </InputGroup.Text>
            <Form.Control type="text" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock"></i>
            </InputGroup.Text>
            <Form.Control type="password" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="dbname">
          <Form.Label>Nombre de la Base de Datos</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-file-earmark-text"></i>
            </InputGroup.Text>
            <Form.Control type="text" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="connectionName">
          <Form.Label>Nombre de la Conexión</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-link"></i>
            </InputGroup.Text>
            <Form.Control type="text" required />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label>Comentario</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-chat-dots"></i>
            </InputGroup.Text>
            <Form.Control as="textarea" placeholder="Añade un comentario opcional" />
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          <i className="bi bi-save"></i> Guardar Conexión
        </Button>
      </Form>
    </div>
  );
}
