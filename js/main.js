/* ============================================================
   Portafolio — John Riquelme Morales
   JavaScript vanilla, sin dependencias.
   ============================================================ */

/* ------------------------------------------------------------
   PROYECTOS
   Edita este arreglo para agregar tus proyectos reales.
   - Elimina las tarjetas con placeholder: true cuando tengas contenido real.
   - Deja github / demo en "" si no existen: el enlace no se mostrará.
   - image: ruta opcional, por ejemplo "assets/mi-proyecto.png".
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    placeholder: true,
    name: "[COMPLETAR] Nombre del proyecto 1",
    description: "[COMPLETAR] Describe qué problema resuelve, qué hiciste tú y qué aprendiste.",
    tech: ["[Tecnología]", "[Tecnología]"],
    image: "",
    github: "",
    demo: ""
  },
  {
    placeholder: true,
    name: "[COMPLETAR] Nombre del proyecto 2",
    description: "[COMPLETAR] Ejemplo de estructura. Esta tarjeta no representa un trabajo real.",
    tech: ["[Tecnología]", "[Tecnología]"],
    image: "",
    github: "",
    demo: ""
  }
];

/* ------------------------------------------------------------ */

document.documentElement.classList.remove("no-js");

// Año del pie de página
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Render de proyectos ---------- */
function isSafeUrl(url) {
  try {
    const u = new URL(url, window.location.href);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch (e) {
    return false;
  }
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.textContent = "";

  PROJECTS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card project reveal" + (p.placeholder ? " is-placeholder" : "");

    const media = document.createElement("div");
    media.className = "project-media";
    if (p.image) {
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = "Captura del proyecto " + p.name;
      img.loading = "lazy";
      media.appendChild(img);
    } else {
      media.textContent = "{ imagen opcional }";
      media.setAttribute("aria-hidden", "true");
    }
    card.appendChild(media);

    const body = document.createElement("div");
    body.className = "project-body";

    if (p.placeholder) {
      const flag = document.createElement("span");
      flag.className = "project-flag";
      flag.textContent = "Contenido pendiente de completar";
      body.appendChild(flag);
    }

    const h3 = document.createElement("h3");
    h3.textContent = p.name;
    body.appendChild(h3);

    const desc = document.createElement("p");
    desc.textContent = p.description;
    body.appendChild(desc);

    if (p.tech && p.tech.length) {
      const tags = document.createElement("ul");
      tags.className = "tags";
      p.tech.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        tags.appendChild(li);
      });
      body.appendChild(tags);
    }

    const links = document.createElement("div");
    links.className = "project-links";
    [["GitHub", p.github], ["Demo", p.demo]].forEach(([label, url]) => {
      if (url && isSafeUrl(url)) {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = label;
        links.appendChild(a);
      }
    });
    if (links.children.length) body.appendChild(links);

    card.appendChild(body);
    grid.appendChild(card);
  });
}
renderProjects();

/* ---------- Menú responsive ---------- */
const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}
if (toggle && menu) {
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) setMenu(false); });
}

/* ---------- Cabecera al hacer scroll ---------- */
const header = document.querySelector(".site-header");
function onScroll() {
  if (header) header.classList.toggle("scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Animaciones al hacer scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---------- Enlace activo según la sección visible ---------- */
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']:not(.nav-cta)");
const sections = [...navLinks]
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          const active = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("active", active);
          if (active) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Aviso en consola de marcadores sin completar ---------- */
const pendingLinks = document.querySelectorAll("[data-placeholder]");
if (pendingLinks.length) {
  console.warn("Portafolio: hay " + pendingLinks.length + " enlace(s) con marcador [TU-...] por completar. Revisa el README.");
}
