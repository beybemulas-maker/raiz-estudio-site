const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuButton.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));

const tracks = document.querySelectorAll('.track');
tracks.forEach(track => {
  const audio = track.querySelector('audio');
  const button = track.querySelector('.play');
  button.addEventListener('click', () => {
    tracks.forEach(other => {
      const otherAudio = other.querySelector('audio');
      if (other !== track) { otherAudio.pause(); other.classList.remove('playing'); other.querySelector('.play').textContent = '▶'; }
    });
    if (audio.paused) { audio.play(); track.classList.add('playing'); button.textContent = 'Ⅱ'; }
    else { audio.pause(); track.classList.remove('playing'); button.textContent = '▶'; }
  });
  audio.addEventListener('ended', () => { track.classList.remove('playing'); button.textContent = '▶'; });
});

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = `Olá, Raiz Estúdio! Sou ${form.get('nome')}. Tenho interesse em: ${form.get('servico')}. ${form.get('mensagem') || ''}`;
  const status = document.querySelector('.form-status');
  status.textContent = 'A abrir o WhatsApp…';
  window.open(`https://wa.me/244975912613?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  event.currentTarget.reset();
});
