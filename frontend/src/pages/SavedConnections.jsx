// SavedConnections.js
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Para los iconos de Bootstrap

// Función para formatear la fecha
const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
};

const SavedConnections = ({ connections, selectedConnection, setSelectedConnection, handleDelete, handleSave, newConnectionName, setNewConnectionName, leftPanelWidth }) => {
  return (
    <div className="bg-light shadow-sm d-flex flex-column" style={{ width: leftPanelWidth }}>
      <div className="p-3 flex-grow-1 overflow-auto">
        <h2 className="h5 mb-3">Conexiones guardadas</h2>
        <div className="list-group">
          {connections.map((conn) => (
            <button
              key={conn.id}
              type="button"
              className={`list-group-item list-group-item-action ${selectedConnection?.id === conn.id ? 'list-group-item-secondary' : ''}`}
              onClick={() => setSelectedConnection(conn)}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-database me-2"></i> {/* Ícono de base de datos */}
                  {conn.connectionName}
                </div>
                <small className="text-muted">
                  {conn.postgresCredentials ? 'Pg' : ''}{conn.mariadbCredentials ? ', Mar' : ''}{conn.mongodbCredentials ? ', Mon' : ''}
                </small>
              </div>
              <small className="text-muted">{formatDate(conn.lastConnection)}</small>
              <small className="text-truncate d-block">{conn.comment || 'Sin comentarios'}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-top">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nombre de nueva conexión"
          value={newConnectionName}
          onChange={(e) => setNewConnectionName(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedConnections;
