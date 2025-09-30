// Smooth scroll and active menu handling
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
      // Update active menu
      document.querySelectorAll('nav ul li a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Update active menu on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let currentSection = '';
  const scrollPos = window.pageYOffset + 80;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentSection = section.getAttribute('id');
    }
  });

  document.querySelectorAll('nav ul li a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

// Butterfly animation with pink & green
const butterflySVG = `
<svg viewBox="0 0 60 54" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g>
    <ellipse cx="15" cy="27" rx="14" ry="20" fill="#ffb8e1" stroke="#e75480" stroke-width="2"/>
    <ellipse cx="45" cy="27" rx="14" ry="20" fill="#b2f7ef" stroke="#3ddad7" stroke-width="2"/>
    <ellipse cx="30" cy="27" rx="8" ry="24" fill="#fff" opacity="0.9"/>
    <ellipse cx="30" cy="27" rx="6" ry="16" fill="#ffe1ec" opacity="0.7"/>
    <ellipse cx="30" cy="42" rx="4" ry="8" fill="#e75480" opacity="0.5"/>
    <circle cx="30" cy="27" r="5" fill="#e75480" />
    <rect x="28" y="18" width="4" height="18" rx="2" fill="#e75480" />
    <path d="M31 18 Q33 12 36 6" stroke="#e75480" stroke-width="2" fill="none"/>
    <path d="M29 18 Q27 12 24 6" stroke="#e75480" stroke-width="2" fill="none"/>
  </g>
</svg>
`;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnButterfly() {
  const container = document.querySelector('.butterfly-container');
  const butterfly = document.createElement('div');
  butterfly.classList.add('butterfly');
  butterfly.innerHTML = butterflySVG;

  let w = window.innerWidth;
  let h = window.innerHeight;

  // Random start position, prefer upper part
  const startTop = randomBetween(10, h * 0.6);
  const startLeft = randomBetween(-60, w - 60);

  butterfly.style.top = `${startTop}px`;
  butterfly.style.left = `${startLeft}px`;
  butterfly.style.transform = `scale(${randomBetween(0.7,1.1)})`;

  container.appendChild(butterfly);

  animateButterfly(butterfly, w, h);

  // Remove after 25s
  setTimeout(() => {
    butterfly.remove();
  }, 25000);
}

function animateButterfly(el, w, h) {
  let posX = parseFloat(el.style.left);
  let posY = parseFloat(el.style.top);
  let direction = Math.random() > 0.5 ? 1 : -1;
  let speed = randomBetween(0.6, 1.2);
  let sway = randomBetween(20, 80);

  function fly() {
    posX += direction * randomBetween(0.7, 1.6) * speed;
    posY += Math.sin(Date.now()/250 + posX/60) * 1.2 + Math.cos(Date.now()/300 + posY/50) * 0.9;

    // Sway up and down
    el.style.top = `${posY + Math.sin(Date.now()/600 + sway)}px`;
    el.style.left = `${posX}px`;

    // Flip if change direction
    if (Math.random() < 0.01) direction *= -1;

    // If out of screen, remove
    if (posX < -80 || posX > w + 80 || posY < -80 || posY > h + 80) {
      el.remove();
      return;
    }

    requestAnimationFrame(fly);
  }

  fly();
}

// Add flower background and butterfly container on page load
window.addEventListener('DOMContentLoaded', function(){
  if(!document.querySelector('.flower-bg')){
    const flowerBg = document.createElement('div');
    flowerBg.className = 'flower-bg';
    document.body.appendChild(flowerBg);
  }
  if(!document.querySelector('.butterfly-container')){
    const butterflyContainer = document.createElement('div');
    butterflyContainer.className = 'butterfly-container';
    document.body.appendChild(butterflyContainer);
  }
  // Initial butterflies
  for (let i = 0; i < 5; i++) {
    setTimeout(spawnButterfly, i * 1800 + randomBetween(0, 1200));
  }
  // Spawn more every few seconds
  setInterval(() => {
    if (document.hasFocus()) spawnButterfly();
  }, 3800);
});