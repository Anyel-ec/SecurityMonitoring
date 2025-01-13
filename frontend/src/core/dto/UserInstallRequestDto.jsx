export const createUserInstallRequestDto = (usuario, password, passwordConfirm, numberPhone, email, name, lastname, company) => {
    return {
        usuario,
        password,
        passwordConfirm,
        numberPhone,
        email,
        name,
        lastname,
        company
    };
};
