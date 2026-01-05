# 📚 Sistema de Gestión de Clientes - Frontend React

> **Proyecto Educativo**: Aplicación frontend desarrollada con React + Vite para la gestión de clientes, diseñada como material didáctico para estudiantes de Desarrollo de Aplicaciones Web y Multiplataforma.

## 🎯 Objetivo Pedagógico

Este proyecto tiene como finalidad enseñar:

- **Arquitectura Cliente-Servidor**: Implementación de un frontend SPA (Single Page Application) que consume una API REST
- **Gestión de Estado en React**: Uso de hooks (`useState`, `useEffect`) para el manejo de datos
- **Enrutamiento SPA**: Navegación mediante React Router DOM
- **Comunicación con APIs**: Consumo de servicios REST con la Fetch API
- **Diseño Responsivo**: Interfaz adaptable usando React Bootstrap
- **Separación de Responsabilidades**: Organización modular del código (componentes, páginas, servicios)

---

## 🏗️ Arquitectura del Proyecto

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐    ┌──────────────┐               │
│  │   App.jsx    │───▶│ React Router │               │
│  │ (Principal)  │    │   (Rutas)    │               │
│  └──────────────┘    └──────┬───────┘               │
│                              │                      │
│         ┌────────────────────┼────────────────┐     │
│         │                    │                │     │
│    ┌────▼─────┐      ┌──────▼──────┐   ┌─────▼────┐ │
│    │ Clientes │      │   Cliente   │   │ Cliente  │ │
│    │   List   │      │    Nuevo    │   │  Editar  │ │
│    │  (Listar)│      │  (Crear)    │   │(Modificar) │
│    └────┬─────┘      └──────┬──────┘   └─────┬────┘ │
│         │                   │                │      │
│         └───────────────────┼────────────────┘      │
│                             │                       │
│                    ┌────────▼────────┐              │
│                    │ clientesService │              │
│                    │   (Capa de      │              │
│                    │    Servicios)   │              │
│                    └────────┬────────┘              │
│                             │                       │
└─────────────────────────────┼───────────────────────┘
                              │ HTTP/JSON
                              │
                    ┌─────────▼────────┐
                    │   API REST       │
                    │  (FastAPI)       │
                    │ Port: 8000       │
                    └──────────────────┘
```

### Patrón de Arquitectura

**Patrón Implementado**: Arquitectura en capas (Layered Architecture)

1. **Capa de Presentación** (`pages/` y `components/`)
   - Componentes React que renderizan la UI
   - Manejan la interacción del usuario
   
2. **Capa de Lógica de Negocio** (`services/`)
   - Gestiona la comunicación con la API
   - Maneja errores y transformación de datos
   
3. **Capa de Configuración** (`config.js`)
   - Centraliza constantes y configuración
   - Facilita el cambio de entornos (desarrollo/producción)

---

## 📁 Estructura del Proyecto

```
clientes_frontend_react/
│
├── public/                      # Recursos estáticos públicos
│
├── src/                         # Código fuente de la aplicación
│   │
│   ├── assets/                  # Recursos multimedia
│   │   ├── css/
│   │   │   └── style.css        # Estilos personalizados
│   │   └── img/                 # Imágenes y logos
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── AppNavbar.jsx        # Barra de navegación superior
│   │   ├── AppFooter.jsx        # Pie de página
│   │   └── ConfirmDeleteModal.jsx # Modal de confirmación
│   │
│   ├── pages/                   # Vistas/Páginas de la aplicación
│   │   ├── ClientesList.jsx     # Página: Listar clientes
│   │   ├── ClienteNuevo.jsx     # Página: Crear cliente
│   │   └── ClienteEditar.jsx    # Página: Editar cliente
│   │
│   ├── services/                # Capa de servicios (API)
│   │   └── clientesService.js   # Funciones para consumir API
│   │
│   ├── App.jsx                  # Componente raíz (configuración de rutas)
│   ├── main.jsx                 # Punto de entrada de la aplicación
│   └── config.js                # Configuración global (URL API)
│
├── index.html                   # HTML base de la SPA
├── package.json                 # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
└── README.md                    # Este archivo
```

---

## 🔧 Tecnologías Utilizadas

### Core

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 19.2.0 | Biblioteca para construir interfaces de usuario |
| **Vite** | 7.2.4 | Herramienta de desarrollo rápida y moderna |
| **React Router DOM** | 7.11.0 | Enrutamiento y navegación SPA |

### UI/Diseño

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Bootstrap** | 5.3.8 | Framework CSS para diseño responsivo |
| **React Bootstrap** | 2.10.10 | Componentes Bootstrap para React |
| **Bootstrap Icons** | 1.13.1 | Biblioteca de iconos |

### Herramientas de Desarrollo

- **ESLint**: Linter para mantener código limpio
- **SWC**: Compilador ultra-rápido para React

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **API Backend** ejecutándose en `http://127.0.0.1:8000`

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si usas Git
git clone <url-del-repositorio>
cd clientes_frontend_react
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias listadas en `package.json`.

