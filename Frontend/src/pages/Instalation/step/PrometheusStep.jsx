import React from 'react';

export default function PrometheusStep({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="prometheusLocalPort" className="block text-sm font-medium mb-1">Puerto Local de Prometheus</label>
        <input
          type="text"
          id="prometheusLocalPort"
          name="prometheusLocalPort"
          placeholder="e.g., 3000"
          value={values.prometheusLocalPort}
          onChange={handleChange}
          maxLength={5}
          onBlur={() => handleBlur('prometheusLocalPort')}
          className="form-input"
        />
        {touched.prometheusLocalPort && errors.prometheusLocalPort && <p className="mt-1 text-sm text-red-500">{errors.prometheusLocalPort}</p>}
      </div>

      <div>
        <label htmlFor="prometheusDockerPort" className="block text-sm font-medium mb-1">Puerto para Docker de Prometheus</label>
        <input
          type="text"
          id="prometheusDockerPort"
          name="prometheusDockerPort"
          placeholder="e.g., 3000"
          maxLength={5}
          value={values.prometheusDockerPort}
          onChange={handleChange}
          onBlur={() => handleBlur('prometheusDockerPort')}
          className="form-input"
        />
        {touched.prometheusDockerPort && errors.prometheusDockerPort && <p className="mt-1 text-sm text-red-500">{errors.prometheusDockerPort}</p>}
      </div>

      <div>
        <label htmlFor="alertmanagerLocalPort" className="block text-sm font-medium mb-1">Puerto Local de Alertmanager</label>
        <input
          type="text"
          id="alertmanagerLocalPort"
          name="alertmanagerLocalPort"
          placeholder="e.g., 9093"
          value={values.alertmanagerLocalPort}
          onChange={handleChange}
          maxLength={5}
          onBlur={() => handleBlur('alertmanagerLocalPort')}
          className="form-input"
        />
        {touched.alertmanagerLocalPort && errors.alertmanagerLocalPort && <p className="mt-1 text-sm text-red-500">{errors.alertmanagerLocalPort}</p>}
      </div>

      <div>
        <label htmlFor="alertmanagerDockerPort" className="block text-sm font-medium mb-1">Puerto para Docker de Alertmanager</label>
        <input
          type="text"
          id="alertmanagerDockerPort"
          name="alertmanagerDockerPort"
          placeholder="e.g., 9093"
          value={values.alertmanagerDockerPort}
          onChange={handleChange}
          maxLength={5}
          onBlur={() => handleBlur('alertmanagerDockerPort')}
          className="form-input"
        />
        {touched.alertmanagerDockerPort && errors.alertmanagerDockerPort && <p className="mt-1 text-sm text-red-500">{errors.alertmanagerDockerPort}</p>}
      </div>

    </form>
  );
}

