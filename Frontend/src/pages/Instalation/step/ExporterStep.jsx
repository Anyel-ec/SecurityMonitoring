import React from 'react';

export default function ExporterStep({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Puerto del Exportador de PostgreSQL</h3>
          <div>
            <label htmlFor="internalPortPostgres" className="block text-sm font-medium mb-1">Puerto Interno</label>
            <input
              type="number"
              id="internalPortPostgres"
              name="internalPortPostgres"
              placeholder="5432"
              value={values.internalPortPostgres}
              onChange={handleChange}
              maxLength={5}
              onBlur={() => handleBlur('internalPortPostgres')}
              className="form-input"
            />
            {touched.internalPortPostgres && errors.internalPortPostgres && <p className="mt-1 text-sm text-red-500">{errors.internalPortPostgres}</p>}
          </div>
          <div className="mt-2">
            <label htmlFor="externalPortPostgres" className="block text-sm font-medium mb-1">Puerto Externo</label>
            <input
              type="number"
              id="externalPortPostgres"
              name="externalPortPostgres"
              placeholder="5432"
              value={values.externalPortPostgres}
              onChange={handleChange}
              maxLength={5}

              onBlur={() => handleBlur('externalPortPostgres')}
              className="form-input"
            />
            {touched.externalPortPostgres && errors.externalPortPostgres && <p className="mt-1 text-sm text-red-500">{errors.externalPortPostgres}</p>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Puerto del Exportador MariaDB</h3>
          <div>
            <label htmlFor="internalPortMariadb" className="block text-sm font-medium mb-1">Puerto Interno</label>
            <input
              type="number"
              id="internalPortMariadb"
              name="internalPortMariadb"
              placeholder="3306"
              maxLength={5}
              value={values.internalPortMariadb}
              onChange={handleChange}
              onBlur={() => handleBlur('internalPortMariadb')}
              className="form-input"
            />
            {touched.internalPortMariadb && errors.internalPortMariadb && <p className="mt-1 text-sm text-red-500">{errors.internalPortMariadb}</p>}
          </div>
          <div className="mt-2">
            <label htmlFor="externalPortMariadb" className="block text-sm font-medium mb-1">Puerto Externo</label>
            <input
              type="number"
              id="externalPortMariadb"
              name="externalPortMariadb"
              placeholder="3306"
              maxLength={5}
              value={values.externalPortMariadb}
              onChange={handleChange}
              onBlur={() => handleBlur('externalPortMariadb')}
              className="form-input"
            />
            {touched.externalPortMariadb && errors.externalPortMariadb && <p className="mt-1 text-sm text-red-500">{errors.externalPortMariadb}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Puerto del Exportador MongoDB</h3>
          <div>
            <label htmlFor="internalPortMongodb" className="block text-sm font-medium mb-1">Puerto Interno</label>
            <input
              type="number"
              id="internalPortMongodb"
              name="internalPortMongodb"
              placeholder="27017"
              maxLength={5}
              value={values.internalPortMongodb}
              onChange={handleChange}
              onBlur={() => handleBlur('internalPortMongodb')}
              className="form-input"
            />
            {touched.internalPortMongodb && errors.internalPortMongodb && <p className="mt-1 text-sm text-red-500">{errors.internalPortMongodb}</p>}
          </div>
          <div className="mt-2">
            <label htmlFor="externalPortMongodb" className="block text-sm font-medium mb-1">Puerto Externo</label>
            <input
              type="number"
              id="externalPortMongodb"
              name="externalPortMongodb"
              placeholder="27020"
              value={values.externalPortMongodb}
              onChange={handleChange}
              maxLength={5}
              onBlur={() => handleBlur('externalPortMongodb')}
              className="form-input"
            />
            {touched.externalPortMongodb && errors.externalPortMongodb && <p className="mt-1 text-sm text-red-500">{errors.externalPortMongodb}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

