function showTooltip(message, type, id) {
    const tooltip = document.getElementById(id);
    tooltip.textContent = message;
    tooltip.className = `tooltip visible ${type}`;
    setTimeout(() => tooltip.className = 'tooltip', 5000);
}

function handleEmailFrom(form_id, button_id, tooltip_id, emailjs)
{
  window.onload = function() {
    document.querySelector(form_id).addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("1");
      const btn = document.getElementById(button_id)
      console.log("2");
      const templateMessage = {
        name: e.target.elements.email.value.slice(0, e.target.elements.email.value.indexOf('@')),
        email: e.target.elements.email.value,
        title: e.target.elements.subject.value,
        message: e.target.elements.message.value,
      }
      emailjs.send('service_5cwfx0t', 'template_hlhc6xk', templateMessage)
        .then(() => {
          showTooltip('Message sent.', 'success', tooltip_id);
          e.target.reset();
        })
        .catch(() => {
            showTooltip('Failed to send.', 'error', tooltip_id);
        })
        .finally(() => {
            btn.disabled = false;
        });
    });
  }
}

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

emailjs.init('lqui25lcE43YDRMSp');
handleEmailFrom('#contact-form', 'contact-submit', 'form-tooltip-c', emailjs);
handleEmailFrom('#resume-form', 'resume-submit', 'form-tooltip-r', emailjs);

const a = document.querySelector('.direct-contact-container');
const b = document.querySelector('.form-horizontal');

equalizeHeights(a,b);
window.addEventListener('resize', () => equalizeHeights(a, b));

const modal = document.getElementById('modal');

document.getElementById('open-modal').addEventListener('click', () => {
    modal.classList.add('active');
});
document.getElementById('open-modal-bottom').addEventListener('click', () => {
    modal.classList.add('active');
});

document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
});