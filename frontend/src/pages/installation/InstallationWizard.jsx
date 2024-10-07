import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, Check, Database, FileEarmarkCheck, PersonFill } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService, saveUserInstallService } from '../../services/installationService';
import * as Yup from 'yup'; // Yup para validaciones
import { completeInstallService } from '../../services/installationService';
import GrafanaStep from './GrafanaStep'; // Importe el componente
import PrometheusStep from './PrometheusStep'; // Importe el componente de Prometheus
import ExporterStep from './ExporterStep'; // Importa el componente de configuración de exportadores
import UserInstallStep from './UserInstallStep'; // Importa el componente de instalación de usuario
import { grafanaValidationSchema, prometheusValidationSchema, exportersValidationSchema, userInstallValidationSchema } from './validationSchemas';

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formState, setFormState] = useState({
    // Step 1: User Installation
    usuario: '', password: '', passwordConfirm: '', numberPhone: '', email: '',

    // Step 2 state (Grafana)
    grafanaAdmin: 'admin', grafanaPassword: '', grafanaPasswordConfirm: '', grafanaLocalPort: '3000', grafanaDockerPort: '3000',

    // Step 2 state (Prometheus)
    prometheusLocalPort: '9090', prometheusDockerPort: '9090',

    // Step 3 state (Ports for PostgreSQL, MongoDB, MariaDB)
    internalPortPostgres: '5432', externalPortPostgres: '5432', internalPortMariadb: '3306', externalPortMariadb: '3306', internalPortMongodb: '27017',
    externalPortMongodb: '27020',
  });

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

  const saveUserInstall = async () => {
    try {
      const userInstallData = {
        usuario: formState.usuario,
        password: formState.password,
        numberPhone: formState.numberPhone,
        email: formState.email,
      };

      console.log("Datos enviados a User Install Service:", userInstallData); // Imprime los datos
      await saveUserInstallService(userInstallData);

      Swal.fire({
        icon: 'success',
        title: 'Usuario Guardado',
        text: 'El usuario se ha guardado correctamente.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el usuario.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };


  const savePrometheusExporters = async () => {
    try {
      const exportersData = {
        internalPortPostgres: parseInt(formState.internalPortPostgres),
        externalPortPostgres: parseInt(formState.externalPortPostgres),
        internalPortMariadb: parseInt(formState.internalPortMariadb),
        externalPortMariadb: parseInt(formState.externalPortMariadb),
        internalPortMongodb: parseInt(formState.internalPortMongodb),
        externalPortMongodb: parseInt(formState.externalPortMongodb),
      };

      console.log("Datos enviados a Exporters Service:", exportersData); // Imprime los datos

      await saveOrUpdatePrometheusExportersService(exportersData);

      Swal.fire({
        icon: 'success',
        title: 'Puertos Guardados',
        text: 'Los puertos de los exportadores de Prometheus se han guardado correctamente.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setCurrentStep((prev) => Math.min(prev + 1, 4)); // Asegúrate de avanzar al paso 4
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los exportadores de Prometheus.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Validación automática de contraseñas mientras se escriben
  useEffect(() => {
    if (touched.grafanaPasswordConfirm) {
      const errorMessage =
        formState.grafanaPassword !== formState.grafanaPasswordConfirm ? 'Las contraseñas no coinciden' : '';
      setErrors((prev) => ({ ...prev, grafanaPasswordConfirm: errorMessage }));
    }
  }, [formState.grafanaPassword, formState.grafanaPasswordConfirm, touched]);


  // Save Grafana Install
  const saveGrafanaInstall = async () => {
    try {
      const grafanaInstallData = {
        usuario: formState.grafanaAdmin, // Usa formState.grafanaAdmin
        password: formState.grafanaPassword, // Usa formState.grafanaPassword
        internalPort: parseInt(formState.grafanaLocalPort), // Usa formState.grafanaLocalPort
        externalPort: parseInt(formState.grafanaDockerPort), // Usa formState.grafanaDockerPort
      };
      console.log("Datos enviados a Grafana Install Service:", grafanaInstallData);

      await saveGrafanaInstallService(grafanaInstallData);

      Swal.fire({
        icon: 'success',
        title: 'Instalación Guardada',
        text: 'La instalación de Grafana se ha guardado correctamente.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la instalación de Grafana.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Save Prometheus Install
  const savePrometheusInstall = async () => {
    try {
      const prometheusInstallData = {
        internalPort: parseInt(formState.prometheusLocalPort),
        externalPort: parseInt(formState.prometheusDockerPort),
      };

      console.log("Datos enviados a Prometheus Install Service:", prometheusInstallData);

      await savePrometheusInstallService(prometheusInstallData);

      Swal.fire({
        icon: 'success',
        title: 'Instalación Guardada',
        text: 'La instalación de Prometheus se ha guardado correctamente.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la instalación de Prometheus.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Función para completar la instalación
  const completeInstallation = async () => {
    try {
      await completeInstallService();

      Swal.fire({
        icon: 'success',
        title: 'Instalación Completa',
        text: 'La instalación se ha completado exitosamente.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al completar la instalación.',
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      setTouched({
        usuario: true,
        password: true,
        passwordConfirm: true, // Asegurarse de tocar la confirmación de contraseña
        numberPhone: true,
        email: true,
      });
      handleStepValidationAndSave(userInstallValidationSchema, saveUserInstall);
    } else

      if (currentStep === 2) {
        setTouched({
          grafanaAdmin: true,
          grafanaPassword: true,
          grafanaPasswordConfirm: true,
          grafanaLocalPort: true,
          grafanaDockerPort: true,
        });
        handleStepValidationAndSave(grafanaValidationSchema, saveGrafanaInstall);
      } else if (currentStep === 3) {
        setTouched({
          prometheusLocalPort: true,
          prometheusDockerPort: true,
        });
        handleStepValidationAndSave(prometheusValidationSchema, savePrometheusInstall);
      } else if (currentStep === 4) {
        setTouched({
          internalPortPostgres: true,
          externalPortPostgres: true,
          internalPortMariadb: true,
          externalPortMariadb: true,
          internalPortMongodb: true,
          externalPortMongodb: true,
        });
        handleStepValidationAndSave(exportersValidationSchema, savePrometheusExporters);
      } else if (currentStep === 5) {
        completeInstallation();
      }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const steps = ['Grafana', 'Prometheus', 'Finish'];

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
        </div>

        <ProgressBar now={(currentStep / 4) * 100} className="progress-bar" style={{ width: `${(currentStep / 4) * 100}%` }} />

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
            {currentStep < 4 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}