import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { getConnectionNames, saveOrUpdateConnectionName, saveOrUpdateConnectionCredentials, deleteConnectionById, testPostgresConnection } from '../services/connectionService';
import Swal from 'sweetalert2';
import {runDockerInstallService} from '../services/dockerComposeService';
export default function MainComponent() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newConnection, setNewConnection] = useState({ connectionName: '' });
  const [testingConnection, setTestingConnection] = useState(null);
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const fetchConnectionNames = async () => {
      try {
        const data = await getConnectionNames();
        console.log('Datos obtenidos del backend:', data);
        setConnections(data.result);
      } catch (error) {
        console.error('Error al obtener los nombres de las conexiones:', error);
      }
    };

    fetchConnectionNames();
  }, []);

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

  // Maneja la selección de una conexión y habilita los switches
  const handleSelectConnection = (conn) => {
    setSelectedConnection({
      ...conn,
      types: conn.types || [],
      credentials: {
        PostgreSQL: conn.postgresCredentials || { host: '', port: '', username: '', password: '' },
        MariaDB: conn.mariadbCredentials || { host: '', port: '', username: '', password: '' },
        MongoDB: conn.mongodbCredentials || { host: '', port: '', username: '', password: '' }
      }
    });

    setPostgresEnabled(!!conn.postgresCredentials);
    setMariaDbEnabled(!!conn.mariadbCredentials);
    setMongoDbEnabled(!!conn.mongodbCredentials);
  };

  // Función para guardar el nombre de la conexión
  const handleSaveConnectionName = async () => {
    try {
      if (selectedConnection) {
        await saveOrUpdateConnectionName(selectedConnection);
        setConnections(
          connections.map((conn) =>
            conn.name === selectedConnection.name
              ? { ...selectedConnection, lastConnected: new Date().toLocaleString() }
              : conn
          )
        );

        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Conexión guardada con éxito',
          showConfirmButton: false,
          timer: 3000
        });
      } else if (newConnection.connectionName) {
        await saveOrUpdateConnectionName(newConnection);

        setConnections([
          ...connections,
          {
            connectionName: newConnection.connectionName,
            types: [],
            credentials: {},
            comment: '',
            lastConnected: new Date().toLocaleString(),
          },
        ]);

        setNewConnection({ connectionName: '' });

        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Nueva conexión guardada con éxito',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (error) {
      console.error('Error al guardar la conexión:', error);
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: 'No se pudo guardar la conexión',
        text: error.message || 'Ocurrió un error',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  // Función para guardar las credenciales de la conexión
  const handleSaveCredentials = async () => {
    try {
      if (selectedConnection) {
        const enabledTypes = [];
        if (postgresEnabled) enabledTypes.push('PostgreSQL');
        if (mariaDbEnabled) enabledTypes.push('MariaDB');
        if (mongoDbEnabled) enabledTypes.push('MongoDB');

        const credentialsData = {
          connectionName: selectedConnection.connectionName,
          types: enabledTypes,
          credentials: selectedConnection.credentials,
        };

        // Muestra los datos que se van a enviar por consola
        console.log('Datos que se envían al backend:', credentialsData);

        await saveOrUpdateConnectionCredentials(credentialsData);

        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Credenciales guardadas con éxito',
          showConfirmButton: false,
          timer: 3000
        });
        // Abrir el dashboard de Grafana en una nueva pestaña
        window.open('http://localhost:3000/d/000000039/postgresql-database?orgId=1&refresh=10s', '_blank');

      }
    } catch (error) {
      console.error('Error al guardar las credenciales:', error);
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: 'No se pudo guardar las credenciales',
        text: error.message || 'Ocurrió un error',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const handleDelete = async () => {
    if (selectedConnection) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteConnectionById(selectedConnection.id);
            setConnections(connections.filter((conn) => conn.connectionName !== selectedConnection.connectionName));
            setSelectedConnection(null);
            Swal.fire({
              toast: true,
              position: 'top-right',
              icon: 'success',
              title: 'Conexión eliminada exitosamente',
              showConfirmButton: false,
              timer: 3000
            });
          } catch (error) {
            console.error('Error al eliminar la conexión:', error);
            Swal.fire({
              toast: true,
              position: 'top-right',
              icon: 'error',
              title: 'No se pudo eliminar la conexión',
              text: error.message || 'Ocurrió un error',
              showConfirmButton: false,
              timer: 3000
            });
          }
        }
      });
    }
  };

  const handleCancel = () => {
    setSelectedConnection(null);
  };

  const handleTypeChange = (type, isEnabled) => {
    if (selectedConnection) {
      const newTypes = isEnabled
        ? [...selectedConnection.types, type]
        : selectedConnection.types.filter((t) => t !== type);

      const newCredentials = { ...selectedConnection.credentials };
      if (!isEnabled) {
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
    try {
      const config = selectedConnection.credentials[type];
      const response = await testPostgresConnection(config);

      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: 'Conexión fallida',
        text: error.message || 'No se pudo conectar. Verifica las credenciales.',
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setTestingConnection(null);
    }
  };

  return (
    <div ref={containerRef} className="d-flex h-100">
      <SavedConnections
        connections={connections}
        selectedConnection={selectedConnection}
        setSelectedConnection={handleSelectConnection}
        handleDelete={handleDelete}
        handleSave={handleSaveConnectionName}
        newConnection={newConnection}
        setNewConnection={setNewConnection}
        leftPanelWidth={leftPanelWidth}
      />

      <button
        className="resizer"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'col-resize', width: '5px', backgroundColor: '#ddd', border: 'none', padding: '0', outline: 'none' }}
        aria-label="Resizer"
      >
      </button>

      <ConnectionDetails
        selectedConnection={selectedConnection}
        handleTypeChange={handleTypeChange}
        postgresEnabled={postgresEnabled}
        setPostgresEnabled={setPostgresEnabled}
        mariaDbEnabled={mariaDbEnabled}
        setMariaDbEnabled={setMariaDbEnabled}
        mongoDbEnabled={mongoDbEnabled}
        setMongoDbEnabled={setMongoDbEnabled}
        updateCredential={updateCredential}
        testConnection={testConnection}
        testingConnection={testingConnection}
        handleSave={handleSaveCredentials}
        handleCancel={handleCancel}
      />
    </div>
  );
}
