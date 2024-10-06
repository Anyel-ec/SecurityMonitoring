import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, Check, Database, FileEarmarkCheck } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { saveGrafanaInstallService } from '../../services/installationService'; // Asegúrate de que la ruta es correcta
import * as Yup from 'yup'; // Yup para validaciones

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Step 1 state
  const [grafanaAdmin, setGrafanaAdmin] = useState('admin'); // Usuario por defecto
  const [grafanaPassword, setGrafanaPassword] = useState(''); // Contraseña por defecto
  const [grafanaPasswordConfirm, setGrafanaPasswordConfirm] = useState(''); // Confirmar contraseña por defecto
  const [grafanaLocalPort, setGrafanaLocalPort] = useState('3000'); // Local port por defecto
  const [grafanaDockerPort, setGrafanaDockerPort] = useState('3000'); // Docker port por defecto

  // Step 2 state
  const [prometheusLocalPort, setPrometheusLocalPort] = useState('9090');
  const [prometheusDockerPort, setPrometheusDockerPort] = useState('9090');

  // Validación con Yup
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

  // Validación automática de contraseñas mientras se escriben
  useEffect(() => {
    if (touched.grafanaPasswordConfirm) {
      const errorMessage =
        grafanaPassword !== grafanaPasswordConfirm ? 'Las contraseñas no coinciden' : '';
      setErrors((prev) => ({ ...prev, grafanaPasswordConfirm: errorMessage }));
    }
  }, [grafanaPassword, grafanaPasswordConfirm, touched]);

  // Función para guardar los valores en el backend
  const saveGrafanaInstall = async () => {
    try {
      const grafanaInstallData = {
        usuario: grafanaAdmin,
        password: grafanaPassword,
        internalPort: parseInt(grafanaLocalPort),
        externalPort: parseInt(grafanaDockerPort),
      };
  
      await saveGrafanaInstallService(grafanaInstallData);
  
      // Mostrar toast de éxito
      Swal.fire({
        icon: 'success',
        title: 'Instalación Guardada',
        text: 'La instalación de Grafana se ha guardado correctamente.',
        toast: true,
        position: 'bottom-start', // Muestra el toast en la esquina inferior izquierda
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
  
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } catch (error) {
      // Mostrar toast de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la instalación de Grafana.',
        toast: true,
        position: 'bottom-start', // Muestra el toast en la esquina inferior izquierda
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const nextStep = () => {
    setTouched({
      grafanaAdmin: true,
      grafanaPassword: true,
      grafanaPasswordConfirm: true,
      grafanaLocalPort: true,
      grafanaDockerPort: true,
    }); // Marca que los campos han sido tocados
    validationSchema
      .validate(
        {
          grafanaAdmin,
          grafanaPassword,
          grafanaPasswordConfirm,
          grafanaLocalPort,
          grafanaDockerPort,
        },
        { abortEarly: false }
      )
      .then(() => {
        setErrors({}); // Limpiar errores si la validación es exitosa
        saveGrafanaInstall(); // Guardar los valores actualizados en cada avance
      })
      .catch((validationErrors) => {
        const errorObject = {};
        validationErrors.inner.forEach((error) => {
          errorObject[error.path] = error.message;
        });
        setErrors(errorObject); // Guardar los errores en el estado
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Corrige los campos marcados.',
        });
      });
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
        return (
          <Form>
            <Form.Group controlId="grafanaAdmin" className="mt-3">
              <Form.Label>Grafana Admin User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={grafanaAdmin}
                onChange={(e) => setGrafanaAdmin(e.target.value)}
                onBlur={() => handleBlur('grafanaAdmin')}
                className={touched.grafanaAdmin && errors.grafanaAdmin ? 'is-invalid' : touched.grafanaAdmin ? 'is-valid' : ''}
              />
              {touched.grafanaAdmin && errors.grafanaAdmin && <div className="invalid-feedback">{errors.grafanaAdmin}</div>}
            </Form.Group>

            <Form.Group controlId="grafanaPassword" className="mt-3 position-relative">
              <Form.Label>Grafana Admin Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={grafanaPassword}
                  onChange={(e) => setGrafanaPassword(e.target.value)}
                  onBlur={() => handleBlur('grafanaPassword')}
                  className={touched.grafanaPassword && errors.grafanaPassword ? 'is-invalid' : touched.grafanaPassword ? 'is-valid' : ''}
                />
                {touched.grafanaPassword && errors.grafanaPassword && <div className="invalid-feedback">{errors.grafanaPassword}</div>}
              </div>
            </Form.Group>

            <Form.Group controlId="grafanaPasswordConfirm" className="mt-3 position-relative">
              <Form.Label>Confirm Grafana Admin Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={grafanaPasswordConfirm}
                  onChange={(e) => setGrafanaPasswordConfirm(e.target.value)}
                  onBlur={() => handleBlur('grafanaPasswordConfirm')}
                  className={touched.grafanaPasswordConfirm && errors.grafanaPasswordConfirm ? 'is-invalid' : touched.grafanaPasswordConfirm ? 'is-valid' : ''}
                />
                {touched.grafanaPasswordConfirm && errors.grafanaPasswordConfirm && (
                  <div className="invalid-feedback">{errors.grafanaPasswordConfirm}</div>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="grafanaLocalPort" className="mt-3">
              <Form.Label>Grafana Local Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3000"
                value={grafanaLocalPort}
                onChange={(e) => setGrafanaLocalPort(e.target.value)}
                onBlur={() => handleBlur('grafanaLocalPort')}
                className={touched.grafanaLocalPort && errors.grafanaLocalPort ? 'is-invalid' : touched.grafanaLocalPort ? 'is-valid' : ''}
              />
              {touched.grafanaLocalPort && errors.grafanaLocalPort && <div className="invalid-feedback">{errors.grafanaLocalPort}</div>}
            </Form.Group>
            <Form.Group controlId="grafanaDockerPort" className="mt-3">
              <Form.Label>Grafana Docker Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3000"
                value={grafanaDockerPort}
                onChange={(e) => setGrafanaDockerPort(e.target.value)}
                onBlur={() => handleBlur('grafanaDockerPort')}
                className={touched.grafanaDockerPort && errors.grafanaDockerPort ? 'is-invalid' : touched.grafanaDockerPort ? 'is-valid' : ''}
              />
              {touched.grafanaDockerPort && errors.grafanaDockerPort && <div className="invalid-feedback">{errors.grafanaDockerPort}</div>}
            </Form.Group>
          </Form>
        );
      case 2:
        return (
          <Form>
            <Form.Group controlId="prometheusLocalPort">
              <Form.Label>Prometheus Local Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter local port"
                value={prometheusLocalPort}
                onChange={(e) => setPrometheusLocalPort(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="prometheusDockerPort" className="mt-3">
              <Form.Label>Prometheus Docker Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Docker port"
                value={prometheusDockerPort}
                onChange={(e) => setPrometheusDockerPort(e.target.value)}
              />
            </Form.Group>
          </Form>
        );
      case 3:
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
            <span>Finish</span>
          </div>
        </div>

        {/* Update progress bar based on step */}
        <ProgressBar now={(currentStep / steps.length) * 100} className="progress-bar" style={{ width: `${(currentStep / steps.length) * 100}%` }} />

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
            {currentStep < 3 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
