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
        usernameError,
        phoneError,
        emailError,
        errorResponse,
        loading,
        error,
        handleUsernameChange,
        handlePhoneChange,
        handleEmailChange,
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
<<<<<<< HEAD
                <div className="grid grid-cols-1 gap-5">

                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div>

                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black" onSubmit={handleSubmit}>
=======
            <div className="pt-5">
                <div className="grid grid-cols-1 gap-5 mb-5">

                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">

                                <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black" onSubmit={handleSubmit}>
>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
                                    <h6 className="text-lg font-bold mb-5">Información General</h6>
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">

                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor="name">Usuario</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={username}
                                                    onChange={handleUsernameChange}
                                                    placeholder="Ingrese su nombre"
                                                    className="form-input"
                                                />
                                                <span className='text-danger'>{usernameError}</span>
                                            </div>

                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor="phone">Teléfono</label>
                                                <input
                                                    id="phone"
                                                    type="text"
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Ingrese su teléfono"
                                                    className="form-input"
                                                />
                                                <span className='text-danger'>{phoneError}</span>
                                            </div>
<<<<<<< HEAD
                                            
=======
>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor="email">Correo electrónico</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    placeholder="Ingrese su correo electronico"
                                                    className="form-input"
                                                />
                                                <span className='text-danger'>{emailError}</span>
                                            </div>

                                            <div className='w-full text-center'>
                                                <span className='text-danger'>{error}</span>
                                            </div>

                                            <div className="sm:col-span-2 mt-3">
                                                <button type="submit" className="btn btn-primary">
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
<<<<<<< HEAD
                            </div>

                        </div>
                    </div>
                    

                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div>

                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
=======

                            </div>


                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">

>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
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
<<<<<<< HEAD
=======

>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
                            </div>

                        </div>
                    </div>
<<<<<<< HEAD
=======
                </div>
>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
            </div>
        </div>
    );
};

export default Profile;
