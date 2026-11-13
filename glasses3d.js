/* Reference-built, open-temple camera glasses for slide 9. All dimensions are millimetres.
   The front follows the supplied straight-on photograph; the swept temples and hardware
   follow its three-quarter and rear views. No remote assets or interaction are required. */
(() => {
  'use strict';
  const host = document.querySelector('.glasses-hero');
  if (!host || !window.THREE) return;
  const THREE = window.THREE;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch (error) {
    host.classList.add('no-webgl');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'glasses-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  host.classList.add('has-webgl');

  const scene = new THREE.Scene();
  // A long-lens product view keeps the rims and open arms in proportion throughout the turn.
  const camera = new THREE.PerspectiveCamera(22, 1040 / 450, 1, 2000);
  camera.zoom = 1.9;
  camera.position.set(0, 84, 560);
  camera.lookAt(0, 0, 0);

  // Large photographic softboxes give the black acetate broad, restrained reflections.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x171717);
  const panel = (w, h, power, x, y, z, ry = 0, rx = 0) => {
    const light = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(power, power, power), side: THREE.DoubleSide }));
    light.position.set(x, y, z);
    light.rotation.set(rx, ry, 0);
    studio.add(light);
  };
  panel(36, 24, 0.25, -18, 15, 26, 0.35, -0.25);
  panel(50, 5, 4, 0, 24, 1, 0, Math.PI / 2);
  panel(10, 30, 1.8, 25, 6, 0, -Math.PI / 2);
  panel(8, 24, 2, -25, 3, -8, Math.PI / 2);
  panel(34, 15, 0.8, 0, 8, -28);
  panel(44, 30, 0.24, 0, -22, 0, 0, Math.PI / 2);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.035);
  scene.environment = environment.texture;
  studio.traverse(object => {
    if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); }
  });
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb2a998, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(-140, 230, 300);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.45);
  fill.position.set(180, 65, -200);
  scene.add(fill);

  const acetate = new THREE.MeshPhysicalMaterial({
    color: 0x080808, roughness: 0.19, metalness: 0, clearcoat: 1,
    clearcoatRoughness: 0.12, envMapIntensity: 0.65, reflectivity: 0.5
  });
  const seamMaterial = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.5 });
  const hingeMetal = new THREE.MeshStandardMaterial({ color: 0x626365, metalness: 0.85, roughness: 0.3 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x111213, metalness: 0.25, roughness: 0.3, envMapIntensity: 0.4 });
  const opticalGlass = new THREE.MeshPhysicalMaterial({ color: 0x020303, roughness: 0.08, clearcoat: 1, envMapIntensity: 0.25 });
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe7eceb, roughness: 0.045, metalness: 0, transparent: true, opacity: 0.075,
    clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 0.8,
    side: THREE.DoubleSide, depthWrite: false
  });

  const model = new THREE.Group();
  model.name = 'reference-glasses';
  const add = (parent, geometry, material, name) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  };

  // Cubic contours in the 1600 × 942 frontal reference. The photographed width is 1164 px.
  // Unlike rounded rectangles, these preserve the arched brow, flared end pieces,
  // full lower cheeks, sloping nasal rims, and the shallow, flat-topped nose opening.
  const MM = 142 / 1164, CX = 814, CY = 520;
  const frontHalf = [
    ['M', 814, 399],
    ['C', 855, 399, 875, 394, 905, 380],
    ['C', 957, 351, 1007, 346, 1118, 346],
    ['C', 1225, 346, 1300, 353, 1376, 375],
    ['C', 1390, 378, 1395, 383, 1395, 397],
    ['L', 1394, 438],
    ['C', 1394, 455, 1386, 460, 1372, 465],
    ['C', 1352, 472, 1343, 501, 1332, 536],
    ['C', 1315, 591, 1301, 642, 1272, 670],
    ['C', 1247, 695, 1188, 695, 1105, 696],
    ['C', 1033, 696, 981, 693, 953, 679],
    ['C', 923, 663, 909, 615, 895, 570],
    ['C', 881, 526, 862, 493, 862, 477],
    ['C', 862, 460, 848, 458, 814, 458]
  ];
  const lensOutline = [
    ['M', 1115, 378],
    ['C', 1201, 378, 1261, 380, 1287, 403],
    ['C', 1309, 422, 1307, 457, 1303, 490],
    ['C', 1298, 538, 1286, 592, 1263, 632],
    ['C', 1243, 667, 1197, 671, 1110, 673],
    ['C', 1041, 675, 990, 672, 964, 658],
    ['C', 938, 644, 922, 596, 912, 550],
    ['C', 903, 508, 897, 474, 901, 448],
    ['C', 906, 411, 937, 392, 978, 384],
    ['C', 1011, 378, 1070, 378, 1115, 378]
  ];
  const trace = (commands, mirror = false, target = new THREE.Shape(), skipMove = false) => {
    commands.forEach(([op, ...coords], index) => {
      const values = coords.map((v, i) => i % 2 ? (CY - v) * MM : (mirror ? CX - v : v - CX) * MM);
      if (op === 'M') { if (!skipMove || index) target.moveTo(...values); }
      else if (op === 'L') target.lineTo(...values);
      else target.bezierCurveTo(...values);
    });
    return target;
  };
  const reverse = commands => {
    const segments = commands.slice(1).map((command, i) => ({ command, start: commands[i].slice(-2) }));
    return [['M', ...commands.at(-1).slice(-2)], ...segments.reverse().map(({ command, start }) =>
      command[0] === 'C' ? ['C', ...command.slice(3, 5), ...command.slice(1, 3), ...start] : ['L', ...start])];
  };
  const front = trace(frontHalf);
  trace(reverse(frontHalf), true, front, true);
  front.closePath();
  front.holes.push(trace(lensOutline), trace(lensOutline, true));
  const bend = x => -3.4 * (x / 71) ** 2;
  const frontGeometry = new THREE.ExtrudeGeometry(front, {
    depth: 3.9, bevelEnabled: true, bevelThickness: 0.85, bevelSize: 0.5,
    bevelSegments: 8, curveSegments: 28, steps: 1
  });
  const points = frontGeometry.attributes.position;
  const normals = frontGeometry.attributes.normal;
  const normal = new THREE.Vector3();
  for (let i = 0; i < points.count; i++) {
    const x = points.getX(i);
    points.setZ(i, points.getZ(i) - 1.95 + bend(x));
    // Transform the original bevel normals analytically: averaging cap triangles
    // after bending would leave visible diagonal facets across the polished front.
    const slope = -6.8 * x / (71 * 71);
    normal.set(normals.getX(i) - slope * normals.getZ(i), normals.getY(i), normals.getZ(i)).normalize();
    normals.setXYZ(i, normal.x, normal.y, normal.z);
  }
  add(model, frontGeometry, acetate, 'continuous-bowed-acetate-front');

  // Clear, gently convex lenses sit inside, rather than on top of, the rim.
  [false, true].forEach(mirror => {
    const lens = new THREE.ShapeGeometry(trace(lensOutline, mirror), 28);
    const positions = lens.attributes.position;
    const centreX = (mirror ? -1 : 1) * 36;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i);
      const sag = Math.max(0, 1 - ((x - centreX) / 25) ** 2 - (y / 20) ** 2) * 0.65;
      positions.setZ(i, bend(x) + 0.25 + sag);
    }
    lens.computeVertexNormals();
    add(model, lens, lensMaterial, mirror ? 'left-clear-lens' : 'right-clear-lens');
  });

  const shapeFrom = commands => {
    const shape = new THREE.Shape();
    commands.forEach(([op, ...v]) => {
      if (op === 'M') shape.moveTo(...v);
      else if (op === 'L') shape.lineTo(...v);
      else shape.bezierCurveTo(...v);
    });
    shape.closePath();
    return shape;
  };
  const moulded = (shape, depth, radius = 0.45) => new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: true, bevelSize: radius, bevelThickness: radius,
    bevelSegments: 6, curveSegments: 18
  });
  const noseSupport = shapeFrom([
    ['M', 7.0, 5.2], ['C', 8.5, 5.3, 10.2, 1.7, 11.2, -2.1],
    ['C', 12.0, -5.0, 12.0, -7.2, 10.9, -7.6],
    ['C', 9.7, -7.8, 8.8, -5.1, 8.0, -2.5], ['C', 7.0, 0, 6.1, 4.5, 7.0, 5.2]
  ]);
  [-1, 1].forEach(side => {
    const geometry = moulded(noseSupport, 2.7, 0.85);
    geometry.translate(0, 0, -5.6);
    const support = add(model, geometry, acetate, `integrated-nose-support-${side}`);
    support.scale.x = side; // Object mirroring preserves outward face winding in WebGL.
  });

  // The two flush circular optical modules have matching diameters, concentric black
  // bezels, a recessed glass centre, and a small photographic reflection, not bright dots.
  [-1, 1].forEach(side => {
    const x = side * (1353 - CX) * MM, y = (CY - 423) * MM;
    const optical = new THREE.Group();
    optical.name = side < 0 ? 'camera-module' : 'indicator-module';
    optical.position.set(x, y, 2.8 + bend(x));
    optical.rotation.y = side * 0.09;
    add(optical, new THREE.CircleGeometry(2.27, 64), seamMaterial, 'recess').position.z = 0.045;
    const bezel = add(optical, new THREE.TorusGeometry(1.93, 0.18, 10, 64), darkMetal, 'flush-optical-bezel');
    bezel.position.z = 0.12;
    const lens = add(optical, new THREE.CircleGeometry(1.72, 64), opticalGlass, 'optical-window');
    lens.position.z = 0.09;
    const pupil = add(optical, new THREE.CircleGeometry(1.07, 48), opticalGlass, 'dark-inner-optic');
    pupil.position.z = 0.11;
    pupil.scale.y = 0.92;
    const reflection = new THREE.MeshBasicMaterial({ color: 0x74818b, transparent: true, opacity: 0.13, depthWrite: false });
    const glint = add(optical, new THREE.CircleGeometry(1.5, 48, 0.5, 1.4), reflection, 'subtle-optical-reflection');
    glint.position.z = 0.14;
    glint.scale.y = 0.5;
    model.add(optical);
  });

  // Sweep rounded rectangular sections through a curved 3D spine. This captures both
  // the wide electronic housings in side view and the splay / inward ear bend in rear view.
  // Each section is [distance from hinge, half-width position, top, bottom, thickness].
  const templeSections = [
    [0, 67.1, 18.1, 7.5, 5.1], [5, 67.8, 18.4, 7.1, 5.5],
    [15, 69.2, 18.5, 5.4, 5.8], [30, 70.8, 18.2, 3.7, 5.9],
    [48, 72.0, 17.4, 3.3, 5.7], [66, 72.3, 16.1, 4.1, 5.3],
    [82, 71.7, 14.5, 5.5, 4.8], [91, 70.1, 12.3, 5.1, 4.3],
    [100, 67.8, 7.4, -0.1, 3.9], [109, 65.4, 0.6, -8.4, 3.6],
    [117, 63.8, -5.6, -14.4, 3.5], [123, 63.3, -10.0, -17.1, 3.5],
    [126.5, 63.3, -12.5, -17.0, 3.1], [128.3, 63.4, -14.4, -16.7, 2.2],
    [129, 63.5, -15.7, -15.9, 0.2]
  ];
  const sectionCurve = new THREE.CatmullRomCurve3(templeSections.map(([s, x, top]) => new THREE.Vector3(s, x, top)), false, 'centripetal');
  const lowerCurve = new THREE.CatmullRomCurve3(templeSections.map(([s, , , bottom, width]) => new THREE.Vector3(s, bottom, width)), false, 'centripetal');
  const sectionAt = t => {
    const upper = sectionCurve.getPoint(t), lower = lowerCurve.getPoint(t);
    return { s: upper.x, x: upper.y, top: upper.z, bottom: lower.y, width: lower.z };
  };
  const rimPoints = 32, sections = 150;
  const templeGeometry = side => {
    const vertices = [], indices = [];
    for (let i = 0; i <= sections; i++) {
      const { s, x, top, bottom, width } = sectionAt(i / sections);
      const height = top - bottom;
      const radius = Math.min(0.8, width * 0.42, height * 0.38);
      for (let j = 0; j < rimPoints; j++) {
        const a = j / rimPoints * Math.PI * 2;
        const cos = Math.cos(a), sin = Math.sin(a);
        // A true rounded rectangle, with a flat broad side and soft moulded edges.
        const dx = Math.sign(cos) * (width / 2 - radius) + radius * cos;
        const dy = Math.sign(sin) * (height / 2 - radius) + radius * sin;
        vertices.push(side * (x + dx), (top + bottom) / 2 + dy, -10.2 - s);
        if (i < sections) {
          const a0 = i * rimPoints + j, a1 = i * rimPoints + (j + 1) % rimPoints;
          const b0 = a0 + rimPoints, b1 = a1 + rimPoints;
          if (side > 0) indices.push(a0, b0, a1, a1, b0, b1);
          else indices.push(a0, a1, b0, a1, b1, b0);
        }
      }
    }
    // Close the hinge root and rounded tip; neither arm is an open shell.
    for (let j = 1; j < rimPoints - 1; j++) {
      if (side > 0) indices.push(0, j, j + 1, sections * rimPoints, sections * rimPoints + j + 1, sections * rimPoints + j);
      else indices.push(0, j + 1, j, sections * rimPoints, sections * rimPoints + j, sections * rimPoints + j + 1);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  };
  const capsule = (parent, radius, length, material, name, position, rotation) => {
    const mesh = add(parent, new THREE.CapsuleGeometry(radius, length, 6, 16), material, name);
    mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    return mesh;
  };
  const line = (parent, points, radius, material, name) => add(parent,
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), Math.max(12, points.length * 4), radius, 6, false), material, name);

  [-1, 1].forEach(side => {
    add(model, templeGeometry(side), acetate, `swept-temple-${side}`);
    const hinge = new THREE.Group();
    hinge.name = `hinge-${side}`;
    const endPiece = shapeFrom([
      ['M', 0, 5.2], ['C', 2.4, 5.4, 6.5, 5.4, 8.2, 4.6],
      ['L', 8.2, -4.6], ['C', 6.4, -5.4, 2.2, -5.5, 0, -5.0]
    ]);
    const housingGeometry = moulded(endPiece, 4.8, 0.5);
    housingGeometry.translate(0, 0, -2.4);
    housingGeometry.rotateY(Math.PI / 2);
    const housing = add(hinge, housingGeometry, acetate, 'wrapped-end-piece');
    housing.position.z = 7.5;
    // The joint is inset on the inside of the arm, with a metal knuckle and slotted screws.
    capsule(hinge, 0.68, 6.7, hingeMetal, 'hinge-barrel', [-side * 2.6, -0.1, 0.8]);
    for (const y of [-4.1, 4.1]) {
      const screw = add(hinge, new THREE.CylinderGeometry(0.95, 0.95, 0.3, 32), hingeMetal, 'hinge-screw');
      screw.position.set(-side * 2.45, y, 0.8);
      const screwSlot = add(hinge, new THREE.BoxGeometry(1.1, 0.08, 0.18), seamMaterial, 'screw-slot');
      screwSlot.position.set(-side * 2.45, y + 0.17, 0.8);
    }
    // Fine parting line at the hinge, not a second oversized block.
    line(hinge, [[side * 2.7, -5.2, -0.35], [side * 2.85, 0, -0.35], [side * 2.7, 5.1, -0.35]], 0.075, seamMaterial, 'hinge-parting-line');
    hinge.position.set(side * 67.1, 12.8, -10.2);
    model.add(hinge);

    // Long inset speaker apertures and a fine seam follow the inside surface of each arm.
    capsule(model, 0.46, 5.3, seamMaterial, 'inner-speaker-slot', [side * 68.9, 10.0, -88], [Math.PI / 2, 0, side * 0.09]);
    for (let i = 0; i < 7; i++) {
      capsule(model, 0.09, 0.63, darkMetal, 'speaker-mesh', [side * 68.83, 10, -85.5 - i * 0.8]);
    }
    line(model, [[side * 69.25, 13.4, -99], [side * 68.3, 10.7, -104], [side * 67.3, 7.6, -109]], 0.055, seamMaterial, 'ear-piece-joint');
    if (side === -1) {
      // Small raised capture button on the top edge, as seen in the front and rear photos.
      capsule(model, 0.57, 4.1, darkMetal, 'capture-button', [side * 68.7, 19.1, -22], [Math.PI / 2, 0, 0]);
      capsule(model, 0.23, 0.25, opticalGlass, 'status-pin', [side * 69.3, 18.85, -30]);
    }
  });

  // Tiny infinity mark on the inside of the left rounded tip, visible in the side reference.
  // It is built as geometry, so it stays sharp and offline without an image texture.
  const mark = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64 * Math.PI * 2;
    mark.push([-61.55, -10.3 + 0.85 * Math.sin(t * 2), -132 + 1.65 * Math.cos(t)]);
  }
  line(model, mark, 0.105, new THREE.MeshStandardMaterial({ color: 0xb0b1ad, roughness: 0.45 }), 'inner-tip-infinity-mark');

  // Tilt the product slightly within its turntable so the front reads like the level
  // reference while the rear rotation reveals the splayed arms and hinge hardware.
  model.rotation.x = -0.08;
  model.updateMatrixWorld(true);
  const centre = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
  model.position.sub(centre);
  const pivot = new THREE.Group();
  pivot.name = 'automatic-turntable';
  pivot.add(model);
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

  // holdAngle is a QA hook only; there are no added buttons or pointer controls.
  const api = window.COOK_GLASSES = { renderer, scene, camera, pivot, holdAngle: null };
  const experience = document.querySelector('.experience');
  const turn = Math.PI * 2 / 9;
  let angle = Math.PI * 2 - 0.65, last = performance.now();
  pivot.rotation.y = angle;
  const frame = now => {
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    if (experience.dataset.scene === 'reveal') {
      angle = (angle + turn * dt) % (Math.PI * 2);
      pivot.rotation.y = Number.isFinite(api.holdAngle) ? api.holdAngle : angle;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();
