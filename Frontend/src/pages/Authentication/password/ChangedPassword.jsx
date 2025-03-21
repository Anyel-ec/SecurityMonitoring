import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, toggleRTL } from '../../../store/themeConfigSlice';
import EnterPassword from '../recovery-password/template/enter_password/EnterPassword';

const ChangedPassword = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Recuperar Contraseña'));
  });
  // Cambiar de componente
  const [changeComponent, setChangeComponent] = useState(1);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [mail, setMail] = useState('');
  const [code, setCode] = useState('');
  const [timeCode, setTimeCode] = useState('');
  useEffect(() => {
    if (changeComponent === 1) {
      setTitle('Cambio de Clave Cuenta')
      setSubtitle('Ingrese su correo electrónico para recuperar su contraseña')
    }
  }, [changeComponent, mail, timeCode]);
  // Boton de regresar la navegacion
  const handdleBack = () => {
    if (changeComponent === 1) {
      navigate('/login', { replace: true });
    } else if (changeComponent === 2) {
      setChangeComponent(1)
    } else if (changeComponent === 3) {
      setChangeComponent(2)
    }
  }
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center  bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
        <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
        <div className="relative w-full shadow-lg max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(106, 185, 211, 0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 py-20">
            {/* Boton para regresar */}
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-7">
                <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
                <EnterPassword mail={mail} code={code} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangedPassword;
