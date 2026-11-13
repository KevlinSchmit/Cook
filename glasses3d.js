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
  panel(52, 26, 0.16, 0, 2, 26);                      // broad front fill: grey sheen on the face
  panel(46, 2.6, 6, 0, 13, 23);                       // crisp strip: highlight along the brow bevel
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
    color: 0xf3f6f5, roughness: 0.03, metalness: 0, transparent: true, opacity: 0.05,
    clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.6, side: THREE.DoubleSide, depthWrite: false
  });
  const padMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2a2a2c, roughness: 0.25, transparent: true, opacity: 0.82, clearcoat: 1, envMapIntensity: 1
  });
  const cameraGlass = new THREE.MeshPhysicalMaterial({ color: 0x05070a, roughness: 0.05, clearcoat: 1, envMapIntensity: 2 });

  const glasses = new THREE.Group();
  scene.add(glasses);

  const closed = (points, mirror = false) => {
    const pts = points.map(([x, y]) => new THREE.Vector2(mirror ? -x : x, y));
    if (mirror) pts.reverse();
    const shape = new THREE.Shape();
    shape.moveTo(pts[0].x, pts[0].y);
    shape.splineThru([...pts.slice(1), pts[0]]);
    return shape;
  };
  // Outlines traced from the straight-on product photo (pixels), converted to millimetres:
  // 1160 px across the frame = 142 mm, centred on the bridge.
  const MM = 142 / 1160, CX = 815, CY = 520;
  const mm = list => list.map(([x, y]) => [(x - CX) * MM, (CY - y) * MM]);

  // Rounded polygon: each vertex [x, y, radius] becomes a tangent quadratic fillet, which keeps
  // every rim edge continuous and polished (no spline overshoot at corners).
  const roundPoly = (verts, mirror = false) => {
    let v = verts.map(([x, y, r]) => [(mirror ? -(x - CX) : x - CX) * MM, (CY - y) * MM, r * MM]);
    if (mirror) v = v.reverse();
    const n = v.length, shape = new THREE.Shape();
    const towards = (p, q, d) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [p[0] + dx / l * d, p[1] + dy / l * d]; };
    const corner = i => {
      const p = v[i], a = v[(i - 1 + n) % n], b = v[(i + 1) % n];
      const d = Math.min(p[2], Math.hypot(a[0] - p[0], a[1] - p[1]) / 2, Math.hypot(b[0] - p[0], b[1] - p[1]) / 2);
      return [towards(p, a, d), p, towards(p, b, d)];
    };
    const first = corner(0);
    shape.moveTo(first[2][0], first[2][1]);
    for (let i = 1; i <= n; i += 1) {
      const [enter, ctrl, exit] = corner(i % n);
      shape.lineTo(enter[0], enter[1]);
      shape.quadraticCurveTo(ctrl[0], ctrl[1], exit[0], exit[1]);
    }
    return shape;
  };

  // Front, traced from the straight-on photo: wide brow dipping slightly at the bridge, end
  // pieces that flare out for the camera, outer edges sweeping in to soft lower corners, and a
  // keyhole nose opening whose inner rims widen towards the cheeks.
  const half = [[815, 386, 70], [950, 350, 220], [1372, 350, 30], [1397, 386, 14], [1395, 452, 26], [1364, 522, 70], [1351, 689, 70], [902, 698, 60], [859, 500, 40]];
  const outerVerts = [...half, [815, 466, 42], ...half.slice(1).reverse().map(([x, y, r]) => [2 * CX - x, y, r])];
  const lensVerts = [[904, 412, 56], [1110, 398, 900], [1318, 406, 60], [1304, 666, 118], [930, 664, 104]];
  const frontShape = roundPoly(outerVerts);
  frontShape.holes.push(roundPoly(lensVerts), roundPoly(lensVerts, true));
  const frontGeometry = new THREE.ExtrudeGeometry(frontShape, {
    depth: 4.0, bevelEnabled: true, bevelThickness: 2.4, bevelSize: 2.3, bevelSegments: 10, curveSegments: 14
  });
  frontGeometry.translate(0, 0, -2.0);
  glasses.add(new THREE.Mesh(frontGeometry, acetate));
  const frontZ = 2.0 + 2.4;                     // polished front face
  const backZ = -2.0 - 2.4;

  // Lenses: thin clear glass seated mid-rim; only reflections give them away.
  [false, true].forEach(mirror => {
    const pane = new THREE.Mesh(new THREE.ShapeGeometry(roundPoly(lensVerts, mirror), 12), lensGlass);
    pane.position.z = 0;
    glasses.add(pane);
  });

  // Integrated acetate nose pads that slope back from the inner rims.
  const padShape = closed([[0, 4.4], [2.2, 3.4], [2.7, -1.5], [1.9, -5.8], [0, -7], [-1.2, -4.6], [-1.4, 0.6], [-0.8, 3.6]]);
  const padGeometry = new THREE.ExtrudeGeometry(padShape, { depth: 2.2, bevelEnabled: true, bevelThickness: 0.9, bevelSize: 0.8, bevelSegments: 5, curveSegments: 8 });
  [-1, 1].forEach(side => {
    const pad = new THREE.Mesh(padGeometry, acetate);
    pad.position.set(side * 8.9, -3.5, backZ - 1.4);
    pad.rotation.set(-0.12, side * -0.55, side * 0.08);
    pad.scale.x = side;
    glasses.add(pad);
  });

  // Camera (left) and capture LED (right): recessed rings in the end pieces.
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x2a2b2e, roughness: 0.3, metalness: 1, envMapIntensity: 1.2 });
  [[-1, 2.15], [1, 1.75]].forEach(([side, r]) => {
    const x = side * (1362 - CX) * MM, y = (CY - 420) * MM;
    const bezel = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.55, r + 0.75, 0.8, 48), darkMetal);
    bezel.rotation.x = Math.PI / 2; bezel.position.set(x, y, frontZ + 0.1);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.9, 48), cameraGlass);
    glass.rotation.x = Math.PI / 2; glass.position.set(x, y, frontZ + 0.25);
    const iris = new THREE.Mesh(new THREE.CircleGeometry(r * 0.42, 32), new THREE.MeshPhysicalMaterial({ color: 0x1b2230, roughness: 0.05, clearcoat: 1, envMapIntensity: 2.5 }));
    iris.position.set(x, y, frontZ + 0.72);
    glasses.add(bezel, glass, iris);
  });

  // Temples traced from the three-quarter view: tall at the hinge, a long taper with a
  // softly scooped lower edge, then a rounded drop into the ear tip.
  const templeProfile = closed([[0, 7.6], [30, 7.1], [70, 5.9], [104, 4.8], [120, 3.6], [131, 0.4], [139, -6], [146, -15], [150, -22], [149, -26.4], [145.2, -27.4], [141.4, -24.2], [136.5, -14], [129.4, -6.2], [119, -2], [100, -1.2], [78, -2.4], [54, -4.4], [30, -6.4], [10, -7.3], [0, -7.4]]);
  const templeGeometry = new THREE.ExtrudeGeometry(templeProfile, {
    depth: 3.6, bevelEnabled: true, bevelThickness: 1.2, bevelSize: 1.1, bevelSegments: 7, curveSegments: 8
  });
  templeGeometry.translate(0, 0, -1.8);
  templeGeometry.rotateY(Math.PI / 2);          // profile runs back along -z
  const endX = (1394 - CX) * MM;                // outer edge of the end pieces
  const templeY = (CY - 400) * MM;
  [-1, 1].forEach(side => {
    const arm = new THREE.Group();
    arm.add(new THREE.Mesh(templeGeometry, acetate));
    // Hinge housing: the end piece wraps back to meet the temple.
    const housingShape = closed([[0, 8.4], [5, 8.6], [8.6, 7], [9, -6.6], [5, -8], [0, -8]]);
    const housing = new THREE.Mesh(new THREE.ExtrudeGeometry(housingShape, { depth: 4.2, bevelEnabled: true, bevelThickness: 0.9, bevelSize: 0.9, bevelSegments: 6, curveSegments: 8 }), acetate);
    housing.geometry.translate(0, 0, -2.1); housing.geometry.rotateY(Math.PI / 2);
    housing.position.set(0, 0, 3.2);
    arm.add(housing);
    // Parting line where the housing meets the temple, plus a silver hinge glint inside.
    const seam = new THREE.Mesh(new THREE.BoxGeometry(6.4, 13.4, 0.35), new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.6 }));
    seam.position.set(0, -0.2, -6.2);
    arm.add(seam);
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 7, 24), metal);
    hinge.position.set(side * -2.9, 0, 2.6);
    arm.add(hinge);
    // Speaker slot on the inner face, above the ear.
    const slot = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 7, 6, 16), new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.8 }));
    slot.rotation.x = Math.PI / 2;
    slot.position.set(side * -2.96, 1.6, -96);
    arm.add(slot);
    if (side === 1) {
      // Capture button along the top of the right temple.
      const button = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 6, 6, 16), darkMetal);
      button.rotation.x = Math.PI / 2;
      button.position.set(0, 7.75, -16);
      arm.add(button);
    }
    arm.position.set(side * (endX - 3), templeY, backZ - 1.4);
    arm.rotation.y = side * 0.055;              // slight splay, as when worn
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

  // holdAngle (radians) pins the turntable for deterministic screenshots; null resumes spinning.
  const api = window.COOK_GLASSES = { renderer, scene, camera, pivot, holdAngle: null };
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
      pivot.rotation.y = Number.isFinite(api.holdAngle) ? api.holdAngle : angle;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

})();
