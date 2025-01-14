import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/axios/axiosInstance';
import yaml from 'js-yaml';
import { url_alert_rules } from '../../hooks/services/static/useApiUrl';
import { useAlertRulesService, useAlertRulesUpdateService } from '../../hooks/services/system/alert_rules.service';
import { showErrorAlert, showSuccessAlert } from '../../components/alerts/alerts';

const ConfigAlert = () => {
    const [databases, setDatabases] = useState(["Postgres", "Maria", "Mongo"]);
    const [selectedDatabase, setSelectedDatabase] = useState(null);
    const [configurations, setConfigurations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { content: context_alertRules, loading: loading_alertRules, error: error_alertRules } = useAlertRulesService();
    const { content: context_alertRulesUpdate, loading: loading_alertRulesUpdate, error: error_alertRulesUpdate } = useAlertRulesUpdateService();

    // Cargar las configuraciones al seleccionar una base de datos
    useEffect(() => {
        if (selectedDatabase) {
            fetchConfigurations(selectedDatabase);
        }
    }, [selectedDatabase]);

    // Cargar las configuraciones iniciales
    const fetchConfigurations = async (database) => {
        setLoading(true);
        setError(null);
        try {
            const response = await context_alertRules(database);

            if (response.httpCode === 200) {
                const yamlData = response?.result;
                if (!yamlData) {
                    throw new Error("No se recibieron datos del archivo YAML.");
                }

                setConfigurations(parseYamlToEditableFields(yamlData));
            } else {
                showErrorAlert(response.message, '');
                throw new Error(response.message);
            }
        } catch (err) {
            const errorMessage = err.message || "Error al cargar las configuraciones.";
            console.error("Error en la solicitud:", errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Función para parsear el YAML y extraer las configuraciones editables
    const parseYamlToEditableFields = (yamlData) => {
        try {
            const parsedData = yaml.load(yamlData); // Convertir YAML a objeto JavaScript
            const groups = parsedData.groups || [];
            const editableRules = [];

            groups.forEach((group) => {
                group.rules.forEach((rule) => {
                    editableRules.push({
                        groupName: group.name, // Nombre del grupo
                        alert: rule.alert, // Nombre de la alerta
                        expr: rule.expr, // Expresión de la alerta
                        for: rule.for, // Duración de la alerta
                        severity: rule.labels?.severity, // Severidad
                        summary: rule.annotations?.summary, // Resumen
                        description: rule.annotations?.description, // Descripción
                    });
                });
            });

            return editableRules;
        } catch (error) {
            console.error('Error al parsear el YAML:', error);
            return [];
        }
    };

    // Función para preparar el YAML a partir de las configuraciones
    const prepareYamlFromConfigurations = (configurations) => {
        const groups = {};

        configurations.forEach((config) => {
            if (!groups[config.groupName]) {
                groups[config.groupName] = { name: config.groupName, rules: [] };
            }

            groups[config.groupName].rules.push({
                alert: config.alert,
                expr: config.expr,
                for: config.for,
                labels: { severity: config.severity },
                annotations: {
                    summary: config.summary,
                    description: config.description,
                },
            });
        });

        return yaml.dump({ groups: Object.values(groups) });
    };


    // Función para guardar las configuraciones
    const saveConfigurations = async () => {
        setLoading(true);
        setError(null);
        try {
            const yamlData = prepareYamlFromConfigurations(configurations);
            const response = await context_alertRulesUpdate(selectedDatabase, yamlData);

            if (response.httpCode === 200) {
                showSuccessAlert(response.message, '');
            } else {
                showErrorAlert(response.message, '');
                throw new Error(response.message);
            }

        } catch (err) {
            setError("Error al guardar las configuraciones.");
        } finally {
            setLoading(false);
        }
    };



    const handleConfigChange = (index, field, value) => {
        const updatedConfigs = [...configurations];
        updatedConfigs[index][field] = value;
        setConfigurations(updatedConfigs);
    };



    return (
        <div>
            <h6 className="text-2xl font-bold mb-5">Configuración de alertas</h6>
            <div className="mb-5">
                <select
                    value={selectedDatabase || ""}
                    onChange={(e) => setSelectedDatabase(e.target.value)}
                    className="form-select"
                >
                    <option value="" disabled>Seleccionar base de datos</option>
                    {databases.map((db) => (
                        <option key={db} value={db}>{db}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Cargando configuraciones...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {configurations.length > 0 && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    saveConfigurations();
                }}>
                    {configurations.map((config, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                            <h5 className="font-bold text-xl">Grupo: {config.groupName}</h5>

                            <div className='grid grid-cols-2 gap-4'>

                                <div className='flex flex-col gap-1'>
                                    <label className="block font-bold mt-2">Alerta</label>
                                    <input
                                        type="text"
                                        value={config.alert}
                                        onChange={(e) => handleConfigChange(index, "alert", e.target.value)}
                                        className="form-input block w-full"
                                        placeholder="Nombre de la alerta"
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className="block font-bold mt-2">Expresión</label>
                                    <input
                                        type="text"
                                        value={config.expr}
                                        onChange={(e) => handleConfigChange(index, "expr", e.target.value)}
                                        className="form-input block w-full"
                                        placeholder="Expresión"
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className="block font-bold mt-2">Duración (for)</label>
                                    <input
                                        type="text"
                                        value={config.for}
                                        onChange={(e) => handleConfigChange(index, "for", e.target.value)}
                                        className="form-input block w-full"
                                        placeholder="Duración (for)"
                                    />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className="block font-bold mt-2">Severidad</label>
                                    <input
                                        type="text"
                                        value={config.severity}
                                        onChange={(e) => handleConfigChange(index, "severity", e.target.value)}
                                        className="form-input block w-full"
                                        placeholder="Severidad"
                                    />
                                </div>

                                <div className='flex flex-col gap-1 col-span-2'>
                                    <label className="block font-bold mt-2">Resumen</label>
                                    <input
                                        type="text"
                                        value={config.summary}
                                        onChange={(e) => handleConfigChange(index, "summary", e.target.value)}
                                        className="form-input block w-full"
                                        placeholder="Resumen"
                                    />
                                </div>

                                <div className='flex flex-col gap-1 col-span-2'>
                                    <label className="block font-bold mt-2">Descripción</label>
                                    <textarea
                                        value={config.description}
                                        onChange={(e) => handleConfigChange(index, "description", e.target.value)}
                                        className="form-textarea mt-1 block w-full"
                                        placeholder="Descripción"
                                    />
                                </div>


                            </div>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary mt-4">Guardar</button>
                </form>
            ) || (
                <>
                    <div className='panel min-h-[500px] text-center flex items-center justify-center text-3xl'>
                        Seleccione una base de datos para cargar las configuraciones.
                    </div>
                </>
            )}

        </div>
    );
};

export default ConfigAlert;
