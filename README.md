# Portafolio web — John Riquelme Morales

Sitio estático (HTML5 + CSS3 + JavaScript vanilla), sin compilación ni dependencias de pago, listo para GitHub Pages.

## Estructura

```
portafolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── CV-John-Riquelme.pdf   ← TÚ lo agregas
│   └── og-image.png           ← TÚ lo agregas (opcional, 1200×630)
└── README.md
```

## 1. Personalizar tus datos

Busca en todo el proyecto los marcadores `TU-USUARIO`, `TU-CORREO` y `[COMPLETAR]` (en VS Code: `Ctrl+Shift+F`).

| Qué | Dónde | Qué hacer |
|---|---|---|
| Usuario de GitHub | `index.html` (4 lugares: `canonical`, `og:url`, `og:image`, botón GitHub) | Reemplaza `TU-USUARIO` por tu usuario |
| Correo | `index.html`, sección Contacto | Reemplaza `TU-CORREO@ejemplo.com` |
| CV | `assets/CV-John-Riquelme.pdf` | Copia tu CV con exactamente ese nombre (o cambia el `href` del botón) |
| Certificaciones | `index.html`, sección Formación | Reemplaza cada `[verificar estado]` por "Completado", "En curso" o el enlace de verificación real |
| Proyectos | `js/main.js`, arreglo `PROJECTS` | Borra las tarjetas de ejemplo y agrega las tuyas |
| Imagen al compartir | `assets/og-image.png` | Imagen de 1200×630 px (opcional pero recomendada) |

> Si tu repositorio se llama `TU-USUARIO.github.io`, la URL será `https://TU-USUARIO.github.io/`. Si usas otro nombre (por ejemplo `portafolio`), la URL será `https://TU-USUARIO.github.io/portafolio/` y debes ajustar `canonical`, `og:url` y `og:image`.

### Agregar un proyecto

En `js/main.js`:

```js
{
  name: "Nombre real del proyecto",
  description: "Qué hace, qué hiciste tú y qué aprendiste.",
  tech: ["Java", "Spring Boot", "PostgreSQL"],
  image: "assets/mi-proyecto.png",   // opcional
  github: "https://github.com/tu-usuario/tu-repo",
  demo: ""                            // déjalo vacío si no existe
}
```

Solo agrega proyectos que existan. Los enlaces vacíos no se muestran.

## 2. Probar en tu computador

Abre `index.html` con doble clic, o mejor, con un servidor local:

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```

## 3. Subir el proyecto a GitHub

1. Crea una cuenta en https://github.com si aún no tienes.
2. Crea un repositorio nuevo: **New repository**, nombre `TU-USUARIO.github.io` (o `portafolio`), visibilidad **Public**. No marques "Add a README".
3. En la carpeta del proyecto, abre una terminal y ejecuta:

```bash
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

(También puedes usar **Add file → Upload files** en la web de GitHub y arrastrar todo el contenido de la carpeta, respetando `css/`, `js/` y `assets/`.)

## 4. Activar GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. Branch: `main`, carpeta `/ (root)`, y pulsa **Save**.
4. Espera 1–3 minutos y recarga. Aparecerá la URL de tu sitio.

## 5. Lista de comprobación antes de enviar a reclutadores

**Contenido**
- [ ] No queda ningún `TU-USUARIO`, `TU-CORREO` ni `[COMPLETAR]` visible (busca en el código y revisa el sitio publicado).
- [ ] Las tarjetas de ejemplo de proyectos fueron eliminadas o reemplazadas por proyectos reales.
- [ ] Cada certificación tiene su estado real (completada o en curso).
- [ ] Fechas y cargos coinciden con tu LinkedIn y tu CV.
- [ ] No aparece información confidencial de empleadores (nombres de clientes, sistemas internos, datos).
- [ ] No hay afirmaciones sobre tecnologías que no puedas explicar en una entrevista.

**Enlaces y archivos**
- [ ] LinkedIn, GitHub y correo abren correctamente.
- [ ] El botón "Descargar CV" descarga tu PDF actualizado.
- [ ] Los enlaces de proyectos (GitHub / demo) funcionan.
- [ ] Existe `assets/og-image.png` y la vista previa se ve bien al compartir el enlace (puedes probar con el Sharing Debugger de Facebook o pegándolo en LinkedIn).

**Calidad técnica**
- [ ] Se ve bien en celular, tablet y escritorio (usa las herramientas de desarrollador del navegador).
- [ ] El menú móvil abre, cierra y navega a cada sección.
- [ ] Lighthouse (pestaña en Chrome DevTools) con buen puntaje en Rendimiento, Accesibilidad y SEO.
- [ ] Navegación solo con teclado (Tab) funciona y el foco se ve.
- [ ] Sin errores en la consola del navegador.

**Presentación**
- [ ] La URL del portafolio está en tu LinkedIn y en tu CV.
- [ ] Pediste a alguien más que lo revise (ortografía y claridad).

## Notas de diseño

- Modo oscuro con azul eléctrico y cian; sin barras de porcentaje de habilidades.
- Respeta `prefers-reduced-motion`: sin animaciones para quienes las desactivan.
- Enlaces externos con `rel="noopener noreferrer"`.
- La única dependencia externa es la fuente de Google Fonts (Inter y JetBrains Mono); si quieres cero dependencias, elimina las líneas `<link>` de fuentes en `index.html` y se usarán las fuentes del sistema.
