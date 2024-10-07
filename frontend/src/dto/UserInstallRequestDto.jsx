// UserInstallRequestDto.js

export const createUserInstallRequestDto = (usuario, password, numberPhone, email) => {
    return {
      usuario,
      password,
      numberPhone,
      email,
    };
  };
  