import { useState, useRef, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Para los iconos de Bootstrap
import SwitchToggle from './../components/switch/SwitchToggle'; // Importa el SwitchToggle

export default function Component() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newConnectionName, setNewConnectionName] = useState('');
  const [testingConnection, setTestingConnection] = useState(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const newWidth = e.clientX - containerRect.left;
        setLeftPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleSave = () => {
    if (selectedConnection) {
      setConnections(
        connections.map((conn) =>
          conn.name === selectedConnection.name
            ? { ...selectedConnection, lastConnected: new Date().toLocaleString() }
            : conn
        )
      );
    } else if (newConnectionName) {
      setConnections([
        ...connections,
        {
          name: newConnectionName,
          types: [],
          credentials: {},
          comment: '',
          lastConnected: new Date().toLocaleString(),
        },
      ]);
      setNewConnectionName('');
    }
  };

  const handleDelete = () => {
    if (selectedConnection) {
      setConnections(connections.filter((conn) => conn.name !== selectedConnection.name));
      setSelectedConnection(null);
    }
  };

  const handleTypeChange = (type) => {
    if (selectedConnection) {
      const newTypes = selectedConnection.types.includes(type)
        ? selectedConnection.types.filter((t) => t !== type)
        : [...selectedConnection.types, type];

      const newCredentials = { ...selectedConnection.credentials };
      if (!newTypes.includes(type)) {
        delete newCredentials[type];
      } else if (!newCredentials[type]) {
        newCredentials[type] = { host: '', port: '', username: '', password: '' };
      }

      setSelectedConnection({
        ...selectedConnection,
        types: newTypes,
        credentials: newCredentials,
      });
    }
  };

  const updateCredential = (type, field, value) => {
    if (selectedConnection && selectedConnection.credentials[type]) {
      setSelectedConnection({
        ...selectedConnection,
        credentials: {
          ...selectedConnection.credentials,
          [type]: {
            ...selectedConnection.credentials[type],
            [field]: value,
          },
        },
      });
    }
  };

  const testConnection = async (type) => {
    setTestingConnection(type);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const success = Math.random() > 0.3;
    setTestingConnection(null);
    if (success) {
      alert(`La conexión a ${type} se ha establecido correctamente.`);
    } else {
      alert(`No se pudo establecer la conexión a ${type}. Por favor, verifique sus credenciales.`);
    }
  };

  return (
    <div ref={containerRef} className="d-flex h-100">
      {/* Left panel */}
      <div style={{ width: leftPanelWidth }} className="bg-light shadow-sm d-flex flex-column">
        <div className="p-3 flex-grow-1 overflow-auto">
          <h2 className="h5 mb-3">Conexiones guardadas</h2>
          <div className="list-group">
            {connections.map((conn) => (
              <button
                key={conn.name}
                type="button"
                className={`list-group-item list-group-item-action ${
                  selectedConnection?.name === conn.name ? 'list-group-item-secondary' : ''
                }`}
                onClick={() => setSelectedConnection(conn)}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-database me-2"></i> {/* Ícono de base de datos */}
                    {conn.name}
                  </div>
                  <small className="text-muted">
                    {conn.types.map((type) => type.slice(0, 2)).join(', ')}
                  </small>
                </div>
                <small className="text-muted">{conn.lastConnected}</small>
                <small className="text-truncate d-block">{conn.comment}</small>
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

      {/* Resizer */}
      <div className="resizer" onMouseDown={handleMouseDown} style={{ cursor: 'col-resize', width: '5px' }} />

      {/* Right panel */}
      <div className="flex-grow-1 p-3">
        {selectedConnection && (
          <>
            <div className="mb-4">
            <div className="mb-4 d-flex">
              <div className="me-3">
                <SwitchToggle
                  isOn={postgresEnabled}
                  handleToggle={() => {
                    setPostgresEnabled(!postgresEnabled);
                    handleTypeChange('PostgreSQL', !postgresEnabled);
                  }}
                />
                <label>PostgreSQL</label>
              </div>

              <div className="me-3">
                <SwitchToggle
                  isOn={mariaDbEnabled}
                  handleToggle={() => {
                    setMariaDbEnabled(!mariaDbEnabled);
                    handleTypeChange('MariaDB', !mariaDbEnabled);
                  }}
                />
                <label>MariaDB</label>
              </div>

              <div className="me-3">
                <SwitchToggle
                  isOn={mongoDbEnabled}
                  handleToggle={() => {
                    setMongoDbEnabled(!mongoDbEnabled);
                    handleTypeChange('MongoDB', !mongoDbEnabled);
                  }}
                />
                <label>MongoDB</label>
              </div>
            </div>
            </div>

            {/* Scrollable credentials area */}
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
                          placeholder="Dirección IP"
                          value={selectedConnection.credentials[type]?.host || ''}
                          onChange={(e) => updateCredential(type, 'host', e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor={`${type}-port`}>
                          Puerto
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`${type}-port`}
                          placeholder="Puerto"
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
                          placeholder="Usuario"
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
                          placeholder="Contraseña"
                          value={selectedConnection.credentials[type]?.password || ''}
                          onChange={(e) => updateCredential(type, 'password', e.target.value)}
                        />
                      </div>

                      <button className="btn btn-primary" onClick={() => testConnection(type)}>
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
                onChange={(e) => setSelectedConnection({ ...selectedConnection, comment: e.target.value })}
              ></textarea>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={handleSave}>
                Guardar
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedConnection(null)}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
