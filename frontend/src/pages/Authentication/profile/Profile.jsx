import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useEffect } from 'react';
import useProfile from './profileResponse';
import usePassword from './passwordResponse';

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Perfil'));
    });

    // Datos de formulario
    const {
        username,
        phone,
        email,
        name,
        lastname,
        company,
        usernameError,
        phoneError,
        emailError,
        nameError,
        lastnameError,
        companyError,
        errorResponse,
        loading,
        error,
        handleUsernameChange,
        handlePhoneChange,
        handleEmailChange,
        handleNameChange,
        handleLastnameChange,
        handleCompanyChange,
        handleSubmit,
    } = useProfile();

    // Datos del formulario de contraseña
    const {
        password,
        newPassword,
        passwordError,
        newPasswordError,
        errorResponse: errorResponsePassword,
        loading: loadingPassword,
        error: errorPassword,
        handlePasswordChange,
        handleNewPasswordChange,
        handleSubmit: handleSubmitPassword,
    } = usePassword();

    return (
        <div>
            <div className="grid grid-cols-1 gap-5">
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div>
                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <form
                                className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black"
                                onSubmit={handleSubmit}
                            >
                                <h6 className="text-lg font-bold mb-5">Información General</h6>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        {/* Usuario */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="username">Usuario</label>
                                            <input
                                                id="username"
                                                type="text"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                placeholder="Ingrese su usuario"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{usernameError}</span>
                                        </div>

                                        {/* Teléfono */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="phone">Teléfono</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                placeholder="Ingrese su teléfono"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{phoneError}</span>
                                        </div>

                                        {/* Correo electrónico */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="email">Correo electrónico</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="Ingrese su correo electrónico"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{emailError}</span>
                                        </div>

                                        {/* Nombre */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="name">Nombre</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={handleNameChange}
                                                placeholder="Ingrese su nombre"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{nameError}</span>
                                        </div>

                                        {/* Apellido */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="lastname">Apellido</label>
                                            <input
                                                id="lastname"
                                                type="text"
                                                value={lastname}
                                                onChange={handleLastnameChange}
                                                placeholder="Ingrese su apellido"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{lastnameError}</span>
                                        </div>

                                        {/* Compañía */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="company">Compañía</label>
                                            <input
                                                id="company"
                                                type="text"
                                                value={company}
                                                onChange={handleCompanyChange}
                                                placeholder="Ingrese su compañía"
                                                className="form-input"
                                            />
                                            <span className="text-danger">{companyError}</span>
                                        </div>

                                        {/* Mensaje de error general */}
                                        <div className="w-full text-center">
                                            <span className="text-danger">{errorResponse}</span>
                                        </div>

                                        {/* Botón de guardar */}
                                        <div className="sm:col-span-2 mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={loading}
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>


                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div>

                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black" onSubmit={handleSubmitPassword}>
                                <h6 className="text-lg font-bold mb-5">Cambiar contraseña</h6>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor="name">Contraseña actual</label>
                                            <input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                placeholder="Ingrese su contraseña"
                                                className="form-input"
                                            />
                                            <span className='text-danger'>{passwordError}</span>
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor="phone">Nueva contraseña</label>
                                            <input
                                                id="new_password"
                                                type="password"
                                                value={newPassword}
                                                onChange={handleNewPasswordChange}
                                                placeholder="Ingrese una nueva contraseña"
                                                className="form-input"
                                            />
                                            <span className='text-danger'>{newPasswordError}</span>
                                        </div>

                                        <div className='w-full text-center'>
                                            <span className='text-danger'>{errorPassword}</span>
                                        </div>

                                        <div className="sm:col-span-2 mt-3">
                                            <button type="submit" className="btn btn-primary">
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
