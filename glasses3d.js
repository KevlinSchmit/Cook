/* Remy AR glasses: a procedural, continuously spinning 3D product model for the reveal scene.
   Glossy black acetate front with bevelled rims, clear lenses, nose pads, corner camera lenses,
   metal hinges and thick temples that drop into ear hooks. Uses the bundled three.js (r149). */
(() => {
  'use strict';
  const host = document.querySelector('.glasses-hero');
  if (!host || !window.THREE) return;
  const THREE = window.THREE;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch (error) {
    host.classList.add('no-webgl');            // the SVG fallback stays visible
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'glasses-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  host.classList.add('has-webgl');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1040 / 450, 1, 2000);
  camera.position.set(0, 52, 400);
  camera.lookAt(0, -4, -30);

  // Studio environment: soft boxes reflected in the gloss.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x070707);
  const panel = (w, h, intensity, x, y, z, ry = 0, rx = 0) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity), side: THREE.DoubleSide }));
    mesh.position.set(x, y, z); mesh.rotation.set(rx, ry, 0); studio.add(mesh);
  };
  panel(40, 5, 7, 0, 22, 0, 0, Math.PI / 2);          // long overhead strip
  panel(6, 22, 3.2, -24, 4, 6, Math.PI / 2.6);          // left softbox
  panel(6, 22, 2.4, 24, 4, -6, -Math.PI / 2.6);         // right softbox
  panel(60, 10, 0.25, 0, -18, 0, 0, -Math.PI / 2);      // warm floor bounce
  panel(30, 6, 0.9, 0, 6, -26);                       // back panel
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.02).texture;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7a66, 0.12));
  const key = new THREE.DirectionalLight(0xffffff, 0.55); key.position.set(-120, 220, 260); scene.add(key);
  const rim = new THREE.DirectionalLight(0xfff1dd, 0.7); rim.position.set(200, 80, -220); scene.add(rim);

  const acetate = new THREE.MeshPhysicalMaterial({
    color: 0x050505, roughness: 0.24, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.06,
    envMapIntensity: 1.25, reflectivity: 0.6
  });
  const metal = new THREE.MeshStandardMaterial({ color: 0x55565a, roughness: 0.28, metalness: 1, envMapIntensity: 1.1 });
  const lensGlass = new THREE.MeshPhysicalMaterial({
    color: 0xf3f6f5, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.1,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6, side: THREE.DoubleSide, depthWrite: false
  });
  const padMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2a2a2c, roughness: 0.25, transparent: true, opacity: 0.82, clearcoat: 1, envMapIntensity: 1
  });
  const cameraGlass = new THREE.MeshPhysicalMaterial({ color: 0x05070a, roughness: 0.05, clearcoat: 1, envMapIntensity: 2 });

  const glasses = new THREE.Group();
  scene.add(glasses);

  const curve = 0;                            // flat front: large faces cannot bend cleanly
  const bend = geometry => {
    const p = geometry.attributes.position;
    for (let i = 0; i < p.count; i += 1) p.setZ(i, p.getZ(i) - curve * p.getX(i) * p.getX(i));
    geometry.computeVertexNormals();
    return geometry;
  };
  const closed = (points, mirror = false) => {
    const pts = points.map(([x, y]) => new THREE.Vector2(mirror ? -x : x, y));
    if (mirror) pts.reverse();
    const shape = new THREE.Shape();
    shape.moveTo(pts[0].x, pts[0].y);
    shape.splineThru([...pts.slice(1), pts[0]]);
    return shape;
  };

  // Front silhouette: a soft, slightly upswept rectangular frame with a keyhole bridge.
  const outerRight = [[0, 21], [20, 22.5], [44, 23.5], [62, 22.5], [69.5, 18], [71, 9], [69.8, -4], [66.5, -16], [60, -21.5], [46, -24], [30, -23], [19, -19], [13.5, -11], [10, -2.5], [5.5, 2.5]];
  const outer = [...outerRight, [0, 4], ...outerRight.slice(1).reverse().map(([x, y]) => [-x, y])];
  const lens = [[14.5, 13.6], [28, 15.4], [46, 16], [60, 14.6], [63.6, 8.6], [63.2, -3], [60.2, -11.8], [53.5, -16.6], [40, -17.8], [26.5, -16.4], [18.5, -11.6], [15, -3.2]];
  const frontShape = closed(outer);
  frontShape.holes.push(closed(lens), closed(lens, true));
  const frontGeometry = new THREE.ExtrudeGeometry(frontShape, {
    depth: 4.2, bevelEnabled: true, bevelThickness: 1.7, bevelSize: 1.55, bevelSegments: 6, curveSegments: 72
  });
  frontGeometry.translate(0, 0, -2.1);
  const front = new THREE.Mesh(bend(frontGeometry), acetate);
  glasses.add(front);

  // Clear lenses seated inside the rims.
  [false, true].forEach(mirror => {
    const g = new THREE.ShapeGeometry(closed(lens, mirror), 64);
    g.translate(0, 0, 0.2);
    glasses.add(new THREE.Mesh(bend(g), lensGlass));
  });

  // Nose pads behind the bridge.
  [-1, 1].forEach(side => {
    const pad = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), padMaterial);
    pad.scale.set(2.6, 6.2, 1.4);
    pad.position.set(side * 10.8, -9, -6.2);
    pad.rotation.set(0.15, side * 0.45, side * -0.32);
    glasses.add(pad);
  });

  // Camera lens and capture LED at the upper outer corners.
  const zAt = x => 2.1 + 1.2 - curve * x * x;
  [[-1, 2.2], [1, 1.5]].forEach(([side, size]) => {
    const x = side * 66.6, y = 16.4;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(size, 0.42, 16, 48), metal);
    const lensDot = new THREE.Mesh(new THREE.CircleGeometry(size, 40), cameraGlass);
    [ring, lensDot].forEach(mesh => {
      mesh.position.set(x, y, zAt(x) + (mesh === ring ? 0.05 : 0));
      mesh.rotation.y = Math.atan(2 * curve * x);
      glasses.add(mesh);
    });
  });

  // Temples: thick acetate arms with a long taper and an ear hook.
  const templeProfile = closed([[0, 7.2], [40, 6.6], [90, 5.4], [118, 4.6], [134, 1], [146, -10], [152, -22], [149.5, -26.5], [144.5, -24], [138.5, -12], [128, -3.4], [104, -2.6], [60, -3.6], [16, -5.3], [0, -6.2]]);
  const templeGeometry = new THREE.ExtrudeGeometry(templeProfile, {
    depth: 3.4, bevelEnabled: true, bevelThickness: 1.1, bevelSize: 1.1, bevelSegments: 5, curveSegments: 80
  });
  templeGeometry.translate(0, 0, -1.7);
  templeGeometry.rotateY(Math.PI / 2);        // profile runs back along -z
  const hingeX = 68.6, hingeZ = -curve * hingeX * hingeX - 2.6;
  [-1, 1].forEach(side => {
    const arm = new THREE.Group();
    const temple = new THREE.Mesh(templeGeometry, acetate);
    temple.position.set(side * -0.4, 9.2, 0);
    arm.add(temple);
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6, 5), metal);
    hinge.position.set(side * -1.6, 9.6, 3.2);
    arm.add(hinge);
    arm.position.set(side * hingeX, 0, hingeZ);
    arm.rotation.y = side * 0.07;             // slight splay, as when worn
    glasses.add(arm);
  });

  // Centre the model on its own bounding box so it spins in place.
  const box = new THREE.Box3().setFromObject(glasses);
  const centre = box.getCenter(new THREE.Vector3());
  glasses.children.forEach(child => child.position.sub(centre));
  const pivot = new THREE.Group();
  pivot.add(glasses);
  pivot.rotation.x = 0.06;
  scene.add(pivot);

  const resize = () => {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const experience = document.querySelector('.experience');
  const turn = Math.PI * 2 / 9;               // one full revolution every nine seconds
  let angle = -0.6, last = performance.now();
  const frame = now => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (experience.dataset.scene === 'reveal') {
      if (experience.dataset.beat === '1') {
        // While the glasses travel to Sara's face, settle them front-facing.
        const target = Math.round(angle / (Math.PI * 2)) * Math.PI * 2;
        angle += (target - angle) * Math.min(1, dt * 4);
      } else {
        angle += turn * dt;
      }
      pivot.rotation.y = angle;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  window.COOK_GLASSES = { renderer, scene, camera, pivot };
})();
