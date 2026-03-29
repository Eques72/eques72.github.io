document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.subject.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
  });
