import * as Yup from 'yup';

export const grafanaValidationSchema = Yup.object().shape({
    grafanaAdmin: Yup.string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .required('Nombre de usuario es requerido'),
    grafanaPassword: Yup.string()
        .min(5, 'La contraseña debe tener al menos 5 caracteres')
        .required('La contraseña es requerida'),
    grafanaPasswordConfirm: Yup.string()
        .oneOf([Yup.ref('grafanaPassword')], 'Las contraseñas no coinciden')
        .required('Debes confirmar la contraseña'),
    grafanaLocalPort: Yup.number()
        .typeError('El puerto de Grafana debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto es requerido'),
    grafanaDockerPort: Yup.number()
        .typeError('El puerto de Grafana debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto es requerido'),
});

export const prometheusValidationSchema = Yup.object().shape({
    prometheusLocalPort: Yup.number()
        .typeError('El puerto local de Prometheus debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto local es requerido'),
    prometheusDockerPort: Yup.number()
        .typeError('El puerto Docker de Prometheus debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto Docker es requerido'),
});

export const exportersValidationSchema = Yup.object().shape({
    internalPortPostgres: Yup.number()
        .typeError('El puerto de PostgreSQL debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de PostgreSQL es requerido'),
    externalPortPostgres: Yup.number()
        .typeError('El puerto de PostgreSQL debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de PostgreSQL es requerido'),
    internalPortMariadb: Yup.number()
        .typeError('El puerto de MariaDB debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de MariaDB es requerido'),
    externalPortMariadb: Yup.number()
        .typeError('El puerto de MariaDB debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de MariaDB es requerido'),
    internalPortMongodb: Yup.number()
        .typeError('El puerto de MongoDB debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de MongoDB es requerido'),
    externalPortMongodb: Yup.number()
        .typeError('El puerto de MongoDB debe ser un número válido')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .min(1, 'El puerto debe ser mayor a 0')
        .max(65535, 'El puerto no puede exceder 65535')
        .required('El puerto de MongoDB es requerido'),
});
export const userInstallValidationSchema = Yup.object().shape({
    usuario: Yup.string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .required('El nombre de usuario es requerido'),

    password: Yup.string()
        .min(5, 'La contraseña debe tener al menos 5 caracteres')
        .required('La contraseña es requerida'),

    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Debes confirmar la contraseña'),

    numberPhone: Yup.string()
        .typeError('El número de teléfono debe contener solo dígitos')
        .transform((value, originalValue) => (originalValue.trim() === '' ? NaN : value))
        .matches(/^\d+$/, 'El número de teléfono debe contener solo dígitos')
        .min(10, 'El número de teléfono debe tener al menos 10 dígitos')
        .max(10, 'El número de teléfono no puede exceder los 10 dígitos')
        .required('El número de teléfono es requerido'),

    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),

    name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es requerido'),

    lastname: Yup.string()
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .required('El apellido es requerido'),

    company: Yup.string()
        .min(3, 'La empresa debe tener al menos 3 caracteres')
        .required('La empresa es requerida'),
});
