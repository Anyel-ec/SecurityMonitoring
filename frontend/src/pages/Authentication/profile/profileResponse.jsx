import { useState } from 'react';
import { useGlobalContext } from '../../../hooks/contexts/global.context';
import { useUpdateProfileUserService } from '../../../hooks/services/system/profile.service';
import { showErrorAlert, showSuccessAlert } from '../../../components/alerts/alerts';
import { emailRegex, phoneRegex } from '../../../hooks/services/static/useRegularExplession';

export default function useProfile() {
    // Contexto global para obtener los datos del usuario
    const { globalVariables, setGlobalVariables } = useGlobalContext();

    const [username, setUsername] = useState(`${globalVariables.username}`);
    const [usernameError, setUsernameError] = useState('');
    const [phone, setPhone] = useState(`${globalVariables.phone}`);
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState(`${globalVariables.email}`);
    const [emailError, setEmailError] = useState('');

    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useUpdateProfileUserService();

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

    // Validar cambios en phone
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);

        if (!value) {
            setPhoneError('El telefono es requerido');
        } else if (!phoneRegex.test(value)) {
            setPhoneError('El telefono no es válido');
        } else {
            setPhoneError('');
        }
    };

    // Validar cambios en email
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value) {
            setEmailError('El correo es requerido');
        } else if (!emailRegex.test(value)) {
            setEmailError('El correo no es válido');
        } else {
            setEmailError('');
        }
    };

    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPhoneError('');
        setEmailError('');
        let valid = true;

        if (!username) {
            setUsernameError('El usuario es requerido');
            valid = false;
        }

        if (!phone) {
            setPhoneError('El telefono es requerido');
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError('El telefono no es válido');
            valid = false;
        }

        if (!email) {
            setEmailError('El correo es requerido');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('El correo no es válido');
            valid = false;
        }

        if (!valid) return;

        const formdata = {
            username,
            phone,
            email,
        };

        // Llamar al servicio de autenticación
        const result = await content(formdata);
        if (result) {
            if (result.httpCode === 200) {

                // Actualizar los datos del contexto global
                setGlobalVariables((prev) => ({
                    ...prev,
                    username: formdata.username,
                    phone: formdata.phone,
                    email: formdata.email,
                }));

                showSuccessAlert('Guardado exitoso');

            } else {
                showErrorAlert(result.message);
                return setErrorResponse(result.message);
            }
        }
    };

    return {
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
    };
}
