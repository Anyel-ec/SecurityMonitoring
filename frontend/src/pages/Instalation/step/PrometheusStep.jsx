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
          onBlur={() => handleBlur('prometheusLocalPort')}
          className="form-input"
        />
        {touched.prometheusLocalPort && errors.prometheusLocalPort && <p className="mt-1 text-sm text-red-500">{errors.prometheusLocalPort}</p>}
      </div>

      <div>
        <label htmlFor="prometheusDockerPort" className="block text-sm font-medium mb-1">Puerto para Docket de Prometheus</label>
        <input
          type="text"
          id="prometheusDockerPort"
          name="prometheusDockerPort"
          placeholder="e.g., 3000"
          value={values.prometheusDockerPort}
          onChange={handleChange}
          onBlur={() => handleBlur('prometheusDockerPort')}
          className="form-input"
        />
        {touched.prometheusDockerPort && errors.prometheusDockerPort && <p className="mt-1 text-sm text-red-500">{errors.prometheusDockerPort}</p>}
      </div>
    </form>
  );
}

