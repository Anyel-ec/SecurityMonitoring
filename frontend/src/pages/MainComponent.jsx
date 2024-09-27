import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { getConnectionNames, saveOrUpdateConnection } from '../services/connectionService'; // Asegúrate de importar correctamente el servicio
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default function MainComponent() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newConnection, setNewConnection] = useState({ connectionName: '' }); // Cambiado a un objeto
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
        setConnections(data.result); // Aquí actualizamos el estado con los datos del backend
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

  // Maneja la selección de una conexión y habilita los switches
  const handleSelectConnection = (conn) => {
    setSelectedConnection({
      ...conn,
      credentials: {
        PostgreSQL: conn.postgresCredentials || { host: '', port: '', username: '', password: '' },
        MariaDB: conn.mariadbCredentials || { host: '', port: '', username: '', password: '' },
        MongoDB: conn.mongodbCredentials || { host: '', port: '', username: '', password: '' }
      }
    });

    // Activa los switches según las credenciales de la conexión seleccionada
    setPostgresEnabled(!!conn.postgresCredentials);
    setMariaDbEnabled(!!conn.mariadbCredentials);
    setMongoDbEnabled(!!conn.mongodbCredentials);
  };

  // Función para guardar la conexión
  const handleSave = async () => {
    try {
      if (selectedConnection) {
        // Imprime los datos a guardar
        console.log('Guardando conexión:', selectedConnection);

        await saveOrUpdateConnection(selectedConnection); // Llamar a la función para guardar la conexión
        setConnections(
          connections.map((conn) =>
            conn.name === selectedConnection.name
              ? { ...selectedConnection, lastConnected: new Date().toLocaleString() }
              : conn
          )
        );

        // Muestra un toast de éxito
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
      } else if (newConnection.connectionName) {
        // Si se guarda una nueva conexión
        console.log('Guardando nueva conexión:', newConnection.connectionName);
        
        await saveOrUpdateConnection(newConnection);
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

  const handleDelete = () => {
    if (selectedConnection) {
      setConnections(connections.filter((conn) => conn.connectionName !== selectedConnection.connectionName));
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
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'success',
        title: `Conexión a ${type} exitosa`,
        showConfirmButton: false,
        timer: 3000
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: `Conexión a ${type} fallida`,
        text: 'Por favor, verifica las credenciales.',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  return (
    <div ref={containerRef} className="d-flex h-100">
      {/* Left panel - SavedConnections */}
      <SavedConnections
        connections={connections}
        selectedConnection={selectedConnection}
        setSelectedConnection={handleSelectConnection}
        handleDelete={handleDelete}
        handleSave={handleSave}
        newConnection={newConnection} // Cambiado a newConnection
        setNewConnection={setNewConnection} // Cambiado a setNewConnection
        leftPanelWidth={leftPanelWidth}
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
