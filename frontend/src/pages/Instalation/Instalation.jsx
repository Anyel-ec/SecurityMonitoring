import React, { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import GrafanaStep from './step/GrafanaStep';
import PrometheusStep from './step/PrometheusStep';
import ExporterStep from './step/ExporterStep';
import UserInstallStep from './step/UserInstallStep';
import { grafanaValidationSchema, prometheusValidationSchema, exportersValidationSchema, userInstallValidationSchema } from './validationSchemas';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService, saveUserInstallService } from '../../hooks/services/installing/installationService';
import { checkContainerStatusService, runDockerInstallService } from '../../hooks/services/dockerService';
import { createDashboard, createPrometheusDatasource } from '../../hooks/services/grafanaService';
import { showLoadingAlert, closeAlert, showSuccessAlert, showErrorAlert, showRetryAlert, showErrorAlertMessage } from '../../components/alerts/Alerts';
import { completeInstallation } from './helper/installationHelper';
import { toggleTheme } from '../../store/themeConfigSlice';
import IconLaptop from '../../components/Icon/IconLaptop';
import IconSun from '../../components/Icon/IconSun';
import IconMoon from '../../components/Icon/IconMoon';

const Instalation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Instalación'));
    });
    const [showModal, setShowModal] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isInstalling, setIsInstalling] = useState(false);

    const navigate = useNavigate();

    const handleModalClose = () => {
        setShowModal(false);
    };

    const [formState, setFormState] = useState({
        name: 'Anyel', lastname: 'Patino', company: 'ESPE', usuario: 'anyel', password: 'anyel', passwordConfirm: 'anyel', numberPhone: '0939470232', email: 'appatino@espe.edu.ec',
        grafanaAdmin: 'anyel', grafanaPassword: 'anyel', grafanaPasswordConfirm: 'anyel', grafanaLocalPort: '3000', grafanaDockerPort: '3000',
        prometheusLocalPort: '9090', prometheusDockerPort: '9090',
        internalPortPostgres: '9187', externalPortPostgres: '9187', internalPortMariadb: '9104', externalPortMariadb: '9104',
        internalPortMongodb: '9216', externalPortMongodb: '9216',
        alertmanagerLocalPort: '9093', alertmanagerDockerPort: '9093'

    });

    useEffect(() => {
        localStorage.removeItem('token');
        if (touched.grafanaPasswordConfirm) {
            const errorMessage =
                formState.grafanaPassword !== formState.grafanaPasswordConfirm ? 'Las contraseñas no coinciden' : '';
            setErrors((prev) => ({ ...prev, grafanaPasswordConfirm: errorMessage }));
        }
    }, [formState.grafanaPassword, formState.grafanaPasswordConfirm, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));

        let validationSchema;
        if (currentStep === 1) validationSchema = userInstallValidationSchema;
        if (currentStep === 2) validationSchema = grafanaValidationSchema;
        if (currentStep === 3) validationSchema = prometheusValidationSchema;
        if (currentStep === 4) validationSchema = exportersValidationSchema;

        Yup.reach(validationSchema, name)
            .validate(value)
            .then(() => {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            })
            .catch((validationError) => {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError.message }));
            });

        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    };

    const runDockerAndCheckStatus = async () => {
        showLoadingAlert('Ejecutando Docker-Compose...', 'Por favor, espera mientras se descargan las imagenes en Docker.');
        try {
            await runDockerInstallService();
            closeAlert();
            setIsInstalling(true);
            startStatusCheck();
        } catch (error) {
            closeAlert();
            showErrorAlert('Error', error.message || 'Hubo un problema al ejecutar Docker.');
        }
    };

    const startStatusCheck = () => {
        const intervalId = setInterval(async () => {
            const response = await checkContainerStatusService();
            if (response.success) {
                setIsInstalling(false);
                clearInterval(intervalId);
                setCurrentStep((prev) => prev + 1);
                showSuccessAlert('Instalación Completa', 'Tanto Grafana como Prometheus están ejecutándose.');
            }
        }, 15000);
    };

    const saveStep = async (data, serviceFunction, successMessage) => {
        try {
            console.log("Guardando datos...", data);
            await serviceFunction(data);
            showSuccessAlert('Guardado exitoso', successMessage);
            setCurrentStep((prev) => prev + 1);
        } catch (error) {
            showErrorAlertMessage('Error al guardar', error.message || 'Hubo un problema al guardar los datos.');
        }
    };


    useEffect(() => {
        if (touched.passwordConfirm) {
            const errorMessage =
                formState.password !== formState.passwordConfirm ? 'Las contraseñas no coinciden' : '';
            setErrors((prev) => ({ ...prev, passwordConfirm: errorMessage }));
        }
    }, [formState.password, formState.passwordConfirm, touched]);

    const handleStepValidationAndSave = (validationSchema, saveFunction) => {
        validationSchema
            .validate(formState, { abortEarly: false })
            .then(() => {
                setErrors({});
                saveFunction();
            })
            .catch((validationErrors) => {
                const errorObject = {};
                validationErrors.inner.forEach((error) => {
                    errorObject[error.path] = error.message;
                });
                setErrors(errorObject);

                showErrorAlert('Error', 'Corrige los campos marcados.');
            });
    };

    const saveUserInstall = () => {
        const userInstallData = {
            usuario: formState.usuario,
            password: formState.password,
            passwordConfirm: formState.passwordConfirm,
            numberPhone: formState.numberPhone,
            email: formState.email,
            name: formState.name,
            lastname: formState.lastname,
            company: formState.company
        };

        saveStep(userInstallData, saveUserInstallService, 'Usuario guardado correctamente');
    };


    const saveGrafanaInstall = () => {
        const grafanaInstallData = {
            usuario: formState.grafanaAdmin,
            password: formState.grafanaPassword,
            internalPort: parseInt(formState.grafanaLocalPort),
            externalPort: parseInt(formState.grafanaDockerPort),
        };
        console.log("Se guardo grafana", grafanaInstallData);

        saveStep(grafanaInstallData, saveGrafanaInstallService, 'Instalación de Grafana guardada correctamente');
    };

    const savePrometheusInstall = () => {
        const prometheusInstallData = {
            internalPort: parseInt(formState.prometheusLocalPort),
            externalPort: parseInt(formState.prometheusDockerPort),
            internalPortAlertmanager: parseInt(formState.alertmanagerLocalPort),
            externalPortAlertmanager: parseInt(formState.alertmanagerDockerPort)
        };

        saveStep(prometheusInstallData, savePrometheusInstallService, 'Instalación de Prometheus y Alertmanager guardada correctamente');
    };

    const savePrometheusExporters = async () => {
        const exportersData = {
            internalPortPostgres: parseInt(formState.internalPortPostgres),
            externalPortPostgres: parseInt(formState.externalPortPostgres),
            internalPortMariadb: parseInt(formState.internalPortMariadb),
            externalPortMariadb: parseInt(formState.externalPortMariadb),
            internalPortMongodb: parseInt(formState.internalPortMongodb),
            externalPortMongodb: parseInt(formState.externalPortMongodb),
        };

        try {
            console.log('Datos de exportadores a enviar:', exportersData);

            const response = await saveOrUpdatePrometheusExportersService(exportersData);

            if (!response.success) {
                throw new Error(response.message || "Error en la validación de los exportadores.");
            }

            console.log("Validación de exportadores exitosa:", response);
        } catch (error) {
            // Utilizamos la alerta que muestra el mensaje completo
            showErrorAlertMessage("Error en la validación de exportadores", error.message || error.toString());
            throw error; // Lanza el error para manejarlo en otro nivel si es necesario
        }
    };




    const handleCompleteInstallation = async () => {
        try {
            // Mostrar el spinner de carga con SweetAlert
            showLoadingAlert('Finalizando Configuración...', 'Configurando Grafana con el dashboard y datasource.');

            const attemptGrafanaSetup = async () => {
                try {
                    // Ejecuta después de un retraso de 5 segundos
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    await createDashboard();
                    await createPrometheusDatasource();

                    // Cerrar el spinner de carga y mostrar éxito
                    closeAlert();
                    showSuccessAlert('Configuración Completa', 'Dashboard y datasource creados en Grafana.');
                    completeInstallation();

                } catch (error) {
                    // Manejo de error y opción para reintentar
                    closeAlert();
                    showRetryAlert(
                        'Error en la configuración',
                        'Hubo un problema al configurar el dashboard y datasource en Grafana.',
                        attemptGrafanaSetup // Reintentar la configuración
                    );
                }
            };

            attemptGrafanaSetup(); // Inicia el intento de configuración
        } catch (error) {
            console.error('Error en la instalación final:', error);
            closeAlert();
            showErrorAlert('Error', 'Ocurrió un problema al completar la instalación.');
        }
    };

    const nextStep = () => {
        switch (currentStep) {
            case 1:
                setTouched({ usuario: true, password: true, passwordConfirm: true, numberPhone: true, email: true });
                handleStepValidationAndSave(userInstallValidationSchema, saveUserInstall);
                break;
            case 2:
                setTouched({
                    grafanaAdmin: true,
                    grafanaPassword: true,
                    grafanaPasswordConfirm: true,
                    grafanaLocalPort: true,
                    grafanaDockerPort: true,
                });
                handleStepValidationAndSave(grafanaValidationSchema, saveGrafanaInstall);
                break;
            case 3:
                setTouched({ prometheusLocalPort: true, prometheusDockerPort: true });
                handleStepValidationAndSave(prometheusValidationSchema, savePrometheusInstall);
                break;
            case 4:
                setTouched({
                    internalPortPostgres: true,
                    externalPortPostgres: true,
                    internalPortMariadb: true,
                    externalPortMariadb: true,
                    internalPortMongodb: true,
                    externalPortMongodb: true,
                });
                console.log("Validando los exportadores de Prometheus... CASO 4");
                savePrometheusExporters();

                break;
            case 5:
                runDockerInstallService();
                break;

            case 6:
                handleCompleteInstallation();
                break;
            default:
                break;
        }
    };

    const prevStep = () => {
        if (currentStep === steps.length) return; // Evita regresar desde el paso final
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <UserInstallStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
            case 2:
                return <GrafanaStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
            case 3:
                return <PrometheusStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
            case 4:
                return <ExporterStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
            case 5:
                return (
                    <div className="text-center">
                        {isInstalling ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        ) : (
                            <i className="fas fa-check text-green-500 mx-auto" style={{ fontSize: '1.5rem' }}></i>
                        )}
                        <h2 className="text-2xl font-bold mt-4">Se estan descargando las imagenes en docker</h2>
                        <img
                            src="https://www.libertya.org/wp-content/uploads/2021/02/icono1.gif"
                            alt="Instalación Completa"
                            className="my-4 mx-auto"
                            style={{ maxWidth: "300px" }}
                        />
                        <p className="mt-2">Solo falta un último paso....</p>
                    </div>
                );
            case 6:
                return (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Instalación Completa!</h1>
                        <img
                            src="https://i.postimg.cc/SNnGkdLC/check-2.png"
                            alt="Instalación Completa"
                            className="my-4 mx-auto"
                            style={{ maxWidth: "250px" }}
                        />
                        <p className="text-xl font-bold">Su configuración está lista. Verificación de la configuración del panel y la fuente de datos de Grafana.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const steps = [
        { number: 1, title: 'Usuario', icon: 'fa-solid fa-user' },
        { number: 2, title: 'Grafana', icon: 'fa-solid fa-database' },
        { number: 3, title: 'Prometheus', icon: 'fa-solid fa-chart-line' },
        { number: 4, title: 'Exportación', icon: 'fa-solid fa-cubes' },
        { number: 5, title: 'Instalación', icon: 'fa-solid fa-spinner' },
        { number: 6, title: 'Completo', icon: 'fa-solid fa-check' }
    ];

    const themeConfig = useSelector((state) => state.themeConfig);
    const features = [
        { icon: "fas fa-database", title: "Monitoreo Unificado", description: "Seguimiento de múltiples bases de datos en una plataforma" },
        { icon: "fas fa-server", title: "Backend Robusto", description: "Desarrollado en Spring Boot para un rendimiento óptimo" },
        { icon: "fas fa-chart-line", title: "Visualización Avanzada", description: "Métricas detalladas con Grafana y Prometheus" },
        { icon: "fas fa-code", title: "Código Abierto", description: "Personalizable y mejorable según tus necesidades" },
    ]


    const tags = ["MongoDB", "PostgreSQL", "MariaDB", "React", "Spring Boot", "Grafana"]

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Modal de Bienvenida */}
            {/* Modal de Bienvenida */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white-900 rounded-lg shadow-lg max-w-4xl w-full p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-dark to-pink-600 bg-clip-text text-dark text-center">
                            Bienvenido a la Herramienta de Monitoreo
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Esta herramienta está diseñada para ofrecer una solución integral para el monitoreo de bases de datos.
                            Descubre cómo gestionar y visualizar tus métricas con facilidad utilizando nuestras tecnologías avanzadas.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors duration-300 flex items-start space-x-4"
                                >
                                    <i className={`${feature.icon} text-dark-400 text-2xl`}></i>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {tags.map((tag, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="relative group"
                                >
                                    <span className="bg-gray-100 text-dark border border-purple-100 px-3 py-1 rounded-full hover:bg-dark hover:text-white transition-colors duration-300">
                                        {tag}
                                    </span>
                                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Tecnología soportada
                                    </div>
                                </motion.div>
                            ))}
                        </div> */}

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 bg-dark from-purple-600 to-pink-600 text-white font-bold rounded-md shadow-md hover:from-purple-700 hover:to-pink-700 transition duration-300"
                        >
                            Continuar
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Contenido Principal */}
            {!showModal && (
                <>
                    {/* Agregar el título principal */}

                    {/* Theme Configuration */}
                    <div className="fixed top-6 right-6">
                        {themeConfig.theme === 'light' && (
                            <button
                                className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                onClick={() => dispatch(toggleTheme('dark'))}
                            >
                                <IconSun />
                            </button>
                        )}
                        {themeConfig.theme === 'dark' && (
                            <button
                                className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                onClick={() => dispatch(toggleTheme('system'))}
                            >
                                <IconMoon />
                            </button>
                        )}
                        {themeConfig.theme === 'system' && (
                            <button
                                className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                onClick={() => dispatch(toggleTheme('light'))}
                            >
                                <IconLaptop />
                            </button>
                        )}
                    </div>


                    <div className="flex flex-col w-full h-screen max-w-6xl p-8">
                        {/* Progress Steps */}
                        <div className="text-center my-8">
                            <h1 className="text-4xl font-bold text-blue-600 mb-2">Parámetros de Instalación del Sistema</h1>
                            <p className="text-gray-500 text-lg">
                                Configure los parámetros necesarios para la instalación del sistema de monitoreo.
                            </p>
                        </div>
                        <div className="relative mb-12 mt-10">
                            {/* Connecting Lines */}

                            <div className="absolute top-5 dark:bg-dark left-0 right-0 h-[2px] bg-blue-300">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                />
                                <div>

                                </div>
                            </div>


                            {/* Steps */}
                            <div className="flex justify-between relative z-10">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex flex-col items-center">

                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-2 ${currentStep > step.number
                                                ? 'bg-blue-600 text-white'
                                                : currentStep === step.number
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white dark:bg-dark text-blue-600 dark:text-blue-300 border-2 border-blue-300'
                                                } transition-all duration-300`}
                                        >
                                            {step.number}
                                        </div>
                                        <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap dark:text-blue-600 text-blue-500">
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="panel p-5 mb-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {renderStepContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-end mt-5">
                            {currentStep > 1 && currentStep < steps.length && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-2 mr-4 btn btn-outline-primary rounded-md hover:bg-white hover:text-primary transition-colors duration-300"
                                >
                                    Anterior
                                </button>
                            )}
                            <button
                                onClick={async () => {
                                    if (currentStep === 4) {
                                        console.log("Validando los exportadores de Prometheus...");

                                        try {
                                            // Ejecuta el método para validar y guardar los exportadores
                                            await savePrometheusExporters();

                                            // Si no hay errores, avanza al paso 5
                                            console.log("Exportadores validados correctamente, avanzando al paso 5...");
                                            setCurrentStep(5);
                                            runDockerAndCheckStatus();
                                        } catch (error) {
                                            // Maneja errores durante la validación de exportadores
                                            console.error("Error en la validación de exportadores:", error);
                                        }
                                    } else {
                                        nextStep(); // Continúa con el flujo normal para otros pasos
                                    }
                                }}
                                disabled={currentStep === 5 && isInstalling}
                                className={`btn btn-primary transition-colors duration-300 ${currentStep === 5 && isInstalling ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {currentStep === 4 ? 'Instalar' : currentStep < 5 ? 'Siguiente' : 'Finalizar'}
                            </button>

                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default Instalation;
