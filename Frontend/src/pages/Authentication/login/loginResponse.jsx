import { useState } from 'react';
import { useAuthService } from '../../../hooks/services/system/Auth.service';

export default function useLogin() {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useAuthService();

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        console.log("handleUsernameChange:", value);
        setUsername(value);
        if (!value) {
            setUsernameError('El usuario es requerido');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        console.log("handlePasswordChange:", value);
        setPassword(value);
        if (!value) {
            setPasswordError('La contraseña es requerida');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit: validando formulario");
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
        if (!valid) return null;

        console.log("handleSubmit: llamando al servicio de autenticación");
        const result = await content(username, password);
        console.log("handleSubmit: resultado del login", result);
        if (result && result.httpCode === 200) {
            return result;
        } else {
            setErrorResponse(result?.message || "Error en la autenticación");
        }
        return null;
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
