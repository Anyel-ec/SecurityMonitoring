export const createPrometheusExporterDto = (
    internalPortPostgres,
    externalPortPostgres,
    internalPortMariadb,
    externalPortMariadb,
    internalPortMongodb,
    externalPortMongodb
) => ({
    internalPortPostgres,
    externalPortPostgres,
    internalPortMariadb,
    externalPortMariadb,
    internalPortMongodb,
    externalPortMongodb,
});
