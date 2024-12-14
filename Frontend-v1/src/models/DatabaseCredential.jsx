export const createDatabaseCredential = (
    id,
    host,
    port,
    username,
    password,
    systemParameter,
    comment,
    paramValue,
    createdAt,
    isActive
) => ({
    id,
    host,
    port,
    username,
    password,
    systemParameter,
    comment,
    paramValue,
    createdAt,
    isActive
});
