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

    useEffect(() => {
        const fetchDatabases = async () => {
            const response = await context_activateDB();
            if (response.result) {
                const dbState = {
                    Postgres: { active: response.result.activePostgres, description: "Base de datos relacional conocida por su extensibilidad y cumplimiento de SQL." },
                    Maria: { active: response.result.activeMaria, description: "Fork de MySQL con rendimiento mejorado y motores de almacenamiento adicionales." },
                    Mongo: { active: response.result.activeMongo, description: "Base de datos NoSQL que ofrece alto rendimiento, alta disponibilidad y fácil escalabilidad." },
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
            [dbName]: { ...prev[dbName], active: !prev[dbName].active },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirm = await showConfirmationAlert(
            "¿Estás seguro?",
            "Los cambios se aplicarán en las configuraciones seleccionadas. ¿Deseas continuar?"
        );
        if (!confirm.isConfirmed) {
            return;
        }
        showLoadingAlert("Aplicando cambios", "Por favor, espera mientras se aplican los cambios.");
        try {
            await content_docker_install();
            console.log("Docker instalado");
            for (const [dbName, { active }] of Object.entries(databases)) {
                const databaseType = dbName.toLowerCase();
                if (active !== initialDatabases[dbName].active) {
                    if (active) {
                        await context_updateDB(databaseType);
                        console.log(`${databaseType} activado`);
                    } else {
                        await context_deleteDB(databaseType);
                        console.log(`${databaseType} desactivado`);
                    }
                }
            }
            setInitialDatabases(databases);
        } catch (error) {
            console.error("Error durante la operación:", error);
        } finally {
            closeAlert();
        }
    };

    const getIcon = (dbName) => {
        switch (dbName) {
            case "Postgres":
                return <i className="fas fa-database text-dark dark:text-white text-2xl"></i>;
            case "Maria":
                return <i className="fas fa-server text-dark dark:text-white text-2xl"></i>;
            case "Mongo":
                return <i className="fas fa-file-code text-dark dark:text-white text-2xl"></i>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-10  ">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Activar Alertas de Bases de Datos</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        Selecciona las bases de datos que deseas activar o desactivar las alertas predefinadas del aplicativo Security Monitoring.
                    </p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {Object.entries(databases).map(([dbName, { active, description }]) => (
                            <div key={dbName} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                                <div className="flex-shrink-0">{getIcon(dbName)}</div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{dbName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={active}
                                        onChange={() => handleChange(dbName)}
                                        className="sr-only peer"
                                        id={`toggle-${dbName}`}
                                    />
                                    <label
                                        htmlFor={`toggle-${dbName}`}
                                        className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 cursor-pointer transition-colors ease-in-out duration-200 peer-checked:bg-blue-600"
                                    >
                                        <span className="sr-only">Usar configuración</span>
                                        <span
                                            className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full ${active ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="w-full btn-dark text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                            disabled={loading_activateDB || loading_updateDB || loading_deleteDB || loading_docker_install}
                        >
                            Guardar cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

