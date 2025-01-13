import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../../store/themeConfigSlice';
import useLogin from './loginResponse';

const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });

    // Datos del formulario
    const {
        username,
        password,
        usernameError,
        passwordError,
        errorResponse,
        loading,
        error,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    } = useLogin();


    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />

                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[658px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link to="/inicio" className="w-48 flex items-center gap-5 lg:w-100 ms-10">
                                {/* Logo */}
                                <img src="/assets/images/logo.png" alt="Logo" className="w-20" />
                                <span className='text-4xl font-bold text-white'>Security Monitoring</span>
                            </Link>
                            <div className="mt-4 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Iniciar sesión</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Introduzca su nombre de usuario y contraseña para iniciar sesión</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>

                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="User">Usuario</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="text"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            placeholder="Ingrese su usuario"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                    </div>
                                    <span className='text-danger'>{usernameError}</span>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="Password">Contraseña</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder="Ingrese su contraseña"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                    </div>
                                    <span className='text-danger'>{passwordError}</span>
                                </div>

                                <div className='w-full text-center'>
                                    <span className='text-danger'>{error}</span>
                                </div>

                                <div className='w-full text-center'>
                                    <Link to="/recuperar-clave" className="text-sm text-primary">¿Olvidó su contraseña?</Link>
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Ingresar
                                </button>
                            </form>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.Security Monitoring Todos los Derechos Reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
