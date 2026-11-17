(() => {
  'use strict';
  const scenes = [
    { id: 'title', beats: 1, name: 'Remy' },
    { id: 'sara', beats: 1, name: 'Meet Sara' },
    { id: 'passion', beats: 2, name: 'Her passion never disappeared.' },
    { id: 'barriers', beats: 6, name: 'Barriers to education' },
    { id: 'question', beats: 1, name: "Why should becoming a parent mean giving up on an education you're passionate about?" },
    { id: 'population', beats: 3, name: "Sara isn't alone." },
    { id: 'school', beats: 2, name: 'World-class culinary education' },
    { id: 'home', beats: 1, name: 'What if culinary school could come to your home?' },
    { id: 'reveal', beats: 2, name: 'Remy' },
    { id: 'pov', beats: 2, name: 'Through Remy glasses' },
    { id: 'demo', beats: 2, name: 'Interactive demo' },
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
  const panels = [...document.querySelectorAll('[data-scene-panel]')];
  const status = document.querySelector('#scene-status');
  const scriptPanel = document.querySelector('.script-panel');
  const scriptText = scriptPanel.querySelector('.script-text');
  const scriptSections = new Map(
    [...document.querySelector('#speaker-script').content.querySelectorAll('section')].map(section => [section.dataset.scene, section])
  );
  const demoClips = [...document.querySelectorAll('.demo-clip')];
  let position = 0;

  // Sound needs a user gesture; if the browser refuses, the clip still plays silently.
  function playClipFromStart(clip) {
    clip.currentTime = 0;
    clip.muted = false;
    clip.play().catch(error => {
      if (error.name !== 'NotAllowedError') return;
      clip.muted = true;
      clip.play().catch(() => {});
    });
  }

  function syncDemoClips(current, changed) {
    demoClips.forEach(clip => {
      const active = current.scene === 'demo' && Number(clip.dataset.clip) === current.beat;
      clip.classList.toggle('is-playing', active);
      if (!active) clip.pause();
      else if (changed) playClipFromStart(clip);
    });
  }

  function emptyScriptNote() {
    const note = document.createElement('p');
    note.className = 'script-empty';
    note.textContent = 'No script for this scene yet.';
    return note;
  }

  // The paragraph for the latest beat that has one stays current until the next cue.
  function cueBeat(paragraphs, beat) {
    return Math.max(0, ...paragraphs.map(paragraph => Number(paragraph.dataset.beat)).filter(cue => cue <= beat));
  }

  function renderScript(current) {
    const section = scriptSections.get(current.scene);
    const paragraphs = section ? [...section.querySelectorAll('p')].map(paragraph => paragraph.cloneNode(true)) : [];
    const cue = cueBeat(paragraphs, current.beat);
    paragraphs.forEach(paragraph => paragraph.classList.toggle('is-current', Number(paragraph.dataset.beat) === cue));
    scriptPanel.querySelector('.script-scene').textContent = scenes[current.sceneIndex].name;
    scriptPanel.querySelector('.script-speaker').textContent = section ? `${section.dataset.speaker} presents` : '';
    scriptText.replaceChildren(...(paragraphs.length ? paragraphs : [emptyScriptNote()]));
  }

  function toggleScript(open = !scriptPanel.classList.contains('is-open')) {
    scriptPanel.classList.toggle('is-open', open);
    scriptPanel.inert = !open;
  }

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

    next.setAttribute('aria-label', position === timeline.length - 1 ? 'Replay presentation' : 'Next narrative beat');
    previous.disabled = position === 0;

    if (changed && old.scene !== current.scene) {
      // Re-entering a scene always restores its initial visual conditions;
      // reversing never depends on an unfinished timeout or a running video.
      experience.dataset.previousScene = old.scene;
    }
    renderScript(current);
    syncDemoClips(current, changed);
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
  document.querySelector('.wordmark').addEventListener('click', event => {
    event.preventDefault(); goTo('title');
  });
  function toggleFullscreen() {
    const root = document.documentElement;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    }
  }

  scriptPanel.querySelector('.script-close').addEventListener('click', () => toggleScript(false));
  const keyActions = {
    ArrowRight: advance,
    PageDown: advance,
    ArrowLeft: reverse,
    PageUp: reverse,
    Home: () => render(0),
    End: () => render(timeline.length - 1),
    n: () => toggleScript(),
    N: () => toggleScript(),
    f: toggleFullscreen,
    F: toggleFullscreen,
    Escape: () => toggleScript(false)
  };
  function isTypingTarget(event) {
    return event.altKey || event.ctrlKey || event.metaKey || event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName);
  }
  document.addEventListener('keydown', event => {
    if (isTypingTarget(event)) return;
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault(); action();
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
