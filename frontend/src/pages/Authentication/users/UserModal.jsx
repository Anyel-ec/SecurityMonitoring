import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IconX from '../../../components/Icon/IconX';
import Select from 'react-select';
import { HandleMode } from './selectStyles';
import { useSelector } from 'react-redux';
import { useGetAllRolesService } from '../../../hooks/services/system/users_services';
import { showErrorAlert, showSuccessAlert } from '../../../components/alerts/Alerts';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es requerido').max(50, 'Máximo 50 caracteres'),
    email: Yup.string().email('Correo electrónico no válido').required('Correo electrónico es requerido').max(100, 'Máximo 100 caracteres'),
    phone: Yup.string()
        .matches(/^\d+$/, 'Solo números permitidos')
        .required('El número de teléfono es requerido')
        .max(15, 'Máximo 15 caracteres'),
    name: Yup.string().required('El nombre es requerido').max(50, 'Máximo 50 caracteres'),
    lastname: Yup.string().required('El apellido es requerido').max(50, 'Máximo 50 caracteres'),
    company: Yup.string().required('La compañía es requerida').max(100, 'Máximo 100 caracteres'),
    roles: Yup.array()
        .min(1, 'Debes asignar al menos un rol')
        .required('El rol es requerido'),
    password: Yup.string().when('isNewUser', {
        is: true,
        then: Yup.string().required('La contraseña es requerida').min(8, 'Mínimo 8 caracteres')
    }),
});

const UserModal = ({ isOpen, onClose, onSave, user }) => {
    const isDarkMode = useSelector((state) => state.themeConfig.theme === 'dark');
    const styles = HandleMode(isDarkMode);
    const [rolesOptions, setRolesOptions] = useState([]);
    const { content: fetchRoles, loading: rolesLoading, error: rolesError } = useGetAllRolesService();

    useEffect(() => {
        const loadRoles = async () => {
            if (isOpen) {
                try {
                    const roles = await fetchRoles();
                    setRolesOptions(
                        roles.map((role) => ({
                            value: role.id,
                            label: role.name,
                        }))
                    );
                } catch (err) {
                    showErrorAlert('Error al cargar roles', 'No se pudieron cargar los roles.');
                }
            }
        };
        loadRoles();
    }, [isOpen, fetchRoles]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-[51]">
                <div className="fixed inset-0 bg-[black]/60" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button type="button" onClick={onClose} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                {user ? 'Editar Usuario' : 'Agregar Usuario'}
                            </div>
                            <div className="p-5">
                                <Formik
                                    initialValues={{
                                        username: user?.username || '',
                                        email: user?.email || '',
                                        phone: user?.phone || '',
                                        name: user?.name || '',
                                        lastname: user?.lastname || '',
                                        company: user?.company || '',
                                        roles: user
                                            ? rolesOptions.filter((option) =>
                                                user.roles.some((role) => role.id === option.value)
                                            )
                                            : [],
                                        password: '',
                                        isNewUser: !user,
                                    }}
                                    enableReinitialize={true}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, formikHelpers) => {
                                        try {
                                            await onSave(values, formikHelpers);
                                            formikHelpers.resetForm();
                                            onClose();
                                        } catch (error) {
                                            console.error("Error en onSave:", error);
                                            showErrorAlert(
                                                "Error al guardar usuario",
                                                "Ocurrió un error al intentar guardar el usuario. Inténtalo de nuevo."
                                            );
                                        }
                                    }}



                                    >
                                    {({ values, setFieldValue }) => (
                                        <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="username">Usuario</label>
                                                <Field name="username" type="text" id="username" placeholder="Ingrese el usuario" className="form-input" />
                                                <ErrorMessage name="username" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Correo</label>
                                                <Field name="email" type="email" id="email" placeholder="Ingrese el correo" className="form-input" />
                                                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone">Teléfono</label>
                                                <Field name="phone" type="text" id="phone" placeholder="Ingrese el teléfono" className="form-input" />
                                                <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="name">Nombre</label>
                                                <Field name="name" type="text" id="name" placeholder="Ingrese el nombre" className="form-input" />
                                                <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="lastname">Apellido</label>
                                                <Field name="lastname" type="text" id="lastname" placeholder="Ingrese el apellido" className="form-input" />
                                                <ErrorMessage name="lastname" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="company">Compañía</label>
                                                <Field name="company" type="text" id="company" placeholder="Ingrese la compañía" className="form-input" />
                                                <ErrorMessage name="company" component="div" className="text-danger mt-1" />
                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="roles">Roles</label>
                                                {rolesLoading ? (
                                                    <p>Cargando roles...</p>
                                                ) : rolesError ? (
                                                    <p className="text-danger">{rolesError}</p>
                                                ) : (
                                                    <Select
                                                        name="roles"
                                                        styles={styles}
                                                        placeholder="Selecciona roles"
                                                        options={rolesOptions}
                                                        isMulti
                                                        onChange={(options) => setFieldValue('roles', options)}
                                                        value={values.roles}
                                                    />
                                                )}
                                                <ErrorMessage name="roles" component="div" className="text-danger mt-1" />
                                            </div>
                                            {values.isNewUser && (
                                                <div className="col-span-2">
                                                    <label htmlFor="password">Contraseña</label>
                                                    <Field name="password" type="password" id="password" placeholder="Ingrese la contraseña" className="form-input" />
                                                    <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                                                </div>
                                            )}
                                            <div className="flex justify-end items-center mt-8 col-span-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                                                    Cancelar
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    {user ? 'Actualizar' : 'Agregar'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UserModal;
