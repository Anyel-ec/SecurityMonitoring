import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Para los iconos de Bootstrap

const SavedConnections = ({ connections, selectedConnection, setSelectedConnection, handleDelete, handleSave, newConnection, setNewConnection, leftPanelWidth }) => {

  // Function to convert systemParameter name to a more friendly name
  const getFriendlyName = (name) => {
    switch (name) {
      case 'POSTGRESQL':
        return 'PostgreSQL';
      case 'MARIADB':
        return 'MariaDB';
      case 'MONGODB':
        return 'MongoDB';
      default:
        return name;
    }
  };

  return (
    <div className="bg-light shadow-sm d-flex flex-column justify-content-between" style={{ width: leftPanelWidth, height: '90vh' }}>
      <div className="p-3 flex-grow-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        <h2 className="h5 mb-3">Conexiones guardadas</h2>
        <div className="list-group">
          {connections.map((conn, index) => (
            <button
              key={conn.id} // Usa el ID como clave única
              type="button"
              className={`list-group-item list-group-item-action ${selectedConnection?.id === conn.id ? 'list-group-item-secondary' : ''}`}
              onClick={() => setSelectedConnection(conn)}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-database me-2"></i>
                  {`${conn.host}:${conn.port}`} {/* Host y puerto concatenados */}
                </div>
                <small className="text-muted">
                  {getFriendlyName(conn.systemParameter?.name) || 'No disponible'} {/* Nombre amigable del parámetro del sistema */}
                </small>
              </div>
              <small className="text-muted">{new Date(conn.createdAt).toLocaleString()}</small> {/* Fecha de creación */}
              <small className="text-truncate d-block">{conn.comment || 'Sin comentarios'}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-top mt-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nombre de nueva conexión"
          value={newConnection.connectionName}
          onChange={(e) => setNewConnection({ ...newConnection, connectionName: e.target.value })}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleSave}>
            Monitorear
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