### Paso 3: Configurar la URL de la API

Edita el archivo `src/config.js` si tu API está en otra dirección:

```javascript
export const API_URL = 'http://127.0.0.1:8000'  // Cambia según tu entorno
export const API_TIMEOUT = 5000
```

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 📋 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera build de producción en carpeta `/dist` |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para verificar calidad del código |

---

## 🧩 Componentes Principales

### 1. App.jsx - Componente Raíz

**Responsabilidad**: Configurar el enrutamiento de la aplicación.

```jsx
<BrowserRouter>
  <AppNavbar />
  <Routes>
    <Route path="/" element={<ClientesList />} />
    <Route path="/clientes/nuevo" element={<ClienteNuevo />} />
    <Route path="/clientes/editar/:id" element={<ClienteEditar />} />
  </Routes>
  <AppFooter />
</BrowserRouter>
```

**Conceptos clave**:
- `BrowserRouter`: Habilita navegación SPA
- `Routes` y `Route`: Define rutas y componentes asociados
- Parámetros dinámicos: `:id` en la ruta de edición

---

### 2. ClientesList.jsx - Lista de Clientes

**Responsabilidad**: Mostrar todos los clientes y permitir navegación a editar/eliminar.

**Hooks utilizados**:
```jsx
const [clientes, setClientes] = useState([])     // Lista de clientes
const [loading, setLoading] = useState(true)     // Estado de carga
const [error, setError] = useState(null)         // Manejo de errores
```

**Flujo de datos**:
1. `useEffect` carga datos al montar el componente
2. Llama a `getClientes()` del servicio
3. Actualiza estado con los datos recibidos
4. Renderiza tabla con la información

**Características**:
- ✅ Indicador de carga (Spinner)
- ✅ Manejo de errores
- ✅ Modal de confirmación para eliminar
- ✅ Navegación a crear/editar

---

### 3. ClienteNuevo.jsx - Crear Cliente

**Responsabilidad**: Formulario para agregar nuevos clientes.

**Estado del formulario**:
```jsx
const [formData, setFormData] = useState({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: ''
})
```

**Flujo de creación**:
1. Usuario completa formulario
2. `handleChange` actualiza estado en cada cambio
3. `handleSubmit` envía datos a `createCliente()`
4. Si éxito: redirige a lista principal
5. Si error: muestra mensajes de validación

**Validación**:
- Campos obligatorios: nombre, apellido, email
- Validación en frontend (HTML5) y backend (API)

---

### 4. ClienteEditar.jsx - Editar Cliente

**Responsabilidad**: Modificar datos de un cliente existente.

**Flujo de edición**:
1. Extrae `id` de la URL (`useParams`)
2. Carga datos actuales con `getClienteById(id)`
3. Rellena formulario con datos existentes
4. Usuario modifica campos
5. `handleSubmit` envía actualización con `updateCliente()`
6. Redirige a lista si es exitoso

**Diferencias con ClienteNuevo**:
- Requiere ID del cliente
- Pre-carga datos existentes
- Usa método PUT en lugar de POST

---

## 🔌 Capa de Servicios

### clientesService.js

**Propósito**: Centralizar todas las llamadas a la API REST.

