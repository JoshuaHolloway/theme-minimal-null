// Two-way data-binding with vanilla JS
const form = { email: '' };

const onChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  form[name] = value;
  email_input.setAttribute('value', form.email);
  console.log('form: ', form, '  event.target: ', event.target);
};

const email_input = document.querySelector('#modal__email-input');
email_input.addEventListener('input', onChange);