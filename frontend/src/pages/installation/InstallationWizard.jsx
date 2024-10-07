import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, Check, Database, FileEarmarkCheck } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import { saveGrafanaInstallService, savePrometheusInstallService, saveOrUpdatePrometheusExportersService } from '../../services/installationService';
import * as Yup from 'yup'; // Yup para validaciones
import { completeInstallService } from '../../services/installationService';

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Step 1 state (Grafana)
  const [grafanaAdmin, setGrafanaAdmin] = useState('admin'); // Usuario por defecto
  const [grafanaPassword, setGrafanaPassword] = useState(''); // Contraseña por defecto
  const [grafanaPasswordConfirm, setGrafanaPasswordConfirm] = useState(''); // Confirmar contraseña por defecto
  const [grafanaLocalPort, setGrafanaLocalPort] = useState('3000'); // Local port por defecto
  const [grafanaDockerPort, setGrafanaDockerPort] = useState('3000'); // Docker port por defecto

  // Step 2 state (Prometheus)
  const [prometheusLocalPort, setPrometheusLocalPort] = useState('9090');
  const [prometheusDockerPort, setPrometheusDockerPort] = useState('9090');

  // Step 3 state (Ports for PostgreSQL, MongoDB, MariaDB)
  // Step 3 state (Ports for PostgreSQL, MongoDB, MariaDB)
  const [internalPortPostgres, setInternalPortPostgres] = useState('5432'); // Puerto interno para PostgreSQL
  const [externalPortPostgres, setExternalPortPostgres] = useState('5432'); // Puerto externo (en este caso, igual al interno)

  const [internalPortMariadb, setInternalPortMariadb] = useState('3306'); // Puerto interno para MariaDB
  const [externalPortMariadb, setExternalPortMariadb] = useState('3306'); // Puerto externo (según se usa en la propiedad "mysqld.address")

  const [internalPortMongodb, setInternalPortMongodb] = useState('27017'); // Puerto interno para MongoDB
  const [externalPortMongodb, setExternalPortMongodb] = useState('27020'); // Puerto externo definido en "docker-compose"



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


  const savePrometheusExporters = async () => {
    try {
      const exportersData = {
        internalPortPostgres: parseInt(internalPortPostgres),
        externalPortPostgres: parseInt(externalPortPostgres),
        internalPortMariadb: parseInt(internalPortMariadb),
        externalPortMariadb: parseInt(externalPortMariadb),
        internalPortMongodb: parseInt(internalPortMongodb),
        externalPortMongodb: parseInt(externalPortMongodb),
      };

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

      setCurrentStep((prev) => Math.min(prev + 1, 3));
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
        grafanaPassword !== grafanaPasswordConfirm ? 'Las contraseñas no coinciden' : '';
      setErrors((prev) => ({ ...prev, grafanaPasswordConfirm: errorMessage }));
    }
  }, [grafanaPassword, grafanaPasswordConfirm, touched]);

  // Save Grafana Install
  const saveGrafanaInstall = async () => {
    try {
      const grafanaInstallData = {
        usuario: grafanaAdmin,
        password: grafanaPassword,
        internalPort: parseInt(grafanaLocalPort),
        externalPort: parseInt(grafanaDockerPort),
      };

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
        internalPort: parseInt(prometheusLocalPort),
        externalPort: parseInt(prometheusDockerPort),
      };

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
            grafanaAdmin,
            grafanaPassword,
            grafanaPasswordConfirm,
            grafanaLocalPort,
            grafanaDockerPort,
          },
          { abortEarly: false }
        )
        .then(() => {
          setErrors({});
          saveGrafanaInstall();
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
    } else if (currentStep === 2) {
      setTouched({
        prometheusLocalPort: true,
        prometheusDockerPort: true,
      });

      prometheusValidationSchema
        .validate(
          {
            prometheusLocalPort,
            prometheusDockerPort,
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
    }
    else if (currentStep === 3) {
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
            internalPortPostgres,
            externalPortPostgres,
            internalPortMariadb,
            externalPortMariadb,
            internalPortMongodb,
            externalPortMongodb,
          },
          { abortEarly: false }
        )
        .then(() => {
          setErrors({});
          savePrometheusExporters();
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



    else if (currentStep === 4) {
      // Aquí se llama a completeInstallation cuando el paso es 3 y se hace clic en el botón "Finish"
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
                className={touched.prometheusLocalPort && errors.prometheusLocalPort ? 'is-invalid' : touched.prometheusLocalPort ? 'is-valid' : ''}
              />
              {touched.prometheusLocalPort && errors.prometheusLocalPort && <div className="invalid-feedback">{errors.prometheusLocalPort}</div>}
            </Form.Group>
            <Form.Group controlId="prometheusDockerPort" className="mt-3">
              <Form.Label>Prometheus Docker Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Docker port"
                value={prometheusDockerPort}
                onChange={(e) => setPrometheusDockerPort(e.target.value)}
                className={touched.prometheusDockerPort && errors.prometheusDockerPort ? 'is-invalid' : touched.prometheusDockerPort ? 'is-valid' : ''}
              />
              {touched.prometheusDockerPort && errors.prometheusDockerPort && <div className="invalid-feedback">{errors.prometheusDockerPort}</div>}
            </Form.Group>
          </Form>
        );
      case 3:
        return (
          <Form>
            <Form.Group controlId="internalPortPostgres">
              <Form.Label>PostgreSQL Internal Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 5432"
                value={internalPortPostgres}
                onChange={(e) => setInternalPortPostgres(e.target.value)}
                className={touched.internalPortPostgres && errors.internalPortPostgres ? 'is-invalid' : touched.internalPortPostgres ? 'is-valid' : ''}
              />
              {touched.internalPortPostgres && errors.internalPortPostgres && <div className="invalid-feedback">{errors.internalPortPostgres}</div>}
            </Form.Group>

            <Form.Group controlId="externalPortPostgres">
              <Form.Label>PostgreSQL External Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 5432"
                value={externalPortPostgres}
                onChange={(e) => setExternalPortPostgres(e.target.value)}
                className={touched.externalPortPostgres && errors.externalPortPostgres ? 'is-invalid' : touched.externalPortPostgres ? 'is-valid' : ''}
              />
              {touched.externalPortPostgres && errors.externalPortPostgres && <div className="invalid-feedback">{errors.externalPortPostgres}</div>}
            </Form.Group>

            <Form.Group controlId="internalPortMariadb" className="mt-3">
              <Form.Label>MariaDB Internal Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3306"
                value={internalPortMariadb}
                onChange={(e) => setInternalPortMariadb(e.target.value)}
                className={touched.internalPortMariadb && errors.internalPortMariadb ? 'is-invalid' : touched.internalPortMariadb ? 'is-valid' : ''}
              />
              {touched.internalPortMariadb && errors.internalPortMariadb && <div className="invalid-feedback">{errors.internalPortMariadb}</div>}
            </Form.Group>

            <Form.Group controlId="externalPortMariadb" className="mt-3">
              <Form.Label>MariaDB External Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3306"
                value={externalPortMariadb}
                onChange={(e) => setExternalPortMariadb(e.target.value)}
                className={touched.externalPortMariadb && errors.externalPortMariadb ? 'is-invalid' : touched.externalPortMariadb ? 'is-valid' : ''}
              />
              {touched.externalPortMariadb && errors.externalPortMariadb && <div className="invalid-feedback">{errors.externalPortMariadb}</div>}
            </Form.Group>

            <Form.Group controlId="internalPortMongodb" className="mt-3">
              <Form.Label>MongoDB Internal Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 27017"
                value={internalPortMongodb}
                onChange={(e) => setInternalPortMongodb(e.target.value)}
                className={touched.internalPortMongodb && errors.internalPortMongodb ? 'is-invalid' : touched.internalPortMongodb ? 'is-valid' : ''}
              />
              {touched.internalPortMongodb && errors.internalPortMongodb && <div className="invalid-feedback">{errors.internalPortMongodb}</div>}
            </Form.Group>

            <Form.Group controlId="externalPortMongodb" className="mt-3">
              <Form.Label>MongoDB External Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 27017"
                value={externalPortMongodb}
                onChange={(e) => setExternalPortMongodb(e.target.value)}
                className={touched.externalPortMongodb && errors.externalPortMongodb ? 'is-invalid' : touched.externalPortMongodb ? 'is-valid' : ''}
              />
              {touched.externalPortMongodb && errors.externalPortMongodb && <div className="invalid-feedback">{errors.externalPortMongodb}</div>}
            </Form.Group>
          </Form>
        );

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
