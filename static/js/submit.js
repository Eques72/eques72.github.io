document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.subject.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });

const a = document.querySelector('.direct-contact-container');
const b = document.querySelector('.form-horizontal');

function equalizeHeights(a, b) {
  if (!a || !b) return;
  if (window.matchMedia('(max-width: 1300px)').matches) {
    a.style.height = '';
    b.style.height = '';
  } else {
    const maxHeight = Math.max(a.offsetHeight, b.offsetHeight);
    a.style.height = maxHeight + 'px';
    b.style.height = maxHeight + 'px';
  }
}

equalizeHeights(a,b);
window.addEventListener('resize', () => equalizeHeights(a, b));