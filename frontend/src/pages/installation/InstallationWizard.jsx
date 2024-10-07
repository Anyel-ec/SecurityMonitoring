import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, Check, Database, FileEarmarkCheck } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService } from '../../services/installationService';
import * as Yup from 'yup'; // Yup para validaciones
import { completeInstallService } from '../../services/installationService';
import GrafanaStep from './GrafanaStep'; // Importe el componente
import PrometheusStep from './PrometheusStep'; // Importe el componente de Prometheus
import ExporterStep from './ExporterStep'; // Importa el componente de configuración de exportadores

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formState, setFormState] = useState({
    // Step 1 state (Grafana)
    grafanaAdmin: 'admin',
    grafanaPassword: '',
    grafanaPasswordConfirm: '',
    grafanaLocalPort: '3000',
    grafanaDockerPort: '3000',

    // Step 2 state (Prometheus)
    prometheusLocalPort: '9090',
    prometheusDockerPort: '9090',

    // Step 3 state (Ports for PostgreSQL, MongoDB, MariaDB)
    internalPortPostgres: '5432',
    externalPortPostgres: '5432',
    internalPortMariadb: '3306',
    externalPortMariadb: '3306',
    internalPortMongodb: '27017',
    externalPortMongodb: '27020',
  });


  // Validation Schema for Grafana
  const validationSchema = Yup.object().shape({
    grafanaAdmin: Yup.string()
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .required('Nombre de usuario es requerido'),
    grafanaPassword: Yup.string()
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
      .required('La contraseña es requerida'),
    grafanaPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('grafanaPassword')], 'Las contraseñas no coinciden')
      .required('Debes confirmar la contraseña'),
    grafanaLocalPort: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto es requerido'),
    grafanaDockerPort: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto es requerido'),
  });
  // Validation Schema for Prometheus
  const prometheusValidationSchema = Yup.object().shape({
    prometheusLocalPort: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto local es requerido'),
    prometheusDockerPort: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto Docker es requerido'),
  });

  // Validation Schema for Exporters
  const exportersValidationSchema = Yup.object().shape({
    internalPortPostgres: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de PostgreSQL es requerido'),
    externalPortPostgres: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de PostgreSQL es requerido'),
    internalPortMariadb: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de MariaDB es requerido'),
    externalPortMariadb: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de MariaDB es requerido'),
    internalPortMongodb: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de MongoDB es requerido'),
    externalPortMongodb: Yup.number()
      .min(1, 'El puerto debe ser mayor a 0')
      .max(65535, 'El puerto no puede exceder 65535')
      .required('El puerto de MongoDB es requerido'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validación reactiva solo del campo que está cambiando
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
        grafanaAdmin: true,
        grafanaPassword: true,
        grafanaPasswordConfirm: true,
        grafanaLocalPort: true,
        grafanaDockerPort: true,
      });

      validationSchema
        .validate(
          {
            grafanaAdmin: formState.grafanaAdmin,
            grafanaPassword: formState.grafanaPassword, // Acceso correcto
            grafanaPasswordConfirm: formState.grafanaPasswordConfirm, // Acceso correcto
            grafanaLocalPort: formState.grafanaLocalPort, // Acceso correcto
            grafanaDockerPort: formState.grafanaDockerPort, // Acceso correcto
          },
          { abortEarly: false }
        )
        .then(() => {
          setErrors({});
          saveGrafanaInstall(); // Llama a la función modificada
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
          });
        });
    }


    else if (currentStep === 2) {
      setTouched({
        prometheusLocalPort: true,
        prometheusDockerPort: true,
      });

      prometheusValidationSchema
        .validate(
          {
            prometheusLocalPort: formState.prometheusLocalPort,  // Cambia aquí
            prometheusDockerPort: formState.prometheusDockerPort,  // Cambia aquí
          },
          { abortEarly: false }
        )
        .then(() => {
          setErrors({});
          savePrometheusInstall();
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
          });
        });
    } else if (currentStep === 3) {
      setTouched({
        internalPortPostgres: true,
        externalPortPostgres: true,
        internalPortMariadb: true,
        externalPortMariadb: true,
        internalPortMongodb: true,
        externalPortMongodb: true,
      });

      exportersValidationSchema
        .validate(
          {
            internalPortPostgres: formState.internalPortPostgres,
            externalPortPostgres: formState.externalPortPostgres,
            internalPortMariadb: formState.internalPortMariadb,
            externalPortMariadb: formState.externalPortMariadb,
            internalPortMongodb: formState.internalPortMongodb,
            externalPortMongodb: formState.externalPortMongodb,
          },
          { abortEarly: false }
        )
        .then(() => {
          setErrors({});
          savePrometheusExporters(); // Llama a la función que guarda los exportadores
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
          });
        });
    } else if (currentStep === 4) {
      // Aquí se llama a completeInstallation cuando el paso es 4 y se hace clic en el botón "Finish"
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
        return <GrafanaStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
      case 2:
        return <PrometheusStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
      case 3:
        return <ExporterStep values={formState} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />;
      case 4:
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

        {/* Step progress bar */}
        <div className="step-icons">
          <div className="step">
            <div className={currentStep >= 1 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 1 ? <Check /> : <CheckCircleFill />}
            </div>
            <span>Grafana</span>
          </div>
          <div className="step">
            <div className={currentStep >= 2 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 2 ? <Check /> : <Database />}
            </div>
            <span>Prometheus</span>
          </div>
          <div className="step">
            <div className={currentStep >= 3 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 3 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Ports Configuration</span> {/* Actualización del tercer paso */}
          </div>
          <div className="step">
            <div className={currentStep >= 4 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 4 ? <Check /> : <FileEarmarkCheck />}
            </div>
            <span>Finish</span>
          </div>
        </div>

        {/* Update progress bar based on step */}
        <ProgressBar now={(currentStep / 4) * 100} className="progress-bar" style={{ width: `${(currentStep / 4) * 100}%` }} />

        <div className="scrollable-content">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
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