**Ventajas de esta arquitectura**:
- ✅ Reutilización de código
- ✅ Fácil mantenimiento
- ✅ Manejo centralizado de errores
- ✅ Cambios en API solo requieren modificar este archivo

### Funciones Disponibles

#### `getClientes()`
Obtiene todos los clientes.

```javascript
const clientes = await getClientes()
// Retorna: Array de objetos cliente
```

#### `createCliente(data)`
Crea un nuevo cliente.

```javascript
const nuevoCliente = await createCliente({
  nombre: 'Juan',
  apellido: 'Pérez',
  email: 'juan@example.com',
  telefono: '123456789',
  direccion: 'Calle Falsa 123'
})
```

#### `getClienteById(id)`
Obtiene un cliente específico.

```javascript
const cliente = await getClienteById(5)
```

#### `updateCliente(id, data)`
Actualiza un cliente existente.

```javascript
await updateCliente(5, {
  nombre: 'Juan',
  apellido: 'García',
  email: 'juan.garcia@example.com'
})
```

#### `deleteCliente(id)`
Elimina un cliente.

```javascript
await deleteCliente(5)
```

### Manejo de Errores

El servicio maneja códigos HTTP específicos:

| Código | Significado | Acción |
|--------|-------------|--------|
| 200/201 | Éxito | Retorna datos |
| 404 | No encontrado | Lanza error específico |
| 409 | Conflicto (email duplicado) | Lanza error de duplicado |
| 422 | Validación fallida | Retorna detalles de validación |
| Otros | Error genérico | Lanza error general |

---

## 🎨 Diseño e Interfaz

### Bootstrap + React Bootstrap

La aplicación usa **React Bootstrap** para componentes estilizados:

- `Container`: Centra y delimita contenido
- `Table`: Tablas responsivas
- `Button`: Botones con variantes (primary, danger, warning)
- `Form`: Formularios con validación
- `Modal`: Ventanas emergentes
- `Spinner`: Indicadores de carga
- `Alert`: Mensajes de error/éxito

### Bootstrap Icons

Iconografía semántica en toda la aplicación:

- `bi-plus-lg`: Agregar
- `bi-pencil-square`: Editar
- `bi-trash`: Eliminar
- `bi-envelope`: Email
- `bi-telephone`: Teléfono
- `bi-geo-alt`: Dirección

---

## 🔄 Flujo de Datos

### Ejemplo: Eliminación de un Cliente

```
┌──────────────────┐
│ Usuario clickea  │
│  botón eliminar  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  abrirModal()    │ ← Muestra modal de confirmación
│  setShowModal()  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Usuario confirma │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ confirmarEliminacion()│
│ await deleteCliente() │ ← Llamada a API
└────────┬─────────────┘
         │
         ▼
┌────────────────────┐
│  setClientes()     │ ← Actualiza estado (remueve cliente)
│  cerrarModal()     │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│  React re-renderiza│ ← UI se actualiza automáticamente
│  sin cliente       │
└────────────────────┘
```

---

## 📡 Comunicación con la API

### Formato de Peticiones

Todas las peticiones usan:
- **Content-Type**: `application/json`
- **Método HTTP**: GET, POST, PUT, DELETE según operación

### Ejemplo de Petición POST

```javascript
fetch('http://127.0.0.1:8000/clientes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Ana',
    apellido: 'López',
    email: 'ana@example.com',
    telefono: null,
    direccion: null
  })
})
```

### Estructura de Respuesta

**Éxito (200/201)**:
```json
{
  "id": 1,
  "nombre": "Ana",
  "apellido": "López",
  "email": "ana@example.com",
  "telefono": null,
  "direccion": null
}
```

**Error de Validación (422)**:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## 🧪 Conceptos Clave para Estudiantes

### 1. **Single Page Application (SPA)**

La aplicación NO recarga la página completa al navegar. React Router cambia solo el contenido necesario.

**Ventajas**:
- ⚡ Navegación más rápida
- 💾 Mejor experiencia de usuario
- 🔄 Mantiene estado entre vistas

---

### 2. **Hooks de React**

#### `useState`
Permite agregar estado a componentes funcionales.

```jsx
const [clientes, setClientes] = useState([])
//     ↑ valor actual    ↑ función para actualizar
```

