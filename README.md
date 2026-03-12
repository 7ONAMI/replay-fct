# 🎬 RePlay

> Instructions in Spanish and English

---

## Español

### ¿Qué es RePlay?

RePlay es una aplicación web para explorar películas y series usando la API de The Movie Database (TMDB). Puedes buscar contenido, ver los más populares, mejor valorados y estrenos, y si creas una cuenta, guardar tus favoritos, crear una watchlist y escribir reseñas con puntuación.

### ✨ Funcionalidades

- 🔍 Búsqueda en tiempo real de películas y series
- 🎥 Listados de populares, mejor valorados y estrenos
- 📄 Página de detalle con sinopsis, reparto, director y plataformas
- 🔐 Registro e inicio de sesión con email y contraseña
- ❤️ Guardar películas y series como favoritos
- 📌 Lista "Quiero Ver" (watchlist)
- ⭐ Escribir reseñas con puntuación del 1 al 5
- 👤 Perfil de usuario con todas tus listas
- 📱 Diseño responsive para móvil y escritorio

### 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | Framework de UI |
| Vite | Bundler y entorno de desarrollo |
| Tailwind CSS | Estilos |
| React Router v6 | Navegación |
| Firebase Auth | Autenticación de usuarios |
| Firebase Firestore | Base de datos en la nube |
| TMDB API | Datos de películas y series |
| React Icons | Iconografía |
| React Infinite Scroll | Scroll infinito en búsquedas |

### 🚀 Instalación y uso

#### Requisitos previos
- Node.js 18+
- Cuenta en [Firebase](https://firebase.google.com)
- API Key de [TMDB](https://www.themoviedb.org/settings/api)

#### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/7ONAMI/replay-fct.git
cd replay-fct
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Crea el archivo `.env`** en la raíz del proyecto:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. **Configura Firebase**
   - Activa **Authentication** → Email/Contraseña
   - Crea una base de datos **Firestore** en modo producción
   - Añade estas reglas en Firestore → Reglas:
   
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. **Arranca el proyecto**
```bash
npm run dev
```

---

## English

### What is RePlay?

RePlay is a web application to explore movies and TV shows using The Movie Database (TMDB) API. You can search for content, browse popular titles, top rated and upcoming releases, and if you create an account, save your favorites, build a watchlist and write reviews with ratings.

### ✨ Features

- 🔍 Real-time search for movies and TV shows
- 🎥 Popular, top rated and upcoming listings
- 📄 Detail page with synopsis, cast, director and streaming platforms
- 🔐 Register and login with email and password
- ❤️ Save movies and series as favorites
- 📌 "Want to Watch" list (watchlist)
- ⭐ Write reviews with a 1 to 5 star rating
- 👤 User profile with all your lists
- 📱 Responsive design for mobile and desktop

### 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Bundler & dev environment |
| Tailwind CSS | Styling |
| React Router v6 | Navigation |
| Firebase Auth | User authentication |
| Firebase Firestore | Cloud database |
| TMDB API | Movie & series data |
| React Icons | Icons |
| React Infinite Scroll | Infinite scroll on search |

### 🚀 Installation & Setup

#### Prerequisites
- Node.js 18+
- [Firebase](https://firebase.google.com) account
- [TMDB](https://www.themoviedb.org/settings/api) API Key

#### Steps

1. **Clone the repository**
```bash
git clone https://github.com/7ONAMI/replay-fct.git
cd replay-fct
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** in the project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Set up Firebase**
   - Enable **Authentication** → Email/Password
   - Create a **Firestore** database in production mode
   - Add these rules under Firestore → Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. **Start the project**
```bash
npm run dev
```


