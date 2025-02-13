import React, { useEffect, useState } from 'react';
import { useResetPasswordCodeService, useResetPasswordUserVerifyCodeService } from '../../../../../hooks/services/system/Recovery-password.service';
export default function EnterCode({ setChange, timeCode, setTimeCode, mail = "appatino@espe.edu.ec", setCode }) {
    const [otp, setOtp] = useState('');
    const [optError, setOptError] = useState('');
    const [time, setTime] = useState('00:00');
    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useResetPasswordUserVerifyCodeService();
    const { content: contentResetCode, loading: loadingResetCode, error: errorResetCode } = useResetPasswordCodeService();
    useEffect(() => {
        const expirationDate = new Date(timeCode).getTime();
        const now = new Date().getTime();
        let timerInSeconds = Math.floor((expirationDate - now) / 1000);
        if (timerInSeconds <= 0) {
            setTime('00:00');
            return;
        }
        const intervalId = setInterval(() => {
            const minutes = Math.floor(timerInSeconds / 60);
            const seconds = timerInSeconds % 60;
            setTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
            if (--timerInSeconds < 0) {
                clearInterval(intervalId);
                setTime('00:00');
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeCode]);
    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setOptError('');
        let valid = true;
        if (otp.length !== 6 || isNaN(otp)) {
            setOptError('El código es obligatorio y debe tener 6 dígitos numéricos');
            valid = false;
        }
        if (!valid) return;
        const data = {
            email: mail,
            code: otp
        };
        // Llamar al servicio de autenticación
        const result = await content(data);
        if (result) {
            if (result.httpCode === 200) {
                setChange(3);
                setCode(otp);
            } else {
                return setErrorResponse(result.message);
            }
        }
    };
    // Restablecer código
    const handleResendCode = async () => {
        const data = { email: mail };
        // Llamar al servicio de autenticación
        const result = await contentResetCode(data);
        console.log(result);
        if (result) {
            if (result.httpCode === 200) {
                setTimeCode(result.result.expirationDate)
            } else {
                return setErrorResponse(result.message);
            }
        }
    };
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                {mail && (
                    <div className="flex p-2 bg-gray-200 dark:bg-gray-800 rounded-md w-full text-center mb-5 justify-evenly">
                        <span className="flex text-center justify-evenly text-black dark:text-white">{mail}</span>
                    </div>
                )}
                <label htmlFor="otp" className="dark:text-white">
                    Código de verificación
                </label>
                <div className="relative text-white-dark">
                    <input
                        id="otp"
                        type="text"
                        placeholder="Ingrese el código de 6 dígitos"
                        className="form-input ps-10 placeholder:text-white-dark"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value);
                            setOptError(''); // Clear error message on input change
                        }}
                        maxLength={6}
                        minLength={6}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <i className="fa-solid fa-shield"></i>
                    </span>
                </div>
                {optError && <p className="text-red-500 text-sm mt-1">{optError}</p>}
                <div className="flex justify-between items-center mt-3">
                    <span className="timer">{time}</span>
                    <span className="hover:underline cursor-pointer" onClick={handleResendCode}>
                        <span>Reenviar código</span>
                    </span>
                </div>
            </div>
            {errorResponse && <p className="text-red-500 text-center text-sm mt-2">{errorResponse}</p>}
            <button
                type="submit"
                className="btn btn-dark !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
            >
                ENVIAR
            </button>
        </form>
    );
}
