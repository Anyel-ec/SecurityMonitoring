import React from 'react';

export default function UserInstallStep({ values, errors, touched, handleBlur, handleChange }) {
    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="usuario" className="block text-sm font-medium mb-1">Usuario Administrador</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Ingrese un nombre de usuario"
                    value={values.usuario}
                    onChange={handleChange}
                    onBlur={() => handleBlur('usuario')}
                    className="form-input"
                />
                {touched.usuario && errors.usuario && <p className="mt-1 text-sm text-red-500">{errors.usuario}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingrese una contraseña"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className="form-input"
                />
                {touched.password && errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Repita la contraseña"
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    onBlur={() => handleBlur('passwordConfirm')}
                    className="form-input"
                />
                {touched.passwordConfirm && errors.passwordConfirm && <p className="mt-1 text-sm text-red-500">{errors.passwordConfirm}</p>}
            </div>

            <div>
                <label htmlFor="numberPhone" className="block text-sm font-medium mb-1">Número de teléfono</label>
                <input
                    type="text"
                    id="numberPhone"
                    name="numberPhone"
                    placeholder="Ingrese un número de teléfono"
                    value={values.numberPhone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('numberPhone')}
                    className="form-input"
                />
                {touched.numberPhone && errors.numberPhone && <p className="mt-1 text-sm text-red-500">{errors.numberPhone}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Eléctronico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ingrese un correo electrónico"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className="form-input"
                />
                {touched.email && errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
        </form>
    );
}

