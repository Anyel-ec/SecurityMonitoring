import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ExporterStep({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <Form>
      {/* PostgreSQL Ports */}
      <Form.Group as={Row} controlId="postgresPorts" className="mt-3">
        <Form.Label column sm="12" className="mb-2">PostgreSQL Ports</Form.Label>
        <Col sm="6">
          <Form.Label>Internal Port</Form.Label>
          <Form.Control
            type="number"
            name="internalPortPostgres"
            placeholder="5432"
            value={values.internalPortPostgres}
            onChange={handleChange}
            onBlur={() => handleBlur('internalPortPostgres')}
            className={touched.internalPortPostgres && errors.internalPortPostgres ? 'is-invalid' : touched.internalPortPostgres ? 'is-valid' : ''}
          />
          {touched.internalPortPostgres && errors.internalPortPostgres && (
            <div className="invalid-feedback">{errors.internalPortPostgres}</div>
          )}
        </Col>
        <Col sm="6">
          <Form.Label>External Port</Form.Label>
          <Form.Control
            type="number"
            name="externalPortPostgres"
            placeholder="5432"
            value={values.externalPortPostgres}
            onChange={handleChange}
            onBlur={() => handleBlur('externalPortPostgres')}
            className={touched.externalPortPostgres && errors.externalPortPostgres ? 'is-invalid' : touched.externalPortPostgres ? 'is-valid' : ''}
          />
          {touched.externalPortPostgres && errors.externalPortPostgres && (
            <div className="invalid-feedback">{errors.externalPortPostgres}</div>
          )}
        </Col>
      </Form.Group>

      {/* MariaDB Ports */}
      <Form.Group as={Row} controlId="mariadbPorts" className="mt-3">
        <Form.Label column sm="12" className="mb-2">MariaDB Ports</Form.Label>
        <Col sm="6">
          <Form.Label>Internal Port</Form.Label>
          <Form.Control
            type="number"
            name="internalPortMariadb"
            placeholder="3306"
            value={values.internalPortMariadb}
            onChange={handleChange}
            onBlur={() => handleBlur('internalPortMariadb')}
            className={touched.internalPortMariadb && errors.internalPortMariadb ? 'is-invalid' : touched.internalPortMariadb ? 'is-valid' : ''}
          />
          {touched.internalPortMariadb && errors.internalPortMariadb && (
            <div className="invalid-feedback">{errors.internalPortMariadb}</div>
          )}
        </Col>
        <Col sm="6">
          <Form.Label>External Port</Form.Label>
          <Form.Control
            type="number"
            name="externalPortMariadb"
            placeholder="3306"
            value={values.externalPortMariadb}
            onChange={handleChange}
            onBlur={() => handleBlur('externalPortMariadb')}
            className={touched.externalPortMariadb && errors.externalPortMariadb ? 'is-invalid' : touched.externalPortMariadb ? 'is-valid' : ''}
          />
          {touched.externalPortMariadb && errors.externalPortMariadb && (
            <div className="invalid-feedback">{errors.externalPortMariadb}</div>
          )}
        </Col>
      </Form.Group>

      {/* MongoDB Ports */}
      <Form.Group as={Row} controlId="mongodbPorts" className="mt-3">
        <Form.Label column sm="12" className="mb-2">MongoDB Ports</Form.Label>
        <Col sm="6">
          <Form.Label>Internal Port</Form.Label>
          <Form.Control
            type="number"
            name="internalPortMongodb"
            placeholder="27017"
            value={values.internalPortMongodb}
            onChange={handleChange}
            onBlur={() => handleBlur('internalPortMongodb')}
            className={touched.internalPortMongodb && errors.internalPortMongodb ? 'is-invalid' : touched.internalPortMongodb ? 'is-valid' : ''}
          />
          {touched.internalPortMongodb && errors.internalPortMongodb && (
            <div className="invalid-feedback">{errors.internalPortMongodb}</div>
          )}
        </Col>
        <Col sm="6">
          <Form.Label>External Port</Form.Label>
          <Form.Control
            type="number"
            name="externalPortMongodb"
            placeholder="27020"
            value={values.externalPortMongodb}
            onChange={handleChange}
            onBlur={() => handleBlur('externalPortMongodb')}
            className={touched.externalPortMongodb && errors.externalPortMongodb ? 'is-invalid' : touched.externalPortMongodb ? 'is-valid' : ''}
          />
          {touched.externalPortMongodb && errors.externalPortMongodb && (
            <div className="invalid-feedback">{errors.externalPortMongodb}</div>
          )}
        </Col>
      </Form.Group>
    </Form>
  );
}
