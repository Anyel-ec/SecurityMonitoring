import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setPageTitle } from '../../../store/themeConfigSlice';
import useLogin from './loginResponse';
// Asegúrate de tener implementado e importado los hooks de detalles y disable-first-login
import { useDetailsUserService, useDisableFirstLoginService } from '../../../hooks/services/system/Auth.service';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content: getUserDetails } = useDetailsUserService();
  const { content: disableFirstLogin } = useDisableFirstLoginService();

  useEffect(() => {
    dispatch(setPageTitle('Login'));
  }, [dispatch]);

  // Datos del formulario a través del hook useLogin
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

  // Estados para controlar el modal de privacidad
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  // Se guarda temporalmente el resultado del login (con el token)
  const [loginData, setLoginData] = useState(null);

  // Función modificada para el submit: obtiene token, llama a userDetails y verifica firstLogin
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit: inicio de submit");
    const loginResult = await handleSubmit(e);
    console.log("onSubmit: resultado obtenido", loginResult);
    if (loginResult && loginResult.httpCode === 200) {
      // Guardamos el token temporalmente (sin guardarlo en localStorage de forma permanente)
      setLoginData(loginResult);
      localStorage.setItem('temp_token', loginResult.result);
      console.log("onSubmit: token temporal guardado:", loginResult.result);
      const detailsResult = await getUserDetails();
      console.log("onSubmit: detalles del usuario", detailsResult);
      localStorage.removeItem('temp_token'); // Eliminamos el token temporal
      if (detailsResult && detailsResult.httpCode === 200) {
        if (detailsResult.result.firstLogin === true) {
          setShowPrivacyModal(true);
        } else {          localStorage.setItem('token', loginResult.result);
          navigate('/');
          window.location.reload();
        }
      } else {
        console.log("onSubmit:  al obtener detalles del usuario", detailsResult);
      }
    } else {
      console.log("onSubmit: error en la autenticación", loginResult);
    }
  };

  // Función para llamar al endpoint disable-first-login y, si es exitoso, guardar el token permanentemente
  const handleAcceptPrivacy = async () => {
    console.log("handleAcceptPrivacy: usuario hizo click en aceptar");
    if (privacyAccepted) {
      console.log("handleAcceptPrivacy: privacidad aceptada, llamando a disable-first-login");
      const resultDisable = await disableFirstLogin(loginData.result);
      if (resultDisable && resultDisable.success === true) {
        console.log("handleAcceptPrivacy: disable-first-login exitoso, guardando token y redirigiendo");
        localStorage.setItem('token', loginData.result);
        setShowPrivacyModal(false);
        navigate('/');
      } else {
        console.log("handleAcceptPrivacy: error al deshabilitar firstLogin");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el estado de primer inicio de sesión. Intente nuevamente.',
        });
      }
    } else {
      console.log("handleAcceptPrivacy: privacidad NO aceptada");
      Swal.fire({
        icon: 'warning',
        title: 'Políticas no aceptadas',
        text: 'Debe aceptar las políticas de privacidad para continuar.',
      });
      // No se guarda el token
    }
  };

  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <div className="relative shadow-2xl flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[658px] lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative hidden w-full items-center justify-center p-5 bg-gradient-to-r from-slate-50 to-stone-50 dark:from-slate-900 dark:to-zinc-900 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
              <Link to="/inicio" className="w-48 flex items-center gap-5 lg:w-100 ms-10">
                <img src="/assets/images/logo.png" alt="Logo" className="w-20" />
                <span className="text-4xl font-bold dark:text-white text-black">Security Monitoring</span>
              </Link>
              <div className="mt-4 hidden w-full max-w-[430px] lg:block">
                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-dark dark:text-[#fff] md:text-4xl">Iniciar sesión</h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  Introduzca su nombre de usuario y contraseña para iniciar sesión
                </p>
              </div>
              <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
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
                  <span className="text-danger">{usernameError}</span>
                </div>
                <div className="flex flex-col gap-1">
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
                  <span className="text-danger">{passwordError}</span>
                </div>
                <div className="w-full text-center">
                  <span className="text-danger">{error}</span>
                </div>
                <div className="w-full text-center">
                  <Link to="/recuperar-clave" className="text-sm text-dark dark:text-[#fff]">
                    Recuperar contraseña
                  </Link>
                </div>
                <button type="submit" className="btn btn-dark !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                  Ingresar
                </button>
              </form>
            </div>
            <p className="absolute bottom-6 w-full text-center dark:text-white">
              © {new Date().getFullYear()}. Security Monitoring - Todos los Derechos Reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de políticas de privacidad */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Políticas de Privacidad</h2>
            <p className="mb-4 text-sm text-gray-600">
              Bienvenido a Security Monitoring. En esta plataforma, nos comprometemos a proteger su información personal y a garantizar su privacidad. Al utilizar nuestros servicios, usted acepta que:
              <br /><br />
              • Sus datos personales serán utilizados para gestionar y mantener su cuenta, proporcionar soporte y enviar notificaciones relevantes.
              <br />
              • No venderemos ni compartiremos su información con terceros sin su consentimiento previo.
              <br />
              • Sus datos se almacenarán de forma segura y se utilizarán exclusivamente para fines internos y de mejora del servicio.
              <br /><br />
              Le recomendamos leer detenidamente nuestros términos y condiciones y la política de privacidad completa disponible en nuestro sitio web.
            </p>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="privacyConsent"
                checked={privacyAccepted}
                onChange={(e) => {
                  console.log("Checkbox cambio:", e.target.checked);
                  setPrivacyAccepted(e.target.checked);
                }}
                className="mr-2"
              />
              <label htmlFor="privacyConsent" className="text-sm text-gray-700">
                Acepto el uso de mis datos personales según lo descrito.
              </label>
            </div>
            <button
              onClick={handleAcceptPrivacy}
              className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Aceptar y Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