#### `useEffect`
Ejecuta efectos secundarios (llamadas API, suscripciones).

```jsx
useEffect(() => {
  // Se ejecuta al montar el componente
  cargarClientes()
}, [])  // ← Array vacío = solo ejecuta una vez
```

#### `useParams`
Extrae parámetros de la URL.

```jsx
// URL: /clientes/editar/5
const { id } = useParams()  // id = "5"
```

#### `useNavigate`
Navega programáticamente.

```jsx
const navigate = useNavigate()
navigate('/')  // Redirige a página principal
```

---

### 3. **Programación Asíncrona**

#### `async/await`
Sintaxis moderna para manejar promesas.

```jsx
async function cargarClientes() {
  try {
    const data = await getClientes()  // Espera respuesta
    setClientes(data)
  } catch (error) {
    setError(error.message)
  }
}
```

---

### 4. **Props y Comunicación entre Componentes**

```jsx
<ConfirmDeleteModal
  show={showModal}
  onHide={cerrarModal}
  onConfirm={confirmarEliminacion}
  cliente={clienteSeleccionado}
/>
```

El componente hijo recibe `props` y puede ejecutar funciones del padre mediante callbacks.

---

## 🐛 Solución de Problemas Comunes

### Error: "Failed to fetch"

**Causa**: El backend no está ejecutándose.

**Solución**:
```bash
# Inicia tu API FastAPI en otra terminal
cd <ruta-al-backend>
uvicorn main:app --reload
```

---

### Error: CORS

**Causa**: La API no permite peticiones desde el frontend.

**Solución**: Asegúrate que tu API FastAPI tenga CORS configurado:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### La aplicación no carga datos

1. Verifica que la API esté en `http://127.0.0.1:8000`
2. Abre la consola del navegador (F12) para ver errores
3. Verifica `src/config.js` tenga la URL correcta

---

## 📚 Recursos para Aprender Más

### Documentación Oficial

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

### Conceptos a Profundizar

1. **Estado y Props**: Fundamento de React
2. **Ciclo de vida**: Hooks `useEffect`
3. **Enrutamiento**: SPA routing
4. **Fetch API**: Comunicación HTTP
5. **Manejo de Formularios**: Controlled components
6. **Manejo de Errores**: try/catch, estados de error

---

## 🎓 Actividades Sugeridas para Estudiantes

### Nivel Básico

1. ✏️ Modifica los estilos en `style.css`
2. 🔍 Agrega un campo de búsqueda en `ClientesList`
3. 📊 Muestra un mensaje cuando no hay clientes

### Nivel Intermedio

4. 🎨 Crea un componente `ClienteCard` para mostrar clientes como tarjetas
5. ✅ Agrega validación en tiempo real en formularios
6. 📄 Implementa paginación en la lista de clientes

### Nivel Avanzado

7. 🔐 Agrega autenticación con JWT
8. 📱 Implementa modo oscuro/claro
9. 🌐 Agrega internacionalización (i18n)
10. 🧪 Escribe tests con Vitest

---

## 👨‍🏫 Notas para el Profesor

### Puntos de Enseñanza

1. **Arquitectura en Capas**: Explicar separación componentes/servicios
2. **Estado Compartido**: Discutir cuándo usar Context API
3. **Optimización**: Hablar sobre `useMemo`, `useCallback`
4. **Buenas Prácticas**: Nombrado de componentes, estructura de carpetas

### Debugging en Clase

- Usar React Developer Tools (extensión navegador)
- Mostrar Network tab para ver peticiones HTTP
- Enseñar a usar `console.log()` estratégicamente

---

## 📄 Licencia

Este proyecto es material educativo de uso libre para fines académicos.

---

## 👤 Autor

**JC - Instructor de Desarrollo Web y Multiplataforma**

Proyecto creado con fines pedagógicos para enseñar desarrollo frontend moderno con React.

---

## 🙏 Agradecimientos

- A la comunidad de React por la excelente documentación
- A los estudiantes que ayudan a mejorar este material con sus preguntas
- A los frameworks y bibliotecas open-source utilizadas

---

**¡Feliz Aprendizaje! 🚀**
