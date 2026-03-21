const elements = document.querySelectorAll('.fade-in');

const observer_fade = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

elements.forEach(el => observer_fade.observe(el));