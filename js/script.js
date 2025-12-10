/* script.js — Versión robusta para contadores animados y fade-scroll */
console.log("SCRIPT CARGADO ✔️");
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log("TOP stats:", document.querySelector('#stats').getBoundingClientRect().top);
  console.log("Window height:", window.innerHeight);

  /* ---------- Fade scroll (tu código previo) ---------- */
  const elements = document.querySelectorAll('.fade-scroll');

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.8;
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('visible');
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // run on load


  /* ---------- Contadores animados (ahora dentro de DOMContentLoaded) ---------- */
  const counters = document.querySelectorAll('.counter');
  let statsStarted = false;

  console.log('[debug] contadores encontrados:', counters.length);

  function animateCounters() {
    if (statsStarted) return;
    statsStarted = true;
    console.log('[debug] Iniciando animación de contadores');

    counters.forEach(counter => {
      const rawTarget = counter.getAttribute('data-target');

      // Validaciones
      if (!rawTarget || isNaN(+rawTarget)) {
        console.warn('[warn] data-target inválido en counter:', counter, rawTarget);
        return;
      }

      const target = +rawTarget;
      const steps = 120; // más pasos = animación más suave
      const increment = Math.max(1, Math.floor(target / steps));
      const delay = 12; // ms entre pasos

      // Asegurar que el texto inicial es "0"
      counter.innerText = '0';

      const updateCount = () => {
        // eliminar separadores puntuales antes de parsear
        const current = +counter.innerText.toString().replace(/\./g, '').replace(/,/g, '');
        if (current < target) {
          const next = Math.min(target, current + increment);
          counter.innerText = next.toLocaleString('es-CL');
          setTimeout(updateCount, delay);
        } else {
          counter.innerText = target.toLocaleString('es-CL');
        }
      };

      updateCount();
    });
  }

  // Observador: si IntersectionObserver no existe, ejecuta la animación directamente
  const statsSection = document.querySelector('#stats');

  if (!statsSection) {
    console.warn('[warn] No se encontró #stats — asegúrate de que la sección exista en el HTML');
    // fallback: si no hay sección, intenta animar igual (por si hay counters dispersos)
    if (counters.length) animateCounters();
    return;
  }

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("[debug] Observer detectó #stats");
        animateCounters();
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(statsSection);

  // 🔥 si la sección ya está visible al cargar
  if (statsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
    console.log("[debug] #stats visible desde el inicio → forzando animación");
    animateCounters();
    observer.unobserve(statsSection);
  }

} else {
  console.log("[debug] IntersectionObserver no soportado → animación inmediata");
  animateCounters();
}

}
); // DOMContentLoaded end
