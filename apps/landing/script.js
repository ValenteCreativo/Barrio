const form = document.querySelector('#waitlist-form');
const emailInput = document.querySelector('#email');
const message = document.querySelector('#form-message');
const endpoint = window.BARRIO_CONFIG?.waitlistEndpoint?.trim();

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  if (!emailInput.checkValidity() || !email) {
    message.textContent = 'Escribe un correo válido para continuar.';
    message.className = 'form-message error';
    emailInput.focus();
    return;
  }

  if (!endpoint) {
    message.textContent = 'La lista de espera todavía no está conectada. Tu correo no se guardó; configura un endpoint para habilitar el registro.';
    message.className = 'form-message error';
    return;
  }

  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'Enviando…';
  message.textContent = 'Estamos registrando tu correo…';
  message.className = 'form-message';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'landing-barrio' })
    });
    if (!response.ok) throw new Error('No se pudo completar el registro.');
    message.textContent = '¡Listo! Te avisaremos cuando BARRIO esté cerca de tu colonia.';
    message.className = 'form-message success';
    form.reset();
  } catch {
    message.textContent = 'No pudimos registrar tu correo ahora. Intenta de nuevo más tarde.';
    message.className = 'form-message error';
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Quiero entrar <span aria-hidden="true">→</span>';
  }
});
