(() => {
  'use strict';
  const experience = document.querySelector('.experience');
  const profile = document.querySelector('.profile');
  const next = document.querySelector('.next-scene');
  const motion = document.querySelector('.motion-control');
  const dots = [...document.querySelectorAll('.scene-dot')];
  const status = document.querySelector('#scene-status');
  let scene = 'title';

  function showScene(target) {
    if (!['title', 'sara'].includes(target) || scene === target) return;
    scene = target;
    const isSara = scene === 'sara';
    experience.dataset.scene = scene;
    profile.setAttribute('aria-hidden', String(!isSara));
    profile.inert = !isSara;
    document.querySelector('.chapter-number').textContent = isSara ? '02' : '01';
    document.querySelector('.chapter-name').textContent = isSara ? 'The heart of our story' : 'A new recipe for learning';
    document.querySelector('.next-label').textContent = isSara ? 'Back to the beginning' : 'Meet Sara';
    next.setAttribute('aria-label', isSara ? 'Replay from the title scene' : 'Continue to Meet Sara');
    dots.forEach(dot => {
      const active = dot.dataset.go === scene;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    status.textContent = isSara
      ? 'Scene 2 of 2. Meet Sara. 29 years old. New mother. Passionate about cooking. Wants healthier meals at home. Busy with work, childcare, and household responsibilities.'
      : 'Scene 1 of 2. COOK. Augmented Reality Culinary Education at Home.';
  }

  next.addEventListener('click', () => showScene(scene === 'title' ? 'sara' : 'title'));
  dots.forEach(dot => dot.addEventListener('click', () => showScene(dot.dataset.go)));
  document.querySelector('.wordmark').addEventListener('click', event => {
    event.preventDefault();
    showScene('title');
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault(); showScene('sara');
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp' || event.key === 'Home') {
      event.preventDefault(); showScene('title');
    } else if (event.code === 'Space' && !event.target.closest('button,a')) {
      event.preventDefault(); showScene(scene === 'title' ? 'sara' : 'title');
    }
  });
  motion.addEventListener('click', () => {
    const paused = experience.classList.toggle('motion-paused');
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Resume ambient animation' : 'Pause ambient animation');
    motion.querySelector('span').textContent = paused ? 'Resume motion' : 'Pause motion';
  });
})();
