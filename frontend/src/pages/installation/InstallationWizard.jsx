import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, ProgressBar, Spinner } from 'react-bootstrap';
import { Check, Database, FileEarmarkCheck, PersonFill } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService, saveUserInstallService } from '../../services/installationService';
import * as Yup from 'yup'; // Yup para validaciones
import GrafanaStep from './step/GrafanaStep'; // Importe el componente de Grafana 
import PrometheusStep from './step/PrometheusStep'; // Importe el componente de Prometheus
import ExporterStep from './step/ExporterStep'; // Importa el componente de configuración de exportadores
import UserInstallStep from './step/UserInstallStep'; // Importa el componente de instalación de usuario
import { grafanaValidationSchema, prometheusValidationSchema, exportersValidationSchema, userInstallValidationSchema } from './validationSchemas';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { completeInstallation } from '../../pages/installation/helper/installationHelper';
import { checkContainerStatusService, runDockerInstallService } from '../../services/dockerService';
import { createDashboard, createPrometheusDatasource } from '../../services/grafanaService';

import { showLoadingAlert, closeAlert, showSuccessAlert, showErrorAlert } from '../../utils/alerts';
export default function InstallationWizard() {
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
  });

  useEffect(() => {
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
      await serviceFunction(data);
      showSuccessAlert('Guardado exitoso', successMessage);
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      showErrorAlert('Error', 'Hubo un problema al guardar los datos.');
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

    saveStep(grafanaInstallData, saveGrafanaInstallService, 'Instalación de Grafana guardada correctamente');
  };

  const savePrometheusInstall = () => {
    const prometheusInstallData = {
      internalPort: parseInt(formState.prometheusLocalPort),
      externalPort: parseInt(formState.prometheusDockerPort),
    };

    saveStep(prometheusInstallData, savePrometheusInstallService, 'Instalación de Prometheus guardada correctamente');
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

    await saveStep(exportersData, saveOrUpdatePrometheusExportersService, 'Puertos de los exportadores guardados correctamente');
    runDockerAndCheckStatus();
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
          // Redirige al inicio ("/") después de la configuración exitosa
          completeInstallation(navigate); // Asegúrate de pasar navigate aquí

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
              <Spinner animation="border" variant="primary" />
            ) : (
              <Check size={50} color="green" />
            )}
            <h2>Installing...</h2>
            <p>Verificando el estado de los contenedores. Esto puede tardar unos segundos.</p>
          </div>
        );
      case 6:
        return (
          <div className="text-center">
            <h2>Installation Complete!</h2>
            <p>Your setup is ready. Verifying Grafana dashboard and datasource setup...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen d-flex align-items-center justify-content-center ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Card className={`w-100 p-4 shadow-lg card-fixed-size ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <div className="step-icons">
          <div className="step">
            <div className={currentStep >= 1 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 1 ? <Check /> : <PersonFill />}
            </div>
            <span>User Install</span>
          </div>
          <div className="step">
            <div className={currentStep >= 2 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 2 ? <Check /> : <Database />}
            </div>
            <span>Grafana</span>
          </div>
          <div className="step">
            <div className={currentStep >= 3 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 3 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Prometheus</span>
          </div>
          <div className="step">
            <div className={currentStep >= 4 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 4 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Exporters</span>
          </div>
          <div className="step">
            <div className={currentStep >= 5 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 5 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Installing</span>
          </div>
          <div className="step">
            <div className={currentStep >= 6 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 6 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Complete</span>
          </div>
        </div>

        <ProgressBar now={(currentStep / 6) * 100} className="progress-bar" style={{ width: `${(currentStep / 6) * 100}%` }} />

        <div className="scrollable-content">
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="d-flex justify-content-end mt-4">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline-secondary" className="me-2">
              Previous
            </Button>
          )}
          <Button onClick={nextStep} className="ml-auto" disabled={currentStep === 5 && isInstalling}>
            {currentStep === 4 ? 'Instalar' : currentStep < 6 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}