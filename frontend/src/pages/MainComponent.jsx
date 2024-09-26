import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { getConnectionNames } from '../services/connectionService'; // Asegúrate de importar correctamente el servicio


export default function MainComponent() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newConnectionName, setNewConnectionName] = useState('');
  const [testingConnection, setTestingConnection] = useState(null);
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400); // Estado para el ancho del panel izquierdo
  const containerRef = useRef(null);
  const isDragging = useRef(false);


  // Usamos useEffect para llamar al servicio al cargar el componente
  useEffect(() => {
    const fetchConnectionNames = async () => {
      try {
        const data = await getConnectionNames();
        console.log('Datos obtenidos del backend:', data); // Mostramos los datos por consola
      } catch (error) {
        console.error('Error al obtener los nombres de las conexiones:', error);
      }
    };

    fetchConnectionNames();
  }, []); // El array vacío asegura que esto solo se ejecuta al montar el componente



  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const newWidth = e.clientX - containerRect.left;
        setLeftPanelWidth(newWidth); // Actualizamos el ancho del panel izquierdo
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
      {/* Left panel - SavedConnections */}
      <SavedConnections
        connections={connections}
        selectedConnection={selectedConnection}
        setSelectedConnection={setSelectedConnection}
        handleDelete={handleDelete}
        handleSave={handleSave}
        newConnectionName={newConnectionName}
        setNewConnectionName={setNewConnectionName}
        leftPanelWidth={leftPanelWidth} // Pasamos el ancho dinámico del panel izquierdo
      />

      {/* Resizer */}
      <div
        className="resizer"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'col-resize', width: '5px', backgroundColor: '#ddd' }}
      />

      {/* Right panel - ConnectionDetails */}
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
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}
