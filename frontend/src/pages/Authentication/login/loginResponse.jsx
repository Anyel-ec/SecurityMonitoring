import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../../hooks/services/system/auth.service';

export default function useLogin() {
    // Hook para la navegación
    const navigate = useNavigate();

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
        console.log(result)
        if (result) {
            if (result.httpCode === 200) {
                navigate('/', { replace: true });
                console.log(result.message);
                console.log('Entro')
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
