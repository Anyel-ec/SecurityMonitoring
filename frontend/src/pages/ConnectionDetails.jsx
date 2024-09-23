import React from 'react';
import SwitchToggle from './../components/switch/SwitchToggle';

const ConnectionDetails = ({ selectedConnection, handleTypeChange, postgresEnabled, setPostgresEnabled, mariaDbEnabled, setMariaDbEnabled, mongoDbEnabled, setMongoDbEnabled, updateCredential, testConnection, testingConnection, handleSave, handleCancel }) => {
  return (
    <div className="flex-grow-1 p-3">
      {selectedConnection && (
        <>
          <div className="mb-4 d-flex">
            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">PostgreSQL</label>
              <SwitchToggle
                isOn={postgresEnabled}
                handleToggle={() => {
                  setPostgresEnabled(!postgresEnabled);
                  handleTypeChange('PostgreSQL', !postgresEnabled);
                }}
              />
            </div>

            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">MariaDB</label>
              <SwitchToggle
                isOn={mariaDbEnabled}
                handleToggle={() => {
                  setMariaDbEnabled(!mariaDbEnabled);
                  handleTypeChange('MariaDB', !mariaDbEnabled);
                }}
              />
            </div>

            <div className="d-flex align-items-center me-5">
              <label className="ms-2 me-2">MongoDB</label>
              <SwitchToggle
                isOn={mongoDbEnabled}
                handleToggle={() => {
                  setMongoDbEnabled(!mongoDbEnabled);
                  handleTypeChange('MongoDB', !mongoDbEnabled);
                }}
              />
            </div>
          </div>

          <div className="credentials-area overflow-auto mb-4" style={{ maxHeight: 'calc(75vh - 200px)' }}>
            {['PostgreSQL', 'MariaDB', 'MongoDB'].map(
              (type) =>
                selectedConnection.types.includes(type) && (
                  <div key={type} className="mb-4">
                    <h4>{type}</h4>
                    <div className="mb-3">
                      <label className="form-label" htmlFor={`${type}-host`}>
                        Dirección IP
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
                        type="number" max={65535} min={1}
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

                    <button className="btn btn-primary mb-3" onClick={() => testConnection(type)}>
                      {testingConnection === type ? 'Probando...' : 'Probar conexión'}
                    </button>
                  </div>
                )
            )}
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
              value={selectedConnection.comment}
              onChange={(e) => updateCredential('comment', 'comment', e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end">
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
