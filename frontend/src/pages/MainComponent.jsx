import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { getConnectionNames, saveOrUpdateConnection, deleteConnectionById, testPostgresConnection } from '../services/connectionService'; // Asegúrate de importar correctamente el servicio
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default function MainComponent() {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newConnection, setNewConnection] = useState({ connectionName: '' }); // Cambiado a un objeto
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400); // Estado para el ancho del panel izquierdo
  const [testingConnection, setTestingConnection] = useState(null); // Definir el estado correctamente aquí

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
      types: conn.types || [],  // Asegúrate de que siempre haya un array en `types`
      credentials: conn.credentials || { host: '', port: '', username: '', password: '' }
    });
  
    // Activa los switches según las credenciales de la conexión seleccionada
    setPostgresEnabled(conn.types?.includes('PostgreSQL') || false);
    setMariaDbEnabled(conn.types?.includes('MariaDB') || false);
    setMongoDbEnabled(conn.types?.includes('MongoDB') || false);
  };

  // Función para guardar la conexión
  const handleSave = async () => {
    try {
      if (selectedConnection) {
        console.log('Guardando conexión:', selectedConnection);
        await saveOrUpdateConnection(selectedConnection); // Llamar a la función para guardar la conexión

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
          title: 'Guardado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
      } else if (newConnection.connectionName) {
        console.log('Guardando nueva conexión:', newConnection.connectionName);

        await saveOrUpdateConnection(newConnection);
        setConnections([
          ...connections,
          {
            connectionName: newConnection.connectionName,
            types: [],
            credentials: { host: '', port: '', username: '', password: '' }, // Agrega credenciales vacías para nueva conexión
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
      const newTypes = Array.isArray(selectedConnection.types)
        ? selectedConnection.types
        : [];  // Asegurarse de que types sea siempre un array
  
      const updatedTypes = isEnabled
        ? [...newTypes, type]
        : newTypes.filter((t) => t !== type);
  
      const newCredentials = { ...selectedConnection.credentials };
      if (!isEnabled) {
        delete newCredentials[type];
      } else if (!newCredentials[type]) {
        newCredentials[type] = { host: '', port: '', username: '', password: '' };
      }
  
      setSelectedConnection({
        ...selectedConnection,
        types: updatedTypes,
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
    const config = selectedConnection?.credentials[type] || {
      host: '',
      username: '',
      password: '',
      port: 5432,
    };
  
    try {
      setTestingConnection(type);
  
      const response = await testPostgresConnection(config);
      console.log('Conexión exitosa:', response.message);
  
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'success',
        title: `Conexión exitosa a ${type}`,
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.error('Error al probar la conexión:', error.message);
  
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: `No se pudo conectar a ${type}`,
        text: error.message || 'Ocurrió un error',
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setTestingConnection(null);
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
        newConnection={newConnection}
        setNewConnection={setNewConnection}
        leftPanelWidth={leftPanelWidth}
      />

      {/* Resizer */}
      <button
        className="resizer"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'col-resize', width: '5px', backgroundColor: '#ddd', border: 'none', padding: '0', outline: 'none' }}
        aria-label="Resizer"
      >
      </button>

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
