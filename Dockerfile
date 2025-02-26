# Usamos Node como base para construir la app
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Usamos nginx para servir la app
FROM nginx:alpine
COPY --from=build /app/dist/inventory-app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
