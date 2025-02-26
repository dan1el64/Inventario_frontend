# Proyecto Angular - Gestión de Productos

Este proyecto es una aplicación Angular para la gestión de productos, permitiendo listar, agregar, modificar y eliminar productos mediante una API REST.

## 📌 Características
- Listado de productos
- Creación de nuevos productos
- Edición de productos existentes
- Eliminación de productos
- Diseño con Angular Material
- Manejo de estado con servicios

## 🚀 Instalación y configuración

### 🔧 Prerrequisitos
Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión recomendada: 18+)
- [Angular CLI](https://angular.io/cli) (versión recomendada: 16+)

### 📥 Instalación del proyecto
Clona el repositorio y navega dentro de la carpeta:

```sh
# Clonar el repositorio
git clone https://github.com/dan1el64/Inventario_frontend.git
```

Instala las dependencias:
```sh
npm install
```

### ▶️ Ejecución en desarrollo
Para iniciar la aplicación en modo desarrollo:
```sh
ng serve
```
La aplicación estará disponible en `http://localhost:4200/`.

## 📁 Estructura del proyecto
```
proyecto-angular/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── list/
│   │   │   │   ├── list.component.ts
│   │   │   │   ├── list.component.html
│   │   │   │   ├── list.component.spec.ts
│   │   │   ├── form/
│   │   │   │   ├── form.component.ts
│   │   │   │   ├── form.component.html
│   │   │   │   ├── form.component.spec.ts
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── product.service.spec.ts
│   │   ├── models/
│   │   │   ├── product.model.ts
│── angular.json
│── package.json
│── README.md
```

## 🧪 Pruebas unitarias
El proyecto incluye pruebas unitarias con **Jest** y **Angular Testing Library**.

Ejecuta las pruebas con:
```sh
ng test
```
Esto abrirá una ventana con los resultados de las pruebas en tiempo real.

## 📌 API Backend
El proyecto se conecta con una API REST alojada en `http://localhost:8080/api/v1/products`. Para cambiar la URL de la API, edita el archivo `environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1/products'
};
```

## 🔗 Tecnologías utilizadas
- Angular 16+
- Angular Material
- RxJS
- Jest para pruebas unitarias
- TypeScript

## 🌐 **Despliegue en AWS**
Para un despliegue en AWS, se recomienda:
- **Frontend**: AWS S3 + CloudFront.

## 📜 Licencia
Este proyecto está bajo la licencia MIT.

---

🚀 **¡Gracias por usar este proyecto!** 😊

