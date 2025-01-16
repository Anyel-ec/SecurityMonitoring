// SavedConnections.js
import React from 'react';

const SavedConnections = ({ connections, selectedConnection, setSelectedConnection, handleDelete, handleMonitor, leftPanelWidth }) => {

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
    <div className="h-full flex flex-col box-border">
      {/* Contenedor del contenido con scroll */}
      <div className="flex-grow overflow-y-auto">
      <div className="flex-col items-center justify-center overflow-y-auto" style={{ height: `calc(100vh - ${leftPanelWidth}px)` }}>
          {connections.map((conn) => (
            <button
              key={conn.id}
              type="button"
              className={`w-[19rem] grid p-3 mt-2 rounded border border-white-light dark:border-[#1b2e4b] dark:shadow-none ${selectedConnection?.id === conn.id ? 'bg-gray-200 dark:bg-[#191e50]' : 'bg-white dark:bg-[#191e3a]'
                }`}
              onClick={() => setSelectedConnection(conn)}
            >
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                  <i className="fa-regular fa-database text-sm"></i>
                  <span className="truncate">{`${conn.host}:${conn.port}`}</span>
                </div>
                <small className="truncate text-right">
                  {getFriendlyName(conn.systemParameter?.name) || 'No disponible'}
                </small>
              </div>
              <small className="text-left">{new Date(conn.createdAt).toLocaleString()}</small>
              <small className="text-left">{conn.comment || 'Sin comentarios'}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Botones fijos al final */}
      <div className="flex justify-between p-3 border-t border-gray-200 dark:border-[#1b2e4b] mb-5">
        <button className="btn btn-primary" onClick={handleMonitor}>
          Monitorear
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Borrar
        </button>
      </div>
    </div>

  );
};

export default SavedConnections;
