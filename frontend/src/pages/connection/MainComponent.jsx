import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../utils/alerts';
import { createDatabaseCredentialRequestDto } from '../../dto/DatabaseCredentialRequestDto';
import { getConnectionNames, saveOrUpdateConnectionName, testPostgresConnection } from '../../services/connectionService';
import { getAllCredentials, deleteConnectionById, createOrUpdateCredential} from '../../services/databaseCredentialService';

export default function MainComponent() {
  const [selectedConnection, setSelectedConnection] = useState({ connectionName: '', comment: '', types: [], credentials: {} });
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({ connectionName: '' });
  const [testingConnection, setTestingConnection] = useState(null);
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const fetchAllCredentials = async () => {
    try {
      const data = await getAllCredentials();
      setConnections(data.result);  // Configurar conexiones obtenidas
    } catch (error) {
      console.error('Error al obtener todas las credenciales:', error);
      showErrorAlert('No se pudieron obtener las credenciales');
    }
  };
  

  useEffect(() => {
    fetchAllCredentials();
  }, []);

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
      id: conn.id,
      host: conn.host || '',
      port: conn.port || '',
      username: conn.username || '',
      password: conn.password || '',
      comment: conn.comment || '',
      systemParameter: conn.systemParameter || { name: '' },
      credentials: {
        PostgreSQL: conn.systemParameter.name === 'POSTGRESQL' ? { host: conn.host, port: conn.port, username: conn.username, password: conn.password } : {},
        MariaDB: conn.systemParameter.name === 'MARIADB' ? { host: conn.host, port: conn.port, username: conn.username, password: conn.password } : {},
        MongoDB: conn.systemParameter.name === 'MONGODB' ? { host: conn.host, port: conn.port, username: conn.username, password: conn.password } : {}
      }
    });
  
    // Configura los switches de acuerdo al tipo de conexión
    setPostgresEnabled(conn.systemParameter.name === 'POSTGRESQL');
    setMariaDbEnabled(conn.systemParameter.name === 'MARIADB');
    setMongoDbEnabled(conn.systemParameter.name === 'MONGODB');
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
        await fetchAllCredentials();

        showSuccessAlert('Conexión guardada con éxito', '');
      } else if (newConnection.connectionName) {
        await saveOrUpdateConnectionName(newConnection);
        await fetchAllCredentials();

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

        showSuccessAlert('Nueva conexión guardada con éxito', '');
      }
    } catch (error) {
      console.error('Error al guardar la conexión:', error);
      showErrorAlert('No se pudo guardar la conexión', error.message || 'Ocurrió un error');
    }
  };

  // Función para guardar las credenciales de la conexión en el formato del DTO
  const handleSaveCredentials = async () => {
    try {
      if (selectedConnection) {
        let systemParameter = null;
        const enabledType = postgresEnabled ? 'PostgreSQL' : mariaDbEnabled ? 'MariaDB' : mongoDbEnabled ? 'MongoDB' : null;
  
        if (enabledType) {
          // Establece el parámetro del sistema según el tipo de base de datos
          if (enabledType === 'PostgreSQL') systemParameter = { name: 'POSTGRESQL' };
          if (enabledType === 'MariaDB') systemParameter = { name: 'MARIADB' };
          if (enabledType === 'MongoDB') systemParameter = { name: 'MONGODB' };
  
          // Crear el DTO en el formato correcto
          const credentialsData = {
            host: selectedConnection.credentials[enabledType].host,
            port: selectedConnection.credentials[enabledType].port,
            username: selectedConnection.credentials[enabledType].username,
            password: selectedConnection.credentials[enabledType].password,
            systemParameter: systemParameter,
            comment: selectedConnection.comment
          };
  
          console.log('Saving credentials in DTO format:', credentialsData);
  
          // Llamada al servicio para crear o actualizar credenciales
          await createOrUpdateCredential(credentialsData);
          // Obtener todas las credenciales de bd 
          await fetchAllCredentials();
          showSuccessAlert('Credenciales guardadas con éxito', '');
        }
      }
    } catch (error) {
      console.error('Error al guardar las credenciales:', error);
      showErrorAlert('No se pudo guardar las credenciales', error.message || 'Ocurrió un error');
    }
  };

  // Función para eliminar una conexión
  const handleDelete = async () => {
    if (selectedConnection) {
      const result = await showConfirmationAlert('¿Estás seguro?', 'No podrás deshacer esta acción');
      if (result.isConfirmed) {
        try {
          await deleteConnectionById(selectedConnection.id);
          setConnections(connections.filter((conn) => conn.id !== selectedConnection.id));
          
          // Mantener un objeto vacío en lugar de null
          setSelectedConnection({ connectionName: '', comment: '', types: [], credentials: {} });
          
          showSuccessAlert('Conexión eliminada exitosamente', '');
        } catch (error) {
          console.error('Error al eliminar la conexión:', error);
          showErrorAlert('No se pudo eliminar la conexión', error.message || 'Ocurrió un error');
        }
      }
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
      showSuccessAlert(response.message, '');
    } catch (error) {
      showErrorAlert('Conexión fallida', error.message || 'No se pudo conectar. Verifica las credenciales.');
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
      />

      <ConnectionDetails
        selectedConnection={selectedConnection}
        setSelectedConnection={setSelectedConnection} // Pasar setSelectedConnection al componente ConnectionDetails
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