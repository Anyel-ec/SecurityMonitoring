import { useState } from 'react';
import { useUpdatePasswordUserService } from '../../../hooks/services/system/profile.service';
import { showErrorAlert, showSuccessAlert } from '../../../components/alerts/alerts';
import { upperCase, lowerCase, number, specialCharacter } from '../../../hooks/services/static/useRegularExplession';

export default function usePassword() {

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useUpdatePasswordUserService();

    // Validar cambios en contraseña
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError('La contraseña es requerida');
        } else {
            setPasswordError('');
        }
    };

    // Validar cambios en newPassword
    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);

        if (!value) {
            setNewPasswordError('La nueva contraseña es requerida');
        } else if (!upperCase.test(value)) {
            setNewPasswordError('Debe contener alguna letra mayúscula');
            return false;
        } else if (!lowerCase.test(value)) {
            setNewPasswordError('Debe contener alguna letra minúscula');
            return false;
        } else if (!number.test(value)) {
            setNewPasswordError('Debe contener algún número');
            return false;
        } else if (!specialCharacter.test(value)) {
            setNewPasswordError('Debe contener algún caracter especial');
            return false;
        } else if (value.length <= 8) {
            setNewPasswordError('La contraseña debe tener al menos 8 caracteres');
            return false;
        } else if (value.length > 255) {
            setNewPasswordError('La contraseña es muy larga');
            return false;
        } else {
            setNewPasswordError('');
        }
    };

    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setPasswordError('');
        setNewPasswordError('');
        let valid = true;

        if (!password) {
            setPasswordError('La contraseña es requerida');
            valid = false;
        }

        if (!newPassword) {
            setNewPasswordError('La nueva contraseña es requerida');
            valid = false;
        } else if (!upperCase.test(newPassword)) {
            setNewPasswordError('Debe contener alguna letra mayúscula');
            valid = false;
        } else if (!lowerCase.test(newPassword)) {
            setNewPasswordError('Debe contener alguna letra minúscula');
            valid = false;
        } else if (!number.test(newPassword)) {
            setNewPasswordError('Debe contener algún número');
            valid = false;
        } else if (!specialCharacter.test(newPassword)) {
            setNewPasswordError('Debe contener algún caracter especial');
            valid = false;
        } else if (newPassword.length <= 8) {
            setNewPasswordError('La contraseña debe tener al menos 8 caracteres');
            valid = false;
        } else if (newPassword.length > 255) {
            setNewPasswordError('La contraseña es muy larga');
            valid = false;
        }


        if (!valid) return;

        const formdata = {
            currentPassword: password,
            newPassword: newPassword,
        };

        // Llamar al servicio de autenticación
        const result = await content(formdata);
        if (result) {
            if (result.httpCode === 200) {

                showSuccessAlert('Contraseña actualizada');

            } else {
                showErrorAlert(result.message);
                return setErrorResponse(result.message);
            }
        }
    };

    return {
        password,
        newPassword,
        passwordError,
        newPasswordError,
        errorResponse,
        loading,
        error,
        handlePasswordChange,
        handleNewPasswordChange,
        handleSubmit,
    };
}
