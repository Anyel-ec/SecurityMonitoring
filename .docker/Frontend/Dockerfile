# Imagen base para Node.js
FROM node:20.14.0 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json del frontend al contenedor
COPY Frontend/package*.json ./ 

# Copiar el archivo .env (asegúrate de que esté en Frontend)
COPY Frontend/.env ./ 

# Instalar las dependencias
RUN npm install

# Copiar todo el código del frontend al contenedor
COPY Frontend ./ 

# Construir la aplicación para producción
RUN npm run build

# Imagen base para servir la aplicación (usamos Nginx)
FROM nginx:stable-alpine

# Copiar los archivos construidos (dist) al servidor web Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]