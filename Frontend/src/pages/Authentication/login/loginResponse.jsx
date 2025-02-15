import { useState } from 'react';
import { useAuthService } from '../../../hooks/services/system/Auth.service';

export default function useLogin() {

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useAuthService();

    // Validar cambios en email
    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        if (!value) {
            setUsernameError('El usuario es requerido');
        } else {
            setUsernameError('');
        }
    };

    // Validar cambios en password
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError('La contraseña es requerida');
        } else {
            setPasswordError('');
        }
    };

    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPasswordError('');
        let valid = true;

        if (!username) {
            setUsernameError('El usuario es requerido');
            valid = false;
        }

        if (!password) {
            setPasswordError('La contraseña es requerida');
            valid = false;
        }

        if (!valid) return;

        // Llamar al servicio de autenticación
        const result = await content(username, password);
        if (result) {
            if (result.httpCode === 200) {
                window.location.href = '/';
            } else {
                return setErrorResponse(result.message);
            }
        }
    };

    return {
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
    };
}
