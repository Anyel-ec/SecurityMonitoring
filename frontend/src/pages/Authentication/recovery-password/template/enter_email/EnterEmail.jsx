import React, { useState } from 'react'
import { emailRegex } from '../../../../../hooks/services/static/useRegularExplession';
import { useResetPasswordCodeService } from '../../../../../hooks/services/system/recovery-password.service';
export default function EnterEmail({ setChange, setTimeCode, setMail }) {
    const [email_user, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useResetPasswordCodeService();
    // Validar cambios en email
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!value) {
            setEmailError('Correo electrónico obligatorio');
        } else if (!emailRegex.test(value)) {
            setEmailError('Formato de correo electrónico no válido');
        } else {
            setEmailError('');
        }
    };
    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        let valid = true;
        if (!email_user) {
            setEmailError('Correo electrónico obligatorio');
            valid = false;
        }
        if (!valid) return;
        const data = { email: email_user }
        // Llamar al servicio de autenticación
        const result = await content(data);
        console.log(result)
        if (result) {
            if (result.httpCode === 200) {
                setChange(2)
                setMail(email_user)
                setTimeCode(result.result.expirationDate)
            } else {
                return setErrorResponse(result.message);
            }
        }
    }
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Email" className="dark:text-white">
                    Correo Electrónico
                </label>
                <div className="relative text-white-dark">
                    <input
                        id="Email"
                        type="email"
                        value={email_user}
                        onChange={handleEmailChange}
                        placeholder="Ingrese un correo válido"
                        className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <i className="fa-solid fa-envelope"></i>
                    </span>
                </div>
                {emailError && <span className='text-danger'>{emailError}</span>}
            </div>
            {errorResponse && <div className='w-full text-center'>
                <span className='text-danger'>{errorResponse}</span>
            </div>}
            <button type="submit" className="btn btn-dark !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span className="ml-2">Cargando...</span>
                    </div>
                ) : (
                    'RECUPERAR'
                )}
            </button>
        </form>
    )
}
