const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

const tracks = document.querySelectorAll('.track');

tracks.forEach((track) => {
  const audio = track.querySelector('audio');
  const button = track.querySelector('.play');

  if (!audio || !button) return;

  button.addEventListener('click', () => {
    tracks.forEach((otherTrack) => {
      const otherAudio = otherTrack.querySelector('audio');
      const otherButton = otherTrack.querySelector('.play');

      if (otherTrack !== track && otherAudio && otherButton) {
        otherAudio.pause();
        otherTrack.classList.remove('playing');
        otherButton.textContent = '▶';
      }
    });

    if (audio.paused) {
      audio.play();
      track.classList.add('playing');
      button.textContent = 'Ⅱ';
    } else {
      audio.pause();
      track.classList.remove('playing');
      button.textContent = '▶';
    }
  });

  audio.addEventListener('ended', () => {
    track.classList.remove('playing');
    button.textContent = '▶';
  });
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const message = `Olá, Raiz Estúdio! Sou ${form.get('nome')}. Tenho interesse em: ${form.get('servico')}. ${form.get('mensagem') || ''}`;
    const status = document.querySelector('.form-status');

    if (status) {
      status.textContent = 'A abrir o WhatsApp…';
    }

    window.open(`https://wa.me/244975912613?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    event.currentTarget.reset();
  });
}
