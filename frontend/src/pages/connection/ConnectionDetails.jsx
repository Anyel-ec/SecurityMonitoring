import React, { useEffect } from 'react';
import SwitchToggle from './../../components/switch/SwitchToggle';

const ConnectionDetails = ({
  selectedConnection,
  setSelectedConnection, // Asegúrate de recibir esta prop
  handleTypeChange,
  postgresEnabled,
  setPostgresEnabled,
  mariaDbEnabled,
  setMariaDbEnabled,
  mongoDbEnabled,
  setMongoDbEnabled,
  updateCredential,
  testConnection,
  testingConnection,
  handleSave,
  handleCancel
}) => {

  // Activar PostgreSQL por defecto al montar el componente
  useEffect(() => {
    if (!postgresEnabled && !mariaDbEnabled && !mongoDbEnabled) {
      setPostgresEnabled(true);
      handleTypeChange('PostgreSQL', true);
      setMariaDbEnabled(false);
      setMongoDbEnabled(false);
    }
  }, [postgresEnabled, mariaDbEnabled, mongoDbEnabled, setPostgresEnabled, setMariaDbEnabled, setMongoDbEnabled, handleTypeChange]);

  // Función que asegura que solo una base de datos esté habilitada a la vez
  const handleExclusiveToggle = (dbType) => {
    if (dbType === 'PostgreSQL') {
      setPostgresEnabled(true);
      setMariaDbEnabled(false);
      setMongoDbEnabled(false);
      handleTypeChange('PostgreSQL', true);
      handleTypeChange('MariaDB', false);
      handleTypeChange('MongoDB', false);
    } else if (dbType === 'MariaDB') {
      setPostgresEnabled(false);
      setMariaDbEnabled(true);
      setMongoDbEnabled(false);
      handleTypeChange('PostgreSQL', false);
      handleTypeChange('MariaDB', true);
      handleTypeChange('MongoDB', false);
    } else if (dbType === 'MongoDB') {
      setPostgresEnabled(false);
      setMariaDbEnabled(false);
      setMongoDbEnabled(true);
      handleTypeChange('PostgreSQL', false);
      handleTypeChange('MariaDB', false);
      handleTypeChange('MongoDB', true);
    }
  };

  return (
    <div className="flex-grow-1 d-flex flex-column p-3" style={{ height: '90vh' }}>
      {selectedConnection && (
        <>
          <div className="mb-4 d-flex">
            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">PostgreSQL</label>
              <SwitchToggle
                isOn={postgresEnabled}
                handleToggle={() => handleExclusiveToggle('PostgreSQL')}
              />
            </div>

            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">MariaDB</label>
              <SwitchToggle
                isOn={mariaDbEnabled}
                handleToggle={() => handleExclusiveToggle('MariaDB')}
              />
            </div>

            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">MongoDB</label>
              <SwitchToggle
                isOn={mongoDbEnabled}
                handleToggle={() => handleExclusiveToggle('MongoDB')}
              />
            </div>
          </div>

          <div className="flex-grow-1 overflow-auto mb-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {['PostgreSQL', 'MariaDB', 'MongoDB'].map((type) => {
              const isDatabaseEnabled =
                (postgresEnabled && type === 'PostgreSQL') ||
                (mariaDbEnabled && type === 'MariaDB') ||
                (mongoDbEnabled && type === 'MongoDB');

              // Asegurar que las credenciales para cada tipo de base de datos estén presentes
              if (!selectedConnection.credentials[type]) {
                selectedConnection.credentials[type] = {
                  host: '',
                  port: '',
                  username: '',
                  password: ''
                };
              }

              return isDatabaseEnabled ? (
                <div key={type} className="mb-4">
                  <h4>{type}</h4>
                  <div className="mb-3">
                    <label className="form-label" htmlFor={`${type}-host`}>
                    Host (IP o Dominio)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`${type}-host`}
                      placeholder={type === 'PostgreSQL' ? '192.168.1.100' : type === 'MariaDB' ? '192.168.1.101' : '192.168.1.102'}
                      value={selectedConnection.credentials[type]?.host || ''}
                      onChange={(e) => updateCredential(type, 'host', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor={`${type}-port`}>
                      Puerto
                    </label>
                    <input
                      type="number"
                      max={65535}
                      min={1}
                      className="form-control"
                      id={`${type}-port`}
                      placeholder={type === 'PostgreSQL' ? '5432' : type === 'MariaDB' ? '3306' : '27017'}
                      value={selectedConnection.credentials[type]?.port || ''}
                      onChange={(e) => updateCredential(type, 'port', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor={`${type}-username`}>
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`${type}-username`}
                      placeholder={type === 'PostgreSQL' ? 'postgres_user' : type === 'MariaDB' ? 'mariadb_user' : 'mongodb_user'}
                      value={selectedConnection.credentials[type]?.username || ''}
                      onChange={(e) => updateCredential(type, 'username', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor={`${type}-password`}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id={`${type}-password`}
                      placeholder="******"
                      value={selectedConnection.credentials[type]?.password || ''}
                      onChange={(e) => updateCredential(type, 'password', e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="comment">
                      Comentario
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      placeholder="Comentario"
                      value={selectedConnection.comment || ''} // Corregido para permitir escribir en el comentario
                      onChange={(e) =>
                        setSelectedConnection((prev) => ({
                          ...prev,
                          comment: e.target.value
                        }))
                      }
                    ></textarea>
                  </div>

                  <button className="btn btn-primary mb-3" onClick={() => testConnection(type)}>
                    {testingConnection === type ? 'Probando...' : 'Probar conexión'}
                  </button>
                </div>
              ) : null;
            })}
          </div>

          <div className="d-flex justify-content-end mt-auto">
            <button className="btn btn-primary me-2" onClick={handleSave}>
              Guardar
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionDetails;
