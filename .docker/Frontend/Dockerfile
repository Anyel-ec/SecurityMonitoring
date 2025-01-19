# Imagen base para Nginx
FROM nginx:stable-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/share/nginx/html

# Copiar los archivos de producción (dist) generados localmente al contenedor
COPY Frontend/dist/ /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 8081

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]