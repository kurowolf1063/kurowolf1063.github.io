// Scroll reveal for elements with .fade-scroll
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-scroll');

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.8;

    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // run on load
});
