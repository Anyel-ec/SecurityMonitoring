import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Form, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CheckCircleFill, Check, Database, CardChecklist, FileEarmarkCheck, EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // Bootstrap icons
import './installation.css';
import {  } from 'react-bootstrap-icons';

export default function InstallationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1 state
  const [grafanaAdmin, setGrafanaAdmin] = useState('admin'); // Usuario por defecto
  const [grafanaPassword, setGrafanaPassword] = useState(''); // Contraseña por defecto
  const [grafanaPasswordConfirm, setGrafanaPasswordConfirm] = useState(''); // Confirmar contraseña por defecto
  const [grafanaLocalPort, setGrafanaLocalPort] = useState('3000'); // Local port por defecto
  const [grafanaDockerPort, setGrafanaDockerPort] = useState('3000'); // Docker port por defecto


  // Step 2 state
  const [prometheusLocalPort, setPrometheusLocalPort] = useState('9090');
  const [prometheusDockerPort, setPrometheusDockerPort] = useState('9090');

  // Step 3 state
  const [dbType, setDbType] = useState('');
  const [dbUser, setDbUser] = useState('');
  const [dbPort, setDbPort] = useState('');
  const [dbHost, setDbHost] = useState('');

  // Function to advance to the next step
  const nextStep = () => {
    if (currentStep === 1 && grafanaPassword !== grafanaPasswordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas de Grafana no coinciden',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  // Function to return to the previous step
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps = ['Grafana', 'Prometheus', 'Database', 'Finish'];

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
              />
            </Form.Group>



            <Form.Group controlId="grafanaPassword" className="mt-3 position-relative">
              <Form.Label>Grafana Admin Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={grafanaPassword}
                  onChange={(e) => setGrafanaPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  className="password-toggle grafana-password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="grafanaPasswordConfirm" className="mt-3 position-relative">
              <Form.Label>Confirm Grafana Admin Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={grafanaPasswordConfirm}
                  onChange={(e) => setGrafanaPasswordConfirm(e.target.value)}
                />
                <Button
                  variant="link"
                  className="password-toggle grafana-confirm-password-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>



            <Form.Group controlId="grafanaLocalPort" className="mt-3">
              <Form.Label>Grafana Local Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3000"
                value={grafanaLocalPort}
                onChange={(e) => setGrafanaLocalPort(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="grafanaDockerPort" className="mt-3">
              <Form.Label>Grafana Docker Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3000"
                value={grafanaDockerPort}
                onChange={(e) => setGrafanaDockerPort(e.target.value)}
              />
            </Form.Group>
          </Form >
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
          <Form>
            <Form.Group controlId="dbType">
              <Form.Label>Database Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="MongoDB"
                  value="MongoDB"
                  checked={dbType === 'MongoDB'}
                  onChange={(e) => setDbType(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="MySQL/MariaDB"
                  value="MySQL/MariaDB"
                  checked={dbType === 'MySQL/MariaDB'}
                  onChange={(e) => setDbType(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="PostgreSQL"
                  value="PostgreSQL"
                  checked={dbType === 'PostgreSQL'}
                  onChange={(e) => setDbType(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="dbUser" className="mt-3">
              <Form.Label>Database User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter database user"
                value={dbUser}
                onChange={(e) => setDbUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="grafanaPassword" className="mt-3 position-relative">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={grafanaPassword}
                  onChange={(e) => setGrafanaPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  className="password-toggle grafana-password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </div>
            </Form.Group>

            
            <Form.Group controlId="dbHost" className="mt-3">
              <Form.Label>Database Host</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., localhost or 127.0.0.1"
                value={dbHost}
                onChange={(e) => setDbHost(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="dbPort" className="mt-3">
              <Form.Label>Database Port</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 3306 for MySQL, 5432 for PostgreSQL"
                value={dbPort}
                onChange={(e) => setDbPort(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="dbHost" className="mt-3">
              <Form.Label>Nombre de la Base de datos</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., localhost or 127.0.0.1"
                value={dbHost}
                onChange={(e) => setDbHost(e.target.value)}
              />
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
              {currentStep > 3 ? <Check /> : <CardChecklist />}
            </div>
            <span>Database</span>
          </div>
          <div className="step">
            <div className={currentStep >= 4 ? 'icon-active' : 'icon-inactive'}>
              {currentStep > 4 ? <Check /> : <FileEarmarkCheck />}
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
            {currentStep < 4 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </Card>
    </div>
  );
}