import React from 'react';
import { Form } from 'react-bootstrap';

export default function GrafanaStep({ values, errors, touched, handleBlur, handleChange }) {
    return (
        <Form>
            <Form.Group controlId="grafanaAdmin" className="mt-3">
                <Form.Label>Grafana Admin User</Form.Label>
                <Form.Control
                    type="text"
                    name="grafanaAdmin"  // Asegúrate de que el name esté correctamente definido
                    placeholder="Enter username"
                    value={values.grafanaAdmin} // Enlaza el valor con formState.grafanaAdmin
                    onChange={handleChange}  // Cada vez que cambie, actualiza formState
                    onBlur={() => handleBlur('grafanaAdmin')}
                    className={touched.grafanaAdmin && errors.grafanaAdmin ? 'is-invalid' : touched.grafanaAdmin ? 'is-valid' : ''}
                />
                {touched.grafanaAdmin && errors.grafanaAdmin && <div className="invalid-feedback">{errors.grafanaAdmin}</div>}
            </Form.Group>

            <Form.Group controlId="grafanaPassword" className="mt-3">
                <Form.Label>Grafana Admin Password</Form.Label>
                <Form.Control
                    type="password"
                    name="grafanaPassword"
                    placeholder="Enter password"
                    value={values.grafanaPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaPassword')}
                    className={touched.grafanaPassword && errors.grafanaPassword ? 'is-invalid' : touched.grafanaPassword ? 'is-valid' : ''}
                />
                {touched.grafanaPassword && errors.grafanaPassword && <div className="invalid-feedback">{errors.grafanaPassword}</div>}
            </Form.Group>

            <Form.Group controlId="grafanaPasswordConfirm" className="mt-3">
                <Form.Label>Confirm Grafana Admin Password</Form.Label>
                <Form.Control
                    type="password"
                    name="grafanaPasswordConfirm"
                    placeholder="Confirm password"
                    value={values.grafanaPasswordConfirm}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaPasswordConfirm')}
                    className={touched.grafanaPasswordConfirm && errors.grafanaPasswordConfirm ? 'is-invalid' : touched.grafanaPasswordConfirm ? 'is-valid' : ''}
                />
                {touched.grafanaPasswordConfirm && errors.grafanaPasswordConfirm && (
                    <div className="invalid-feedback">{errors.grafanaPasswordConfirm}</div>
                )}
            </Form.Group>

            <Form.Group controlId="grafanaLocalPort" className="mt-3">
                <Form.Label>Grafana Local Port</Form.Label>
                <Form.Control
                    type="text"
                    name="grafanaLocalPort"
                    placeholder="e.g., 3000"
                    value={values.grafanaLocalPort}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaLocalPort')}
                    className={touched.grafanaLocalPort && errors.grafanaLocalPort ? 'is-invalid' : touched.grafanaLocalPort ? 'is-valid' : ''}
                />
                {touched.grafanaLocalPort && errors.grafanaLocalPort && <div className="invalid-feedback">{errors.grafanaLocalPort}</div>}
            </Form.Group>

            <Form.Group controlId="grafanaDockerPort" className="mt-3">
                <Form.Label>Grafana Docker Port</Form.Label>
                <Form.Control
                    type="text"
                    name="grafanaDockerPort"
                    placeholder="e.g., 3000"
                    value={values.grafanaDockerPort}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaDockerPort')}
                    className={touched.grafanaDockerPort && errors.grafanaDockerPort ? 'is-invalid' : touched.grafanaDockerPort ? 'is-valid' : ''}
                />
                {touched.grafanaDockerPort && errors.grafanaDockerPort && <div className="invalid-feedback">{errors.grafanaDockerPort}</div>}
            </Form.Group>
        </Form>
    );
}
