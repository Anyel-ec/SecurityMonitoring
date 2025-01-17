import { useState } from 'react';
import { useGlobalContext } from '../../../hooks/contexts/global.context';
import { useUpdateProfileUserService } from '../../../hooks/services/system/profile.service';
import { showErrorAlert, showSuccessAlert } from '../../../components/alerts/alerts';
import { emailRegex, phoneRegex } from '../../../hooks/services/static/useRegularExplession';

export default function useProfile() {
    const { globalVariables, setGlobalVariables } = useGlobalContext();

    const [username, setUsername] = useState(`${globalVariables.username}`);
    const [usernameError, setUsernameError] = useState('');
    const [phone, setPhone] = useState(`${globalVariables.phone}`);
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState(`${globalVariables.email}`);
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState(`${globalVariables.name}`);
    const [nameError, setNameError] = useState('');
    const [lastname, setLastname] = useState(`${globalVariables.lastname}`);
    const [lastnameError, setLastnameError] = useState('');
    const [company, setCompany] = useState(`${globalVariables.company}`);
    const [companyError, setCompanyError] = useState('');

    const [errorResponse, setErrorResponse] = useState('');
    const { content, loading, error } = useUpdateProfileUserService();

    // Validar cambios en username
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
            setPhoneError('El teléfono es requerido');
        } else if (!phoneRegex.test(value)) {
            setPhoneError('El teléfono no es válido');
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

    // Validar cambios en name
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (!value) {
            setNameError('El nombre es requerido');
        } else if (value.length < 3 || value.length > 50) {
            setNameError('El nombre debe tener entre 3 y 50 caracteres');
        } else {
            setNameError('');
        }
    };

    // Validar cambios en lastname
    const handleLastnameChange = (e) => {
        const value = e.target.value;
        setLastname(value);

        if (!value) {
            setLastnameError('El apellido es requerido');
        } else if (value.length < 3 || value.length > 50) {
            setLastnameError('El apellido debe tener entre 3 y 50 caracteres');
        } else {
            setLastnameError('');
        }
    };

    // Validar cambios en company
    const handleCompanyChange = (e) => {
        const value = e.target.value;
        setCompany(value);

        if (!value) {
            setCompanyError('La compañía es requerida');
        } else if (value.length < 3 || value.length > 50) {
            setCompanyError('La compañía debe tener entre 3 y 50 caracteres');
        } else {
            setCompanyError('');
        }
    };

    // Validar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPhoneError('');
        setEmailError('');
        setNameError('');
        setLastnameError('');
        setCompanyError('');

        let valid = true;

        if (!username) {
            setUsernameError('El usuario es requerido');
            valid = false;
        }

        if (!phone) {
            setPhoneError('El teléfono es requerido');
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError('El teléfono no es válido');
            valid = false;
        }

        if (!email) {
            setEmailError('El correo es requerido');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('El correo no es válido');
            valid = false;
        }

        if (!name) {
            setNameError('El nombre es requerido');
            valid = false;
        } else if (name.length < 3 || name.length > 50) {
            setNameError('El nombre debe tener entre 3 y 50 caracteres');
            valid = false;
        }

        if (!lastname) {
            setLastnameError('El apellido es requerido');
            valid = false;
        } else if (lastname.length < 3 || lastname.length > 50) {
            setLastnameError('El apellido debe tener entre 3 y 50 caracteres');
            valid = false;
        }

        if (!company) {
            setCompanyError('La compañía es requerida');
            valid = false;
        } else if (company.length < 3 || company.length > 50) {
            setCompanyError('La compañía debe tener entre 3 y 50 caracteres');
            valid = false;
        }

        if (!valid) return;

        const formdata = {
            username,
            phone,
            email,
            name,
            lastname,
            company,
        };

        const result = await content(formdata);
        if (result) {
            if (result.httpCode === 200) {
                setGlobalVariables((prev) => ({
                    ...prev,
                    username: formdata.username,
                    phone: formdata.phone,
                    email: formdata.email,
                    name: formdata.name,
                    lastname: formdata.lastname,
                    company: formdata.company,
                }));
                showSuccessAlert('Guardado exitoso');
            } else {
                showErrorAlert(result.message);
                setErrorResponse(result.message);
            }
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
        loading,
        error,
        handleUsernameChange,
        handlePhoneChange,
        handleEmailChange,
        handleNameChange,
        handleLastnameChange,
        handleCompanyChange,
        handleSubmit,
    };
}
