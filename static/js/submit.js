function showTooltip(message, type) {
    const tooltip = document.getElementById('form-tooltip');
    tooltip.textContent = message;
    tooltip.className = `tooltip visible ${type}`;
    setTimeout(() => tooltip.className = 'tooltip', 5000);
}

emailjs.init('lqui25lcE43YDRMSp');

window.onload = function() {
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit');
    btn.disabled = true;
    
    const templateMessage = {
      name: e.target.elements.email.value.slice(0, e.target.elements.email.value.indexOf('@')),
      email: e.target.elements.email.value,
      title: e.target.elements.subject.value,
      message: e.target.elements.message.value,
    }

    emailjs.send('service_5cwfx0t', 'template_hlhc6xk', templateMessage)
      .then(() => {
        showTooltip('Message sent.', 'success');
        e.target.reset();
      })
      .catch(() => {
          showTooltip('Failed to send.', 'error');
      })
      .finally(() => {
          btn.disabled = false;
      });
    });
}
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