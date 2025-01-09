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
import { showLoadingAlert, closeAlert, showSuccessAlert, showErrorAlert, showRetryAlert, showErrorAlertMessage } from '../../components/alerts/alerts';
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

    const [currentStep, setCurrentStep] = useState(1);
    const [darkMode, setDarkMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isInstalling, setIsInstalling] = useState(false);

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        usuario: '', password: '', passwordConfirm: '', numberPhone: '', email: '',
        grafanaAdmin: 'admin', grafanaPassword: '', grafanaPasswordConfirm: '', grafanaLocalPort: '3000', grafanaDockerPort: '3000',
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
        showLoadingAlert('Ejecutando Docker...', 'Por favor, espera mientras se ejecuta Docker.');
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
            numberPhone: formState.numberPhone,
            email: formState.email,
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
            console.log("Validando los exportadores de Prometheus...");
            await saveStep(exportersData, saveOrUpdatePrometheusExportersService, 'Puertos de los exportadores guardados correctamente');
            showSuccessAlert('Exportadores validados correctamente', 'Todos los puertos están disponibles.');
            runDockerAndCheckStatus();
        } catch (error) {
            showErrorAlertMessage('Error de validación', error.message);
            throw new Error("No se puede continuar debido a errores en los exportadores.");
        }
    };

    const handleCompleteInstallation = async () => {
        try {
            // Mostrar el spinner de carga con SweetAlert
            showLoadingAlert('Finalizando Configuración...', 'Configurando Grafana...');

            const attemptGrafanaSetup = async () => {
                try {
                    // Ejecuta después de un retraso de 5 segundos
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    await createDashboard();
                    await createPrometheusDatasource();

                    // Cerrar el spinner de carga y mostrar éxito
                    closeAlert();
                    showSuccessAlert('Configuración Completa', 'Dashboard y datasource creados en Grafana.');
                    completeInstallation(navigate);

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

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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
                        <h2 className="text-2xl font-bold mt-4">Instalando...</h2>
                        <p className="mt-2">Verificando el estado de los contenedores. Esto puede tardar unos segundos.</p>
                    </div>
                );
            case 6:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Instalación Competa!</h2>
                        <p className="mt-2">Su configuración está lista. Verificación de la configuración del panel y la fuente de datos de Grafana...</p>
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

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Theme Configuration */}
            <div className='fixed top-6 right-6'>
                {themeConfig.theme === 'light' ? (
                    <button
                        className={`${themeConfig.theme === 'light' &&
                            'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                        onClick={() => {
                            dispatch(toggleTheme('dark'));
                        }}
                    >
                        <IconSun />
                    </button>
                ) : (
                    ''
                )}
                {themeConfig.theme === 'dark' && (
                    <button
                        className={`${themeConfig.theme === 'dark' &&
                            'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                        onClick={() => {
                            dispatch(toggleTheme('system'));
                        }}
                    >
                        <IconMoon />
                    </button>
                )}
                {themeConfig.theme === 'system' && (
                    <button
                        className={`${themeConfig.theme === 'system' &&
                            'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                            }`}
                        onClick={() => {
                            dispatch(toggleTheme('light'));
                        }}
                    >
                        <IconLaptop />
                    </button>
                )}
            </div>

            <div className="flex flex-col w-full h-screen max-w-6xl p-8">
                {/* Progress Steps */}
                <div className="relative mb-12 mt-10">
                    {/* Connecting Lines */}
                    <div className="absolute top-5 dark:bg-dark left-0 right-0 h-[2px] bg-blue-300" >
                        <div
                            className="h-full bg-blue-600 dark:bg-red transition-all duration-300 ease-in-out"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}% }`}}
                        />
                    </div>

                    {/* Steps */}
                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-2
                      ${currentStep > step.number ? 'bg-blue-600 text-white' :
                                            currentStep === step.number ? 'bg-blue-600 text-white' :
                                                'bg-white dark:bg-dark text-blue-600 dark:text-blue-300 border-2 border-blue-300'}
                      transition-all duration-300`}
                                >
                                    {step.number}
                                </div>
                                <span className={`text-xs font-semibold uppercase tracking-wider whitespace-nowrap dark:text-blue-600 text-blue-500`}>
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
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 mr-4 btn btn-outline-primary rounded-md hover:bg-white hover:text-primary transition-colors duration-300"
                        >
                            Anterior
                        </button>
                    )}
                    <button
                        onClick={nextStep}
                        disabled={currentStep === 5 && isInstalling}
                        className={`btn btn-primary transition-colors duration-300
                ${(currentStep === 5 && isInstalling) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {currentStep === 4 ? 'Instalar' : currentStep < 5 ? 'Siguiente' : 'Finalizar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Instalation;
