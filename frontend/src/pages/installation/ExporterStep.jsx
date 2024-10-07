// ExporterStep.js
import React from 'react';
import { Form } from 'react-bootstrap';

export default function ExporterStep({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Form>
      {/* PostgreSQL Ports */}
      <Form.Group controlId="internalPortPostgres">
        <Form.Label>PostgreSQL Internal Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 5432"
          value={values.internalPortPostgres}
          onChange={handleChange}
          onBlur={() => handleBlur('internalPortPostgres')}
          className={touched.internalPortPostgres && errors.internalPortPostgres ? 'is-invalid' : touched.internalPortPostgres ? 'is-valid' : ''}
        />
        {touched.internalPortPostgres && errors.internalPortPostgres && <div className="invalid-feedback">{errors.internalPortPostgres}</div>}
      </Form.Group>

      <Form.Group controlId="externalPortPostgres" className="mt-3">
        <Form.Label>PostgreSQL External Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 5432"
          value={values.externalPortPostgres}
          onChange={handleChange}
          onBlur={() => handleBlur('externalPortPostgres')}
          className={touched.externalPortPostgres && errors.externalPortPostgres ? 'is-invalid' : touched.externalPortPostgres ? 'is-valid' : ''}
        />
        {touched.externalPortPostgres && errors.externalPortPostgres && <div className="invalid-feedback">{errors.externalPortPostgres}</div>}
      </Form.Group>

      {/* MariaDB Ports */}
      <Form.Group controlId="internalPortMariadb" className="mt-3">
        <Form.Label>MariaDB Internal Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 3306"
          value={values.internalPortMariadb}
          onChange={handleChange}
          onBlur={() => handleBlur('internalPortMariadb')}
          className={touched.internalPortMariadb && errors.internalPortMariadb ? 'is-invalid' : touched.internalPortMariadb ? 'is-valid' : ''}
        />
        {touched.internalPortMariadb && errors.internalPortMariadb && <div className="invalid-feedback">{errors.internalPortMariadb}</div>}
      </Form.Group>

      <Form.Group controlId="externalPortMariadb" className="mt-3">
        <Form.Label>MariaDB External Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 3306"
          value={values.externalPortMariadb}
          onChange={handleChange}
          onBlur={() => handleBlur('externalPortMariadb')}
          className={touched.externalPortMariadb && errors.externalPortMariadb ? 'is-invalid' : touched.externalPortMariadb ? 'is-valid' : ''}
        />
        {touched.externalPortMariadb && errors.externalPortMariadb && <div className="invalid-feedback">{errors.externalPortMariadb}</div>}
      </Form.Group>

      {/* MongoDB Ports */}
      <Form.Group controlId="internalPortMongodb" className="mt-3">
        <Form.Label>MongoDB Internal Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 27017"
          value={values.internalPortMongodb}
          onChange={handleChange}
          onBlur={() => handleBlur('internalPortMongodb')}
          className={touched.internalPortMongodb && errors.internalPortMongodb ? 'is-invalid' : touched.internalPortMongodb ? 'is-valid' : ''}
        />
        {touched.internalPortMongodb && errors.internalPortMongodb && <div className="invalid-feedback">{errors.internalPortMongodb}</div>}
      </Form.Group>

      <Form.Group controlId="externalPortMongodb" className="mt-3">
        <Form.Label>MongoDB External Port</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 27017"
          value={values.externalPortMongodb}
          onChange={handleChange}
          onBlur={() => handleBlur('externalPortMongodb')}
          className={touched.externalPortMongodb && errors.externalPortMongodb ? 'is-invalid' : touched.externalPortMongodb ? 'is-valid' : ''}
        />
        {touched.externalPortMongodb && errors.externalPortMongodb && <div className="invalid-feedback">{errors.externalPortMongodb}</div>}
      </Form.Group>
    </Form>
  );
}
