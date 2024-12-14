import React from 'react';
import { Form } from 'react-bootstrap';

export default function PrometheusStep({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Form>
      <Form.Group controlId="prometheusLocalPort" className="mt-3">
        <Form.Label>Prometheus Local Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter local port"
          name="prometheusLocalPort" // Añadir el atributo name para que el handleChange funcione correctamente
          value={values.prometheusLocalPort}
          onChange={handleChange} // Esto actualiza el valor en formState
          onBlur={() => handleBlur('prometheusLocalPort')}
          className={touched.prometheusLocalPort && errors.prometheusLocalPort ? 'is-invalid' : touched.prometheusLocalPort ? 'is-valid' : ''}
        />
        {touched.prometheusLocalPort && errors.prometheusLocalPort && <div className="invalid-feedback">{errors.prometheusLocalPort}</div>}
      </Form.Group>

      <Form.Group controlId="prometheusDockerPort" className="mt-3">
        <Form.Label>Prometheus Docker Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Docker port"
          name="prometheusDockerPort" // Añadir el atributo name para que el handleChange funcione correctamente
          value={values.prometheusDockerPort}
          onChange={handleChange} // Esto actualiza el valor en formState
          onBlur={() => handleBlur('prometheusDockerPort')}
          className={touched.prometheusDockerPort && errors.prometheusDockerPort ? 'is-invalid' : touched.prometheusDockerPort ? 'is-valid' : ''}
        />
        {touched.prometheusDockerPort && errors.prometheusDockerPort && <div className="invalid-feedback">{errors.prometheusDockerPort}</div>}
      </Form.Group>
    </Form>
  );
}
