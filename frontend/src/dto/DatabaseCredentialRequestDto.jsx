export const createDatabaseCredentialRequestDto = (
    host,
    port,
    username,
    password,
    systemParameter,
    comment
) => ({
    host,
    port,
    username,
    password,
    systemParameter,
    comment,
});
