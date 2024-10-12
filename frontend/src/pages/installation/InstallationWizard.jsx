import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Check, Database, FileEarmarkCheck, PersonFill } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { completeInstallService, saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService, saveUserInstallService } from '../../services/installationService';
import * as Yup from 'yup'; // Yup para validaciones
import GrafanaStep from './step/GrafanaStep'; // Importe el componente de Grafana 
import PrometheusStep from './step/PrometheusStep'; // Importe el componente de Prometheus
import ExporterStep from './step/ExporterStep'; // Importa el componente de configuración de exportadores
import UserInstallStep from './step/UserInstallStep'; // Importa el componente de instalación de usuario
import { grafanaValidationSchema, prometheusValidationSchema, exportersValidationSchema, userInstallValidationSchema } from './validationSchemas';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { runDockerInstallService } from '../../services/dockerComposeService'; // Importa el servicio que ejecuta Docker Compose
import { completeInstallation } from '../../pages/installation/helper/installationHelper'; // Importa la función completa desde el archivo helper

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Hook de react-router-dom para redirigir
  const navigate = useNavigate(); // Añade useNavigate aquí

  const [formState, setFormState] = useState({
    // Step 1: User Installation
    usuario: '', password: '', passwordConfirm: '', numberPhone: '', email: '',

    // Step 2 state (Grafana)
    grafanaAdmin: 'admin', grafanaPassword: '', grafanaPasswordConfirm: '', grafanaLocalPort: '3000', grafanaDockerPort: '3000',

    // Step 3 state (Prometheus)
    prometheusLocalPort: '9090', prometheusDockerPort: '9090',

    // Step 4 state (Ports for Exporters of PostgreSQL, MongoDB, MariaDB)
    internalPortPostgres: '9187', externalPortPostgres: '9187', internalPortMariadb: '9104', externalPortMariadb: '9104', internalPortMongodb: '9216',
    externalPortMongodb: '9216',
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',  // Limpia el error del campo actual
        }));
      })
      .catch((validationError) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validationError.message,  // Actualiza el error del campo actual
        }));
      });

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const saveStep = async (data, serviceFunction, successMessage) => {
    try {
      await serviceFunction(data);  // Llama al servicio con los datos proporcionados
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitoso',
        text: successMessage,
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setCurrentStep((prev) => prev + 1);  // Avanza al siguiente paso
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los datos.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Validación reactiva de la confirmación de contraseña
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
        saveFunction(); // Ejecuta la función de guardado proporcionada
      })
      .catch((validationErrors) => {
        const errorObject = {};
        validationErrors.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
        setErrors(errorObject);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Corrige los campos marcados.',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
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

  // Save Grafana Install
  const saveGrafanaInstall = () => {
    const grafanaInstallData = {
      usuario: formState.grafanaAdmin,
      password: formState.grafanaPassword,
      internalPort: parseInt(formState.grafanaLocalPort),
      externalPort: parseInt(formState.grafanaDockerPort),
    };

    saveStep(grafanaInstallData, saveGrafanaInstallService, 'Instalación de Grafana guardada correctamente');
  };

  // Save Prometheus Install
  const savePrometheusInstall = () => {
    const prometheusInstallData = {
      internalPort: parseInt(formState.prometheusLocalPort),
      externalPort: parseInt(formState.prometheusDockerPort),
    };

    saveStep(prometheusInstallData, savePrometheusInstallService, 'Instalación de Prometheus guardada correctamente');
  };

  const savePrometheusExporters = () => {
    const exportersData = {
      internalPortPostgres: parseInt(formState.internalPortPostgres),
      externalPortPostgres: parseInt(formState.externalPortPostgres),
      internalPortMariadb: parseInt(formState.internalPortMariadb),
      externalPortMariadb: parseInt(formState.externalPortMariadb),
      internalPortMongodb: parseInt(formState.internalPortMongodb),
      externalPortMongodb: parseInt(formState.externalPortMongodb),
    };

    saveStep(exportersData, saveOrUpdatePrometheusExportersService, 'Puertos de los exportadores guardados correctamente');
  };
  
  const handleCompleteInstallation = async () => {
    await completeInstallation(navigate); // Llama a la función importada y pasa el hook de navegación
  };

  const nextStep = () => {
    switch (currentStep) {
      case 1:
        setTouched({
          usuario: true,
          password: true,
          passwordConfirm: true,
          numberPhone: true,
          email: true,
        });
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
        setTouched({
          prometheusLocalPort: true,
          prometheusDockerPort: true,
        });
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
        handleStepValidationAndSave(exportersValidationSchema, savePrometheusExporters);
        break;
      case 5:
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

  // Update dark mode state
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
            <h2>Installation Complete!</h2>
            <p>Your setup is ready.</p>
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
              {currentStep > 1 ? <Check /> : <PersonFill />} {/* Cambiado a PersonFill */}
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
            <span>Complete</span>
          </div>
        </div>

        <ProgressBar now={(currentStep / 5) * 100} className="progress-bar" style={{ width: `${(currentStep / 5) * 100}%` }} />

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
          <Button onClick={nextStep} className="ml-auto">
            {currentStep < 5 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}