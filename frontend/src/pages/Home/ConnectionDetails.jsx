import React, { useEffect } from 'react';
import SwitchToggle from '../../components/switch/SwitchToggle';

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
    <div>
      {selectedConnection && (
        <>
          <div className="flex flex-row gap-10 mb-5 border-b border-gray-200 dark:border-[#1b2e4b] pb-5">
            <div>
              {/* PostgreSQL */}
              <label className="">PostgreSQL</label>
              <label className="w-7 h-4 relative cursor-pointer mb-0">
                <input
                  type="checkbox"
                  checked={postgresEnabled} // Estado dinámico
                  onChange={() => handleExclusiveToggle('PostgreSQL')} // Función al cambiar el estado
                  className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                  id="custom_switch_checkbox1"
                />
                <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
              </label>
            </div>

            {/* MariaDB */}
            <div>
              <label className="">MariaDB</label>
              <label className="w-7 h-4 relative cursor-pointer mb-0">
                <input
                  type="checkbox"
                  checked={mariaDbEnabled} // Estado dinámico
                  onChange={() => handleExclusiveToggle('MariaDB')} // Función al cambiar el estado
                  className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                  id="custom_switch_checkbox_mariadb"
                />
                <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
              </label>
            </div>


            {/* MongoDB */}
            <div>
              <label className="">MongoDB</label>
              <label className="w-7 h-4 relative cursor-pointer mb-0">
                <input
                  type="checkbox"
                  checked={mongoDbEnabled} // Estado dinámico
                  onChange={() => handleExclusiveToggle('MongoDB')} // Función al cambiar el estado
                  className="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                  id="custom_switch_checkbox_mongodb"
                />
                <span className="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
              </label>
            </div>
          </div>

          <div>
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
                <div key={type}>
                  <h4 className='text-base font-bold mb-5'>{type}</h4>

                  <div className="flex gap-5">
                    <div className="w-full mb-3">
                      <label className="form-label" htmlFor={`${type}-host`}>
                        Host (IP o Dominio)
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id={`${type}-host`}
                        placeholder={type === 'PostgreSQL' ? '192.168.1.100' : type === 'MariaDB' ? '192.168.1.101' : '192.168.1.102'}
                        value={selectedConnection.credentials[type]?.host || ''}
                        onChange={(e) => updateCredential(type, 'host', e.target.value)}
                      />
                    </div>

                    <div className="w-full mb-3">
                      <label className="form-label" htmlFor={`${type}-port`}>
                        Puerto
                      </label>
                      <input
                        type="number"
                        max={65535}
                        min={1}
                        className="form-input"
                        id={`${type}-port`}
                        placeholder={type === 'PostgreSQL' ? '5432' : type === 'MariaDB' ? '3306' : '27017'}
                        value={selectedConnection.credentials[type]?.port || ''}
                        onChange={(e) => updateCredential(type, 'port', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-full mb-3">
                      <label className="form-label" htmlFor={`${type}-username`}>
                        Usuario
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        id={`${type}-username`}
                        placeholder={type === 'PostgreSQL' ? 'postgres_user' : type === 'MariaDB' ? 'mariadb_user' : 'mongodb_user'}
                        value={selectedConnection.credentials[type]?.username || ''}
                        onChange={(e) => updateCredential(type, 'username', e.target.value)}
                      />
                    </div>

                    <div className="w-full mb-3">
                      <label className="form-label" htmlFor={`${type}-password`}>
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-input"
                        id={`${type}-password`}
                        placeholder="******"
                        value={selectedConnection.credentials[type]?.password || ''}
                        onChange={(e) => updateCredential(type, 'password', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="comment">
                      Comentario
                    </label>
                    <textarea
                      className="form-textarea"
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

          <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-[#1b2e4b] pt-3">
            <button className="btn btn-success" onClick={handleSave}>
              Guardar
            </button>
            <button className="btn btn-dark" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionDetails;
