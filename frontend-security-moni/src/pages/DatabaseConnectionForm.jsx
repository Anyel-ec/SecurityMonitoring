import { useState } from 'react';

export default function DatabaseConnectionForm() {
  const [database, setDatabase] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Configuración de Conexión a Base de Datos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="database">Base de Datos</label>
          <select id="database" value={database} onChange={(e) => setDatabase(e.target.value)} required>
            <option value="" disabled>Selecciona una base de datos</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="port">Puerto</label>
          <input id="port" type="number" placeholder="Ej: 5432" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="ip">Dirección IP</label>
          <input id="ip" type="text" placeholder="Ej: 127.0.0.1" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username">Nombre de Usuario</label>
          <input id="username" type="text" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="dbname">Nombre de la Base de Datos</label>
          <input id="dbname" type="text" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="connectionName">Nombre de la Conexión</label>
          <input id="connectionName" type="text" required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="comment">Comentario</label>
          <textarea id="comment" placeholder="Añade un comentario opcional"></textarea>
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Guardar Conexión
        </button>
      </form>
    </div>
  );
}
