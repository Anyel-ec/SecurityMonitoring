import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert } from '../../utils/alerts';
import { createDatabaseCredentialRequestDto } from '../../dto/DatabaseCredentialRequestDto';
import { getConnectionNames, saveOrUpdateConnectionName, saveOrUpdateConnectionCredentials, deleteConnectionById, testPostgresConnection } from '../../services/connectionService';
import { getAllCredentials} from '../../services/databaseCredentialService';

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
    // Llamar al servicio para obtener todas las credenciales
    const fetchAllCredentials = async () => {
      try {
        const data = await getAllCredentials();
        setConnections(data.result);  // Configurar conexiones obtenidas
      } catch (error) {
        console.error('Error al obtener todas las credenciales:', error);
        showErrorAlert('No se pudieron obtener las credenciales');
      }
    };

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
      ...conn,
      comment: conn.comment || '', // Aseguramos que el campo 'comment' esté presente
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

        showSuccessAlert('Conexión guardada con éxito', '');
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

          // Usa el DTO para crear el objeto de credenciales
          const credentialsData = createDatabaseCredentialRequestDto(
            selectedConnection.credentials[enabledType].host,
            selectedConnection.credentials[enabledType].port,
            selectedConnection.credentials[enabledType].username,
            selectedConnection.credentials[enabledType].password,
            systemParameter,
            selectedConnection.comment
          );

          console.log('Saving credentials in DTO format:', credentialsData);

          await saveOrUpdateConnectionCredentials(credentialsData);
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
          setConnections(connections.filter((conn) => conn.connectionName !== selectedConnection.connectionName));
          setSelectedConnection(null);
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
