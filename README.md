# 📁 Portafolio Next.js estático

Este repositorio contiene un proyecto de Next.js configurado para exportar un sitio completamente estático en la carpeta `static-app` y desplegarlo automáticamente en GitHub Pages mediante GitHub Actions.

---

## 📂 Estructura del proyecto

```
.
├── .github
│   └── workflows
│       └── static.yml        # Pipeline CI/CD para build y deploy
├── components/               # Componentes React
├── pages/ o app/             # Código fuente de Next.js
├── public/                   # Archivos estáticos (imágenes, fuentes…)
├── static-app/               # Salida estática tras el build
├── package.json              # Scripts y dependencias
└── next.config.mjs           # Configuración de Next.js
```

---

## ⚙️ Configuración de build

### `package.json`

Define el script de compilación:

```jsonc
{
  "scripts": {
    "build": "next build && next export",
    "start": "serve static-app" // opcional para pruebas locales
  }
}
```

- `npm run build`  
  1. Ejecuta `next build` (construye la app)  
  2. Ejecuta `next export` (genera la carpeta estática)

### `next.config.mjs`

Indica a Next.js que produzca una exportación estática en `static-app`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fuerza export estático en lugar de SSR/SSG dinámico
  output: 'export',
  // Carpeta donde Next.js volcará los archivos estáticos
  distDir: 'static-app',
  // No es necesario basePath ni assetPrefix para user-pages
};

export default nextConfig;
```

---

## 🚀 Ejecución local

1. Instala dependencias:  
   ```bash
   npm install
   ```
2. Genera la versión estática:  
   ```bash
   npm run build
   ```
3. Sirve localmente para verificar (opcional):  
   ```bash
   npm install -g serve
   serve static-app
   ```
   Abrir `http://localhost:3000`

---

## 🤖 CI/CD con GitHub Actions

El workflow `.github/workflows/static.yml` automatiza el despliegue:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ '{{ steps.deployment.outputs.page_url }}' }}
    runs-on: ubuntu-latest
    steps:
      # 1. Clonar el repositorio
      - uses: actions/checkout@v4

      # 2. Configurar Node.js
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      # 3. Instalar dependencias
      - run: npm ci

      # 4. Build y export estático en static-app/
      - run: npm run build

      # 5. Preparar GitHub Pages
      - uses: actions/configure-pages@v5

      # 6. Subir sólo static-app/ como artefacto
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 'static-app'

      # 7. Desplegar en GitHub Pages
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🌐 Publicación en GitHub Pages

- Para **user/organization pages** (repositorio `un4arch.github.io`), no necesitas configuración extra en la UI si usas `actions/deploy-pages@v4`.  
- Si lo hicieras manual, en **Settings → Pages** elegirías **Branch: main / Folder: /static-app**.

---

## 🤝 Contribuir

1. Crea un _fork_ o _branch_.  
2. Haz tus cambios.  
3. Abre un _pull request_.  

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.
