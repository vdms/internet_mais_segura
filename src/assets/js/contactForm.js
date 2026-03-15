// =========================================
// CONTACT FORM FUNCTIONALITY
// =========================================

const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ID'; // Replace with actual FormSpree ID

export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', handleSubmit);
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

async function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const messageContainer = form.querySelector('.form-message') || createMessageContainer(form);
  
  // Validate all fields
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showMessage(messageContainer, 'Por favor, corrija os erros no formulário.', 'error');
    return;
  }
  
  // Disable submit button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="form-loading">A enviar...</span>';
  
  try {
    const formData = new FormData(form);
    
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      showMessage(messageContainer, 'Mensagem enviada com sucesso! Responderemos em breve.', 'success');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
    
  } catch (error) {
    console.error('Form submission error:', error);
    showMessage(messageContainer, 'Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';
  }
}

function validateField(field) {
  const errorElement = field.parentElement.querySelector('.form-error') || createErrorElement(field);
  let isValid = true;
  let errorMessage = '';
  
  // Required validation
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = 'Este campo é obrigatório.';
  }
  
  // Email validation
  if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Por favor, insira um email válido.';
    }
  }
  
  // Min length validation
  if (field.hasAttribute('minlength') && field.value.length > 0) {
    const minLength = parseInt(field.getAttribute('minlength'));
    if (field.value.length < minLength) {
      isValid = false;
      errorMessage = `Mínimo de ${minLength} caracteres.`;
    }
  }
  
  // Update UI
  if (isValid) {
    field.classList.remove('error');
    errorElement.textContent = '';
  } else {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
  }
  
  return isValid;
}

function createErrorElement(field) {
  const error = document.createElement('span');
  error.className = 'form-error';
  field.parentElement.appendChild(error);
  return error;
}

function createMessageContainer(form) {
  const container = document.createElement('div');
  container.className = 'form-message';
  form.insertBefore(container, form.firstChild);
  return container;
}

function showMessage(container, message, type) {
  container.className = `form-message ${type}`;
  container.textContent = message;
  container.style.display = 'block';
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      container.style.display = 'none';
    }, 5000);
  }
}

export { validateField, showMessage };
