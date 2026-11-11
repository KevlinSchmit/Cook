(() => {
  'use strict';
  const scenes = [
    { id: 'title', beats: 1, name: 'COOK' },
    { id: 'sara', beats: 1, name: 'Meet Sara' },
    { id: 'passion', beats: 2, name: 'Her passion never disappeared.' },
    { id: 'barriers', beats: 6, name: 'Barriers to education' },
    { id: 'question', beats: 1, name: "Why should becoming a parent mean giving up on an education you're passionate about?" },
    { id: 'population', beats: 3, name: "Sara isn't alone." },
    { id: 'school', beats: 2, name: 'World-class culinary education' },
    { id: 'home', beats: 1, name: 'What if culinary school could come to your home?' },
    { id: 'reveal', beats: 2, name: 'COOK' },
    { id: 'pov', beats: 3, name: 'Through COOK glasses' },
    { id: 'demo', beats: 1, name: 'Interactive demo' },
    { id: 'limitations', beats: 2, name: 'Evaluate with your own senses' },
    { id: 'return', beats: 3, name: 'Remember Sara?' },
    { id: 'closing', beats: 3, name: 'Education should fit your life.' }
  ];
  const timeline = scenes.flatMap((scene, sceneIndex) =>
    Array.from({ length: scene.beats }, (_, beat) => ({ scene: scene.id, sceneIndex, beat }))
  );
  const experience = document.querySelector('.experience');
  const profile = document.querySelector('.profile');
  const next = document.querySelector('.next-scene');
  const previous = document.querySelector('.previous-scene');
  const motion = document.querySelector('.motion-control');
  const dots = [...document.querySelectorAll('.scene-dot')];
  const panels = [...document.querySelectorAll('[data-scene-panel]')];
  const status = document.querySelector('#scene-status');
  let position = 0;

  // A single persistent document and kitchen; arrows change narrative beats,
  // including the ingredient scan, human evaluation, and final brand sequence.
  function render(nextPosition, announce = true) {
    const bounded = Math.max(0, Math.min(timeline.length - 1, nextPosition));
    const old = timeline[position];
    const current = timeline[bounded];
    const changed = bounded !== position;
    const direction = bounded >= position ? 'forward' : 'backward';
    position = bounded;
    experience.dataset.scene = current.scene;
    experience.dataset.beat = String(current.beat);
    experience.dataset.direction = direction;
    experience.classList.toggle('film-active', current.sceneIndex >= 2);
    experience.classList.toggle('at-end', position === timeline.length - 1);
    experience.style.setProperty('--story-progress', String((position + 1) / timeline.length));
    experience.style.setProperty('--scene-progress', String((current.beat + 1) / scenes[current.sceneIndex].beats));
    const intro = document.querySelector('.intro');
    intro.setAttribute('aria-hidden', String(current.sceneIndex >= 2));
    intro.inert = current.sceneIndex >= 2;
    profile.setAttribute('aria-hidden', String(current.scene !== 'sara'));
    profile.inert = current.scene !== 'sara';
    document.querySelector('.sara').classList.toggle('wearing-ar', current.scene === 'reveal' && current.beat === 1);

    panels.forEach(panel => {
      const active = panel.dataset.scenePanel === current.scene;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
      panel.inert = !active;
      panel.querySelectorAll('[data-reveal]').forEach(element => {
        const revealed = active && Number(element.dataset.reveal) <= current.beat;
        element.classList.toggle('is-revealed', revealed);
        element.setAttribute('aria-hidden', String(!revealed));
      });
    });

    document.querySelector('.next-label').textContent = current.scene === 'title' ? 'Meet Sara' : '';
    next.setAttribute('aria-label', position === timeline.length - 1 ? 'Replay presentation' : 'Next narrative beat');
    previous.disabled = position === 0;
    dots.forEach(dot => {
      const active = dot.dataset.go === current.scene;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
      if (active) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });

    if (changed && old.scene !== current.scene) {
      // Re-entering a scene always restores its initial visual conditions;
      // reversing never depends on an unfinished timeout or a running video.
      experience.dataset.previousScene = old.scene;
    }
    if (announce) {
      status.textContent = `Scene ${current.sceneIndex + 1} of ${scenes.length}. ${scenes[current.sceneIndex].name}. Narrative beat ${current.beat + 1} of ${scenes[current.sceneIndex].beats}.`;
    }
  }

  function goTo(sceneId, beat = 0) {
    const scene = scenes.find(item => item.id === sceneId);
    if (!scene) return false;
    const safeBeat = Math.max(0, Math.min(scene.beats - 1, Number.isFinite(Number(beat)) ? Math.trunc(Number(beat)) : 0));
    const target = timeline.findIndex(item => item.scene === sceneId && item.beat === safeBeat);
    render(target);
    return true;
  }
  function advance() { render(position + 1); }
  function reverse() { render(position - 1); }

  next.addEventListener('click', () => position === timeline.length - 1 ? render(0) : advance());
  previous.addEventListener('click', reverse);
  dots.forEach(dot => dot.addEventListener('click', () => goTo(dot.dataset.go)));
  document.querySelector('.wordmark').addEventListener('click', event => {
    event.preventDefault(); goTo('title');
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault(); advance();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault(); reverse();
    } else if (event.key === 'Home') {
      event.preventDefault(); render(0);
    } else if (event.key === 'End') {
      event.preventDefault(); render(timeline.length - 1);
    } else if (event.code === 'Space' && !event.target.closest('button,a')) {
      event.preventDefault(); advance();
    }
  });
  motion.addEventListener('click', () => {
    const paused = experience.classList.toggle('motion-paused');
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Resume ambient animation' : 'Pause ambient animation');
    motion.querySelector('span').textContent = paused ? 'Resume motion' : 'Pause motion';
  });
  document.querySelectorAll('.taste-rating').forEach(rating => {
    rating.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      const score = Number(button.dataset.score);
      rating.querySelectorAll('button').forEach(other => {
        other.setAttribute('aria-pressed', String(other === button));
        other.classList.toggle('is-filled', Number(other.dataset.score) <= score);
      });
      rating.closest('.sense-panel').querySelector('.score-announcement').textContent = `${rating.getAttribute('aria-label')}: ${score} of 5.`;
    }));
  });
  document.querySelectorAll('.stat-garden svg').forEach((leaf, index) => leaf.style.setProperty('--order', String(index % 10)));

  // A small deterministic API supports presentation integrations and browser QA.
  window.COOK = Object.freeze({
    goTo, next: advance, previous: reverse,
    getState: () => ({ ...timeline[position], beatIndex: position, totalBeats: timeline.length })
  });
  render(0, false);
})();
