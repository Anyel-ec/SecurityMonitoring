import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { upperCase, lowerCase, number, specialCharacter } from '../../../../../hooks/services/static/useRegularExplession';
import { useResetPasswordUserTokenService } from '../../../../../hooks/services/system/recovery-password.service';
export default function EnterPassword({ mail, code }) {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useResetPasswordUserTokenService();
    // Cambiar tipo de input de contraseña
    const [showPasswd, setShowPasswd] = useState(false);
    // Validaciones de nueva contraseña
    const evalNewPassword = (value) => {
        if (!value) {
            setNewPasswordError('Introduzca una nueva contraseña');
            return false;
        } else if (!upperCase.test(value)) {
            setNewPasswordError('Debe contener alguna mayúscula');
            return false;
        } else if (!lowerCase.test(value)) {
            setNewPasswordError('Debe contener alguna letra minúscula');
            return false;
        } else if (!number.test(value)) {
            setNewPasswordError('Debe contener al menos un número');
            return false;
        } else if (!specialCharacter.test(value)) {
            setNewPasswordError('Debe contener algún carácter especial');
            return false;
        } else if (value.length <= 8) {
            setNewPasswordError('Debe contener más de 8 caracteres');
            return false;
        } else if (value.length > 255) {
            setNewPasswordError('La contraseña es demasiado larga');
            return false;
        } else {
            setNewPasswordError('');
        }
        return true;
    }
    // Validaciones de repeticion de contraseña
    const evalRepeatPassword = (value) => {
        if (!value) {
            setRepeatPasswordError('Repetir la contraseña');
            return false;
        } else if (value !== newPassword) {
            setRepeatPasswordError('Las contraseñas no coinciden');
            return false;
        } else {
            setRepeatPasswordError('');
        }
        return true;
    }
    // Validar cambios de nueva contraseña
    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        evalNewPassword(value);
        evalRepeatPassword(repeatPassword);
    }
    // Validar cambios de repeticion de contraseña
    const handleRepeatPasswordChange = (e) => {
        const value = e.target.value;
        setRepeatPassword(value);
        evalRepeatPassword(value);
    }
    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNewPasswordError('');
        setRepeatPasswordError('');
        let valid = true;
        const newPasswordValid = evalNewPassword(newPassword);
        const repeatPasswordValid = evalRepeatPassword(repeatPassword);
        // Validaciones
        valid = newPasswordValid && repeatPasswordValid;
        if (!valid) return;
        const formData = {
            email: mail,
            code: code,
            newPassword: repeatPassword,
        }
        const result = await content(formData);
        if (result) {
            if (result.httpCode === 200) {
                setNewPassword('');
                setRepeatPassword('');
                setErrorResponse('');
                navigate('/login');
            } else {
                return setErrorResponse(result.message);
            }
        }
    };
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="newPassword" className="dark:text-white">
                    Nueva contraseña
                </label>
                <div className="relative text-white-dark">
                    <input
                        id="newPassword"
                        type={showPasswd ? "text" : "password"}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        placeholder="Ingrese una contraseña"
                        className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <i className="fa-regular fa-key"></i>
                    </span>
                </div>
                {newPasswordError && <span className='text-danger'>{newPasswordError}</span>}
            </div>
            <div>
                <label htmlFor="repeatPassword" className="dark:text-white">
                    Repetir contraseña
                </label>
                <div className="relative text-white-dark">
                    <input
                        id="repeatPassword"
                        type={showPasswd ? "text" : "password"}
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                        placeholder="Repita la contraseña"
                        className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <i className="fa-solid fa-key"></i>
                    </span>
                </div>
                {repeatPasswordError && <span className='text-danger'>{repeatPasswordError}</span>}
            </div>
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={showPasswd}
                    onChange={(e) => setShowPasswd(e.target.checked)}
                />
                <span className=" text-white-dark">Mostrar contraseña</span>
            </label>
            {errorResponse && <div className='w-full text-center'>
                <span className='text-danger'>{errorResponse}</span>
            </div>}
            <button type="submit" className="btn text-white dark:text-[#fff] bg-dark !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                RESTABLECER
            </button>
        </form>
    )
}
