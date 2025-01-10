import React from 'react';

export default function GrafanaStep({ values, errors, touched, handleBlur, handleChange }) {
    return (
        <form className="space-y-4">
            <div>
                <label htmlFor="grafanaAdmin" className="block text-sm font-medium mb-1">Usuario Administrador de Grafana</label>
                <input
                    type="text"
                    id="grafanaAdmin"
                    name="grafanaAdmin"
                    placeholder="Ingrese un nombre de usuario"
                    value={values.grafanaAdmin}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaAdmin')}
                    className="form-input"
                />
                {touched.grafanaAdmin && errors.grafanaAdmin && <p className="mt-1 text-sm text-red-500">{errors.grafanaAdmin}</p>}
            </div>

            <div>
                <label htmlFor="grafanaPassword" className="block text-sm font-medium mb-1">Contraseña de Grafana</label>
                <input
                    type="password"
                    id="grafanaPassword"
                    name="grafanaPassword"
                    placeholder="Ingrese una contraseña"
                    value={values.grafanaPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaPassword')}
                    className="form-input"
                />
                {touched.grafanaPassword && errors.grafanaPassword && <p className="mt-1 text-sm text-red-500">{errors.grafanaPassword}</p>}
            </div>

            <div>
                <label htmlFor="grafanaPasswordConfirm" className="block text-sm font-medium mb-1">Confirmar contraseña de Grafana</label>
                <input
                    type="password"
                    id="grafanaPasswordConfirm"
                    name="grafanaPasswordConfirm"
                    placeholder="Repita la contraseña"
                    value={values.grafanaPasswordConfirm}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaPasswordConfirm')}
                    className="form-input"
                />
                {touched.grafanaPasswordConfirm && errors.grafanaPasswordConfirm && <p className="mt-1 text-sm text-red-500">{errors.grafanaPasswordConfirm}</p>}
            </div>

            <div>
                <label htmlFor="grafanaLocalPort" className="block text-sm font-medium mb-1">Puerto Docker de Grafana</label>
                <input
                    type="text"
                    id="grafanaLocalPort"
                    name="grafanaLocalPort"
                    placeholder="e.g., 3000"
                    value={values.grafanaLocalPort}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaLocalPort')}
                    className="form-input"
                />
                {touched.grafanaLocalPort && errors.grafanaLocalPort && <p className="mt-1 text-sm text-red-500">{errors.grafanaLocalPort}</p>}
            </div>

            <div>
                <label htmlFor="grafanaDockerPort" className="block text-sm font-medium mb-1">Puerto Externo de Grafana</label>
                <input
                    type="text"
                    id="grafanaDockerPort"
                    name="grafanaDockerPort"
                    placeholder="e.g., 3000"
                    value={values.grafanaDockerPort}
                    onChange={handleChange}
                    onBlur={() => handleBlur('grafanaDockerPort')}
                    className="form-input"
                />
                {touched.grafanaDockerPort && errors.grafanaDockerPort && <p className="mt-1 text-sm text-red-500">{errors.grafanaDockerPort}</p>}
            </div>
        </form>
    );
}

