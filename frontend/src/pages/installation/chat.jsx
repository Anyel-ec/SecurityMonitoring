import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Check, Database, FileEarmarkCheck, PersonFill } from 'react-bootstrap-icons';
import './installation.css';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService, saveUserInstallService } from '../../services/installationService';
import * as Yup from 'yup';
import GrafanaStep from './step/GrafanaStep';
import PrometheusStep from './step/PrometheusStep';
import ExporterStep from './step/ExporterStep';
import UserInstallStep from './step/UserInstallStep';
import { grafanaValidationSchema, prometheusValidationSchema, exportersValidationSchema, userInstallValidationSchema } from './validationSchemas';
import { useNavigate } from 'react-router-dom';
import { completeInstallation, checkContainerStatus } from '../../pages/installation/helper/installationHelper';
import { runDockerInstallService } from '../../services/dockerService';

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    usuario: '', password: '', passwordConfirm: '', numberPhone: '', email: '',
    grafanaAdmin: 'admin', grafanaPassword: '', grafanaPasswordConfirm: '', grafanaLocalPort: '3000', grafanaDockerPort: '3000',
    prometheusLocalPort: '9090', prometheusDockerPort: '9090',
    internalPortPostgres: '9187', externalPortPostgres: '9187', internalPortMariadb: '9104', externalPortMariadb: '9104', internalPortMongodb: '9216',
    externalPortMongodb: '9216',
  });

  useEffect(() => {
    if (touched.grafanaPasswordConfirm) {
      const errorMessage = formState.grafanaPassword !== formState.grafanaPasswordConfirm ? 'Las contraseñas no coinciden' : '';
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
          [name]: '',
        }));
      })
      .catch((validationError) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validationError.message,
        }));
      });

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const saveStep = async (data, serviceFunction, successMessage) => {
    try {
      await serviceFunction(data);
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
      setCurrentStep((prev) => prev + 1);
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

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Corrige los campos marcados.',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
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

  const runDockerAndCheckStatus = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Ejecutando Docker...',
      text: 'Por favor, espera mientras se ejecuta Docker.',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    
    try {
      await runDockerInstallService();
      Swal.close();
      await checkContainerStatus(setCurrentStep);
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al ejecutar Docker.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
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
        runDockerAndCheckStatus();
        break;
      case 6:
        handleCompleteInstallation();
        break;
      default:
        break;
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

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
            <h2>Installing...</h2>
            <p>Please wait while Docker is being set up and verified.</p>
          </div>
        );
      case 6:
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
          {/* Icons omitted for brevity */}
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
          <Button onClick={nextStep} className="ml-auto">
            {currentStep < 6 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
