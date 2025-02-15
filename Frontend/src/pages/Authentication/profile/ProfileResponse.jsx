import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../hooks/contexts/global.context';
import { useProfileUserService, useUpdateProfileUserService } from '../../../hooks/services/system/Profile.service';
import { showErrorAlert, showSuccessAlert } from '../../../components/alerts/Alerts';
import { emailRegex, phoneRegex } from '../../../hooks/services/static/useRegularExplession';

export default function useProfile() {
    const { globalVariables, setGlobalVariables } = useGlobalContext();
    const { content: fetchProfile, loading: loadingProfile } = useProfileUserService();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [company, setCompany] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [companyError, setCompanyError] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

    const { content: updateProfile, loading: loadingUpdate } = useUpdateProfileUserService();

    // Cargar los datos del perfil al montar el componente
    useEffect(() => {
        const loadProfile = async () => {
            const result = await fetchProfile();
            if (result.success && result.result) {
                const { username, phone, email, name, lastname, company } = result.result;
                setUsername(username);
                setPhone(phone);
                setEmail(email);
                setName(name);
                setLastname(lastname);
                setCompany(company);

                // Actualizar el contexto global si es necesario
                setGlobalVariables((prev) => ({
                    ...prev,
                    username,
                    phone,
                    email,
                    name,
                    lastname,
                    company,
                }));
            } else {
                showErrorAlert(result.message || 'Error al cargar el perfil');
            }
        };

        loadProfile();
    }, [fetchProfile, setGlobalVariables]);

    // Manejo de cambios para cada campo
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(!e.target.value ? 'El usuario es requerido' : '');
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError(!value ? 'El teléfono es requerido' : !phoneRegex.test(value) ? 'El teléfono no es válido' : '');
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(!value ? 'El correo es requerido' : !emailRegex.test(value) ? 'El correo no es válido' : '');
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(!value ? 'El nombre es requerido' : value.length < 3 || value.length > 50 ? 'El nombre debe tener entre 3 y 50 caracteres' : '');
    };

    const handleLastnameChange = (e) => {
        const value = e.target.value;
        setLastname(value);
        setLastnameError(!value ? 'El apellido es requerido' : value.length < 3 || value.length > 50 ? 'El apellido debe tener entre 3 y 50 caracteres' : '');
    };

    const handleCompanyChange = (e) => {
        const value = e.target.value;
        setCompany(value);
        setCompanyError(!value ? 'La compañía es requerida' : value.length < 3 || value.length > 50 ? 'La compañía debe tener entre 3 y 50 caracteres' : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([username, phone, email, name, lastname, company].some((field) => !field)) return;

        const formdata = { username, phone, email, name, lastname, company };
        const result = await updateProfile(formdata);

        if (result.success) {
            setGlobalVariables((prev) => ({ ...prev, ...formdata }));
            showSuccessAlert('Perfil actualizado exitosamente');
        } else {
            showErrorAlert(result.message || 'Error al actualizar el perfil');
            setErrorResponse(result.message);
        }
    };

    return {
        username,
        phone,
        email,
        name,
        lastname,
        company,
        usernameError,
        phoneError,
        emailError,
        nameError,
        lastnameError,
        companyError,
        errorResponse,
        loading: loadingProfile || loadingUpdate,
        handleUsernameChange,
        handlePhoneChange,
        handleEmailChange,
        handleNameChange,
        handleLastnameChange,
        handleCompanyChange,
        handleSubmit,
    };
}
