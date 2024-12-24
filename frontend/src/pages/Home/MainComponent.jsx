import React, { useState, useRef, useEffect } from 'react';
import SavedConnections from './SavedConnections';
import ConnectionDetails from './ConnectionDetails';
import { loginAndAccessDashboard } from '../../hooks/services/grafanaService';
import { showSuccessAlert, showErrorAlert, showConfirmationAlert, showDockerErrorAlert } from '../../components/alerts/alerts';
import { getAllCredentials, deleteConnectionById, createOrUpdateCredential } from '../../hooks/services/databaseCredentialService';
import { checkDockerStatus, checkIfComposeExecuted, runDockerComposeWithDatabase } from '../../hooks/services/dockerService';

export default function MainComponent() {
  const [selectedConnection, setSelectedConnection] = useState({ connectionName: '', comment: '', types: [], credentials: {} });
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({ connectionName: '' });
  const [testingConnection, setTestingConnection] = useState(null);
  const [postgresEnabled, setPostgresEnabled] = useState(false);
  const [mariaDbEnabled, setMariaDbEnabled] = useState(false);
  const [mongoDbEnabled, setMongoDbEnabled] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [dockerChecked, setDockerChecked] = useState(false); // Estado para rastrear el estado de Docker
  const [composeExecuted, setComposeExecuted] = useState(false); // Estado para rastrear si Docker Compose ya fue ejecutado
  const [isCheckingDocker, setIsCheckingDocker] = useState(false); // Nuevo estado para evitar múltiples llamadas
  const containerRef = useRef(null);
  const isDragging = useRef(false);


  // En tu componente MainComponent
  const handleMonitor = async (dbType) => {
    if (!dbType) {
      showErrorAlert('No se ha seleccionado una base de datos válida.');
      return;
    }

    try {
      const response = await loginAndAccessDashboard(dbType);
      if (response && response.redirectUrl) {
        window.location.href = response.redirectUrl; // Redirige en el frontend
      } else {
        showErrorAlert('No se pudo acceder al dashboard de Grafana.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión y acceder al dashboard de Grafana:', error);
      showErrorAlert('Error al acceder al dashboard de Grafana');
    }
  };


  // Función para verificar el estado de Docker y luego el estado de Docker Compose
  const checkDockerAndFetchData = async () => {
    if (isCheckingDocker) return; // Si ya estamos verificando, salir
    setIsCheckingDocker(true); // Marcar como en proceso de verificación

    try {
      const dockerResponse = await checkDockerStatus();
      if (dockerResponse.success) {
        console.log('Docker está en ejecución');
        setDockerChecked(true); // Marca Docker como verificado

        // Verificar si Docker Compose ya ha sido ejecutado solo una vez
        const composeStatus = localStorage.getItem("composeExecuted");
        if (!composeStatus) {
          const composeResponse = await checkIfComposeExecuted();
          if (composeResponse.success) {
            setComposeExecuted(true);
            localStorage.setItem("composeExecuted", "true"); // Guardar el estado en localStorage
            console.log('Docker Compose ya ha sido ejecutado.');
          } else {
            console.log('Docker Compose no ha sido ejecutado.');
          }
        } else {
          setComposeExecuted(true); // Recuperar el estado de localStorage
          console.log('Docker Compose ya estaba marcado como ejecutado.');
        }
      } else {
        setDockerChecked(false);
        showDockerErrorAlert(checkDockerAndFetchData); // Muestra la alerta y reintenta si Docker no está en ejecución
      }
    } catch (error) {
      console.error('Error al verificar el estado de Docker:', error);
      setDockerChecked(false);
      showDockerErrorAlert(checkDockerAndFetchData);
    } finally {
      setIsCheckingDocker(false); // Liberar el estado de verificación al finalizar
    }
  };

  // Ejecutar verificación al montar el componente
  useEffect(() => {
    if (!dockerChecked) {
      checkDockerAndFetchData(); // Llama a la verificación de Docker solo si aún no se ha verificado
    }
  }, [dockerChecked]);

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
          // Ejecutar Docker Compose con la base de datos después de guardar las credenciales
          await runDockerComposeWithDatabase();
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
      // Crear el objeto completo DatabaseCredential
      const config = {
        ...selectedConnection,
        // Extrae las credenciales correctas según el tipo (PostgreSQL, MariaDB, MongoDB)
        host: selectedConnection.credentials[type]?.host,
        port: selectedConnection.credentials[type]?.port,
        username: selectedConnection.credentials[type]?.username,
        password: selectedConnection.credentials[type]?.password,
        systemParameter: {
          name: type.toUpperCase() // Asegúrate de que coincida con el tipo de BD en mayúsculas
        },
        comment: selectedConnection.comment || ''
      };

      console.log('Enviando objeto DatabaseCredential:', config);

      // Llama a la función de prueba de conexión con el objeto completo
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
        handleMonitor={() => {
          if (selectedConnection && selectedConnection.systemParameter) {
            handleMonitor(selectedConnection.systemParameter.name);
          } else {
            showErrorAlert('No se ha seleccionado una conexión válida.');
          }
        }}
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