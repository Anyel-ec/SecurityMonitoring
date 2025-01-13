import React from 'react';

export default function UserInstallStep({ values, errors, touched, handleBlur, handleChange }) {
    return (
        <form className="space-y-4">
            {/* Primera fila: Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ingrese su nombre"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        className="form-input"
                    />
                    {touched.name && errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium mb-1">Apellido</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Ingrese su apellido"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={() => handleBlur('lastname')}
                        className="form-input"
                    />
                    {touched.lastname && errors.lastname && <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>}
                </div>
            </div>

            {/* Segunda fila: Empresa y Usuario */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">Empresa</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Ingrese el nombre de la empresa"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={() => handleBlur('company')}
                        className="form-input"
                    />
                    {touched.company && errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>

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
            </div>

            {/* Tercera fila: Contraseña y Repetir Contraseña */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Cuarta fila: Número de Teléfono y Correo */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="numberPhone" className="block text-sm font-medium mb-1">Número de Teléfono</label>
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
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Correo Electrónico</label>
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
            </div>
        </form>
    );
}
