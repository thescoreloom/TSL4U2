
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  const categoryParam = urlParams.get('category');
  const messageParam = urlParams.get('message');
  const subjectParam = urlParams.get('subject');

  if (categoryParam && document.getElementById('category')) {
    document.getElementById('category').value = categoryParam;
  }
  if (messageParam && document.getElementById('message')) {
    document.getElementById('message').value = messageParam;
  }
  if (subjectParam && document.getElementById('subject')) {
    document.getElementById('subject').value = subjectParam;
  }

  // Pulsante Send dinamico
  const sendBtn = document.getElementById('SendBtn');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('email')?.value || '';
    const subject = document.getElementById('subject')?.value || '';
    const message = document.getElementById('message')?.value || '';
    const category = document.getElementById('category')?.value || 'tailored';

    // invio via mailto (puoi anche sostituire con submit AJAX)
    const url = `mailto:info@thescoreloom.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.location.href = url;
  });
});