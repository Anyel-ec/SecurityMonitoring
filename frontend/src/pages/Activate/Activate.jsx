import React, { useEffect, useState } from "react";
import {
    useActivateDBService,
    useDeleteDBService,
    useDockerInstallService,
    useUpdateDBService,
} from "../../hooks/services/system/activate_database.service";
import { showConfirmationAlert, showLoadingAlert, closeAlert } from "../../components/alerts/alerts";
export default function Activate() {
    const { content: context_activateDB, loading: loading_activateDB, error: error_activateDB } = useActivateDBService();
    const { content: context_updateDB, loading: loading_updateDB, error: error_updateDB } = useUpdateDBService();
    const { content: context_deleteDB, loading: loading_deleteDB, error: error_deleteDB } = useDeleteDBService();
    const { content: content_docker_install, loading: loading_docker_install, error: error_docker_install } = useDockerInstallService();
    const [databases, setDatabases] = useState({});
    const [initialDatabases, setInitialDatabases] = useState({});
    // Cargar las bases de datos disponibles
    useEffect(() => {
        const fetchDatabases = async () => {
            const response = await context_activateDB();
            if (response.result) {
                const dbState = {
                    Postgres: response.result.activePostgres,
                    Maria: response.result.activeMaria,
                    Mongo: response.result.activeMongo,
                };
                setDatabases(dbState);
                setInitialDatabases(dbState);
            }
        };
        fetchDatabases();
    }, []);
    const handleChange = (dbName) => {
        setDatabases((prev) => ({
            ...prev,
            [dbName]: !prev[dbName],
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mostrar alerta de confirmación antes de continuar
        const confirm = await showConfirmationAlert(
            "¿Estás seguro?",
            "Los cambios se aplicarán en las configuraciones seleccionadas. ¿Deseas continuar?"
        );
        if (!confirm.isConfirmed) {
            return; // Si el usuario cancela, no hacer nada
        }
        // Mostrar alerta de carga
        showLoadingAlert("Aplicando cambios", "Por favor, espera mientras se aplican los cambios.");
        try {
            // Ejecutar la API de Docker
            await content_docker_install();
            console.log("Docker instalado");
            // Procesar cambios en las bases de datos
            for (const [dbName, isActive] of Object.entries(databases)) {
                const databaseType =
                    dbName === "Postgres" ? "postgres" : dbName === "Maria" ? "maria" : "mongo";
                // Verifica si el estado cambió respecto al inicial
                if (isActive !== initialDatabases[dbName]) {
                    if (isActive) {
                        // Activar regla
                        await context_updateDB(databaseType);
                        console.log(`${databaseType} activado`);
                    } else {
                        // Desactivar regla
                        console.log("Entrando x aqui")
                        await context_deleteDB(databaseType);
                        console.log(`${databaseType} desactivado`);
                    }
                console.log("Saliendo x aqui")
                }
            }
            // Actualiza los estados iniciales después de guardar
            setInitialDatabases(databases);
        } catch (error) {
            console.error("Error durante la operación:", error);
        } finally {
            // Cerrar la alerta de carga
            closeAlert();
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
            <div className="panel shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    Activar Configuraciones
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {Object.entries(databases).map(([dbName, isActive]) => (
                        <div
                            key={dbName}
                            className="flex items-center justify-between panel p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                        >
                            <span className="text-lg font-medium text-gray-700 dark:text-gray-400">
                                {dbName}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="peer absolute opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"
                                    checked={isActive}
                                    onChange={() => handleChange(dbName)}
                                />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#adb5bd] after:border-[#adb5bd] peer-checked:after:bg-white peer-checked:after:border-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full hover:bg-blue-600 text-white btn-dark dark:btn-light font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading_activateDB || loading_updateDB || loading_deleteDB || loading_docker_install}
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
}
