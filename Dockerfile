# Usamos una imagen de Node.js
FROM node:18-alpine AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos vite globalmente
RUN npm install -g vite

# Copiamos los archivos de dependencias
COPY package.json package-lock.json ./

# Instalamos TODAS las dependencias, incluidas las de desarrollo
RUN npm ci

# Copiamos el resto del proyecto
COPY . .

# Construimos la aplicación con vite
RUN npm run build

# Usamos una imagen ligera para el runtime
FROM nginx:alpine AS runtime

# Copiamos los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto
EXPOSE 80

# Ejecutamos Nginx
CMD ["nginx", "-g", "daemon off;"]

