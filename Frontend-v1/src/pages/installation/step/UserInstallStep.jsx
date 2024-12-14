import React from 'react';
import { Form } from 'react-bootstrap';

export default function UserInstallStep({ values, errors, touched, handleBlur, handleChange }) {
    return (
        <Form>
            <Form.Group controlId="usuario" className="mt-3">
                <Form.Label>Admin User</Form.Label>
                <Form.Control
                    type="text"
                    name="usuario"
                    placeholder="Enter admin username"
                    value={values.usuario}
                    onChange={handleChange}
                    onBlur={() => handleBlur('usuario')}
                    className={touched.usuario && errors.usuario ? 'is-invalid' : touched.usuario ? 'is-valid' : ''}
                />
                {touched.usuario && errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className={touched.password && errors.password ? 'is-invalid' : touched.password ? 'is-valid' : ''}
                />
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </Form.Group>

            {/* Campo para confirmar contraseña */}
            <Form.Group controlId="passwordConfirm" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm password"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={() => handleBlur('passwordConfirm')}
                    className={touched.passwordConfirm && errors.passwordConfirm ? 'is-invalid' : touched.passwordConfirm ? 'is-valid' : ''}
                />
                {touched.passwordConfirm && errors.passwordConfirm && (
                    <div className="invalid-feedback">{errors.passwordConfirm}</div>
                )}
            </Form.Group>

            <Form.Group controlId="numberPhone" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    name="numberPhone"
                    placeholder="Enter phone number"
                    value={values.numberPhone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('numberPhone')}
                    className={touched.numberPhone && errors.numberPhone ? 'is-invalid' : touched.numberPhone ? 'is-valid' : ''}
                />
                {touched.numberPhone && errors.numberPhone && <div className="invalid-feedback">{errors.numberPhone}</div>}
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={touched.email && errors.email ? 'is-invalid' : touched.email ? 'is-valid' : ''}
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </Form.Group>
        </Form>
    );
}
