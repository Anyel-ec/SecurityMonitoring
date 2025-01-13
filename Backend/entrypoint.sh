#!/bin/sh
set -e

# Nombre de la red
NETWORK_NAME="integraciones_security_monitoring_monitoring"

# Comprobar si la red ya existe, si no, crearla
if ! docker network inspect $NETWORK_NAME > /dev/null 2>&1; then
    echo "La red $NETWORK_NAME no existe. Creándola..."
    docker network create --driver bridge $NETWORK_NAME
fi

# Agregar el contenedor a la red si no está ya conectado
if ! docker network inspect $NETWORK_NAME | grep -q "$(hostname)"; then
    echo "Conectando el contenedor a la red $NETWORK_NAME"
    docker network connect $NETWORK_NAME "$(hostname)"
fi

# Ejecutar la aplicación Java
exec java -jar monitoring-1.0.0-RELEASE.jar
