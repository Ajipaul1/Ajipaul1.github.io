/* home-cords3d.js -- the homepage tool band's cords in real 3D (2026-10-13).
   Owner: "this part is not perfect on our site, it should be bigger 3D ... when disappearing it moves like a 3D
   movie scene, getting bigger and disappearing". The first version was a flat 2D canvas drawing; this one is a
   real WebGL scene, written from scratch (no library, ~15KB):
     - four cords: tubes swept along a Catmull-Rom spine of 36 nodes per cord (the spine is computed on the CPU,
       the tube surface in the vertex shader), woven block pattern + lighting in the fragment shader
     - ENTER    the cords drop in from above the frame and swing on a small rope simulation (verlet)
     - SLIDE    once the visitor scrolls, each cord winds into its twisted pair, top first; scroll speed spins
                the pairs and loosens the twist
     - EXIT 1   the pairs unwind into four separate swaying cords that drift apart sideways and in depth
     - EXIT 2   the camera flies forward through them: they grow huge, tilt in perspective and leave the frame
   API: window.TAP_CORDS3D(container) -> null (no WebGL) | { frame(state), resize(), destroy() }
   state = { enter 0..1, slide 0..1, exit 0..1, energy 0..1, dir +1/-1, dt seconds, time seconds, scrolled bool }.
   home-scroll.js owns the timeline and keeps its 2D drawing as the fallback. */
(function () {
  'use strict';
  var w = window, d = document;
  var N = 36, SA = 180, SR = 16;            // spine nodes, tube segments along / around
  var LEN = 16, Y_TOP = 8.6;                 // cord length (world units) and the y of its top end (view is 12 high)
  var VIEW_H = 12, PERSP = 1.35;             // the z=0 plane shows 12 units vertically; camera distance = 1.35 * 12

  var VS = [
    'attribute vec2 aUV;',
    'uniform vec3 uNodes[' + N + '];',
    'uniform mat4 uPV;',
    'uniform float uRadius, uLen;',
    'varying vec3 vN; varying vec3 vP; varying vec3 vT; varying float vS; varying float vV;',
    'void main(){',
    '  float f = aUV.x * ' + (N - 1) + '.0; float fi = floor(f); float t = f - fi;',
    '  int i1 = int(fi); int i0 = int(max(fi - 1.0, 0.0)); int i2 = int(min(fi + 1.0, ' + (N - 1) + '.0)); int i3 = int(min(fi + 2.0, ' + (N - 1) + '.0));',
    '  vec3 p0 = uNodes[i0], p1 = uNodes[i1], p2 = uNodes[i2], p3 = uNodes[i3];',
    '  float t2 = t * t, t3 = t2 * t;',
    '  vec3 C = 0.5 * ((2.0 * p1) + (-p0 + p2) * t + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t2 + (-p0 + 3.0 * p1 - 3.0 * p2 + p3) * t3);',
    '  vec3 dC = 0.5 * ((-p0 + p2) + 2.0 * (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t + 3.0 * (-p0 + 3.0 * p1 - 3.0 * p2 + p3) * t2);',
    '  vec3 T = length(dC) > 1e-5 ? normalize(dC) : vec3(0.0, -1.0, 0.0);',
    '  vec3 ref = abs(T.z) > 0.92 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 0.0, 1.0);',
    '  vec3 Nn = normalize(cross(T, ref)); vec3 Bn = normalize(cross(Nn, T));',
    '  float a = aUV.y * 6.2831853;',
    '  vec3 off = cos(a) * Nn + sin(a) * Bn;',
    '  vec3 P = C + uRadius * off;',
    '  vN = off; vP = P; vT = T; vS = aUV.x * uLen; vV = aUV.y;',
    '  gl_Position = uPV * vec4(P, 1.0);',
    '}'
  ].join('\n');

  var FS = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp float;', '#else', 'precision mediump float;', '#endif',
    'uniform vec3 uBase, uDark, uAccent, uEye; uniform float uPeriod, uAlpha;',
    'varying vec3 vN; varying vec3 vP; varying vec3 vT; varying float vS; varying float vV;',
    // woven blocks: 4 lanes around the cord, alternate lanes offset, each lane a dark block with an accent edge
    'vec2 weave(float s, float v){',
    '  float lane = floor(v * 4.0); float odd = mod(lane, 2.0);',
    '  float u = s / uPeriod + odd * 0.22 + 0.045 * sin(6.2831853 * v);',
    '  float f = fract(u); float e = 0.014;',
    '  float d1 = smoothstep(0.0, e, f) - smoothstep(0.15 - e, 0.15, f);',
    '  float a1 = smoothstep(0.15, 0.15 + e, f) - smoothstep(0.22 - e, 0.22, f);',
    '  float d2 = (1.0 - odd) * (smoothstep(0.46, 0.46 + e, f) - smoothstep(0.61 - e, 0.61, f));',
    '  float a2 = (1.0 - odd) * (smoothstep(0.61, 0.61 + e, f) - smoothstep(0.68 - e, 0.68, f));',
    '  float lv = fract(v * 4.0); float inLane = smoothstep(0.03, 0.08, lv) * (1.0 - smoothstep(0.92, 0.97, lv));',
    '  return vec2((d1 + d2) * inLane, (a1 + a2) * inLane);',
    '}',
    'void main(){',
    '  vec2 m = weave(vS, vV);',
    '  vec3 alb = mix(mix(uBase, uDark, m.x), uAccent, m.y);',
    '  vec3 n = normalize(vN); vec3 V = normalize(uEye - vP);',
    '  if (dot(n, V) < 0.0) n = -n;',
    '  vec3 L = normalize(vec3(0.38, 0.5, 0.78));',
    '  float diff = max(dot(n, L), 0.0);',
    '  float facing = max(dot(n, V), 0.0);',
    '  float shade = (0.56 + 0.52 * diff) * (0.7 + 0.3 * facing);',
    '  float em = weave(vS + 0.03, vV).x - weave(vS - 0.03, vV).x;',   // the blocks read as raised
    '  shade *= 1.0 + 0.16 * em;',
    '  vec3 H = normalize(L + V);',
    '  float spec = pow(max(dot(n, H), 0.0), 42.0) * 0.16 * (1.0 - 0.6 * m.x);',
    '  vec3 col = alb * shade + vec3(spec);',
    '  gl_FragColor = vec4(col * uAlpha, uAlpha);',
    '}'
  ].join('\n');

  function hex(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
  function smooth(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // the four cords: two twisted pairs; colours from the site palette
  var CORDS = [
    { pair: 0, phase: 0, base: '#A9C4DE', dark: '#0B2036', accent: '#F2B53A', osc: 0.0, freq: 1.0, depth: 1.2, delay: 0.0, grav: 1.0 },
    { pair: 0, phase: Math.PI, base: '#5E7426', dark: '#111111', accent: '#E9E3CF', osc: 2.3, freq: 0.82, depth: -0.8, delay: 0.18, grav: 0.9 },
    { pair: 1, phase: 0, base: '#D9531E', dark: '#111111', accent: '#E9E3CF', osc: 4.1, freq: 1.18, depth: 0.9, delay: 0.07, grav: 1.08 },
    { pair: 1, phase: Math.PI, base: '#E9E3CF', dark: '#111111', accent: '#D9531E', osc: 5.6, freq: 0.91, depth: -1.3, delay: 0.3, grav: 0.86 }
  ];
  var P = { amp: 0.5, hotAmp: 0.64, twist: 1.1, spin: 0, hotSpin: 3.4, depthSpread: 2.4, unravel0: 0.28, unravel1: 0.6, zoom: 0.87,
    sway: 9, swaySpeed: 0.55, grav: 18, damp: 0.985, bend: 0.06, formIn: 1.15, fall: 1.2 };

  function create(container) {
    var cv = d.createElement('canvas'); cv.className = 'vs-cord-gl'; cv.setAttribute('aria-hidden', 'true');
    var attrs = { alpha: true, antialias: true, premultipliedAlpha: true, depth: true, powerPreference: 'high-performance' };
    var gl = null;
    try { gl = cv.getContext('webgl2', attrs) || cv.getContext('webgl', attrs) || cv.getContext('experimental-webgl', attrs); } catch (e) { gl = null; }
    if (!gl) return null;

    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { if (w.console) console.warn('cords3d shader:', gl.getShaderInfoLog(s)); return null; } return s; }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    var prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { if (w.console) console.warn('cords3d link:', gl.getProgramInfoLog(prog)); return null; }
    gl.useProgram(prog);
    var U = {}; ['uNodes', 'uPV', 'uRadius', 'uLen', 'uBase', 'uDark', 'uAccent', 'uEye', 'uPeriod', 'uAlpha'].forEach(function (k) { U[k] = gl.getUniformLocation(prog, k === 'uNodes' ? 'uNodes[0]' : k); });

    // one shared (u along, v around) grid; the vertex shader turns it into each cord
    var verts = new Float32Array((SA + 1) * (SR + 1) * 2), idx = new Uint16Array(SA * SR * 6), q = 0;
    for (var i = 0; i <= SA; i++) for (var j = 0; j <= SR; j++) { verts[q++] = i / SA; verts[q++] = j / SR; }
    q = 0;
    for (i = 0; i < SA; i++) for (j = 0; j < SR; j++) {
      var a = i * (SR + 1) + j, b = a + SR + 1;
      idx[q++] = a; idx[q++] = b; idx[q++] = a + 1; idx[q++] = a + 1; idx[q++] = b; idx[q++] = b + 1;
    }
    var vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    var ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    var aUV = gl.getAttribLocation(prog, 'aUV'); gl.enableVertexAttribArray(aUV); gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    /* ---------- cords: spine state ---------- */
    var rest = LEN / (N - 1);
    var cords = CORDS.map(function (c) {
      return { c: c, base: hex(c.base), dark: hex(c.dark), accent: hex(c.accent),
        x: new Float32Array(N), y: new Float32Array(N), z: new Float32Array(N), px: new Float32Array(N), py: new Float32Array(N), pz: new Float32Array(N),
        hx: new Float32Array(N), hy: new Float32Array(N), hz: new Float32Array(N), nodes: new Float32Array(N * 3),
        mode: 'idle', t: 0, form: 0, sim: false };
    });
    var spin = [0, 0], fellOnce = false;

    function layout() {
      var asp = Math.max(0.3, (cv.width || 1) / (cv.height || 1)), halfW = VIEW_H / 2 * asp, narrow = asp < 0.8;
      return { asp: asp, narrow: narrow, pairX: [-1, 1].map(function (s) { return s * (narrow ? halfW * 0.68 : Math.min(2.6, halfW * 0.3)); }),
        colX: [-1.5, -0.5, 0.5, 1.5].map(function (k) { return k * (narrow ? halfW * 0.5 : Math.min(4, halfW * 0.42)); }),
        radius: narrow ? 0.15 : 0.18, amp: narrow ? 0.36 : 1 };
    }
    var LAY = null;

    function helix(cd, amp) {   // where the cord sits when wound into its pair
      var c = cd.c, cx = LAY.pairX[c.pair], sp = spin[c.pair];
      if (LAY.narrow) amp *= LAY.amp / P.amp;
      for (var k = 0; k < N; k++) {
        var s = k / (N - 1), th = c.phase + sp + P.twist * 6.2831853 * s;
        cd.hx[k] = cx + amp * Math.cos(th); cd.hy[k] = Y_TOP - LEN * s; cd.hz[k] = amp * Math.sin(th);
      }
    }
    function simFromHelix(cd) {
      for (var k = 0; k < N; k++) { cd.x[k] = cd.px[k] = cd.hx[k]; cd.y[k] = cd.py[k] = cd.hy[k]; cd.z[k] = cd.pz[k] = cd.hz[k]; }
      cd.sim = true;
    }
    function simDrop(cd) {   // the cord bunched above its anchor, out of frame, about to fall
      var c = cd.c, ax = LAY.pairX[c.pair] + P.amp * 0.55 * Math.cos(c.phase);
      for (var k = 0; k < N; k++) {
        var s = k / (N - 1);
        cd.x[k] = cd.px[k] = ax + 0.12 * Math.sin(s * 4 + c.phase); cd.y[k] = Y_TOP + rest * 0.92 * k; cd.z[k] = cd.pz[k] = 0.08 * Math.cos(s * 3 + c.phase);
        cd.py[k] = cd.y[k] + 0.03;
      }
      cd.sim = true;
    }
    function step(cd, dt, time, anchorX, gMul, swayMul) {   // verlet rope, pinned at the top
      var c = cd.c, h = Math.min(dt, 1 / 30) / 2, h2 = h * h, g = P.grav * gMul * c.grav;
      var sway = P.sway * swayMul * (Math.sin(time * P.swaySpeed * c.freq + c.osc) + 0.4 * Math.sin(time * P.swaySpeed * c.freq * 0.37 + c.osc * 2.1));
      for (var sub = 0; sub < 2; sub++) {
        for (var k = 1; k < N; k++) {
          var vx = (cd.x[k] - cd.px[k]) * P.damp, vy = (cd.y[k] - cd.py[k]) * P.damp, vz = (cd.z[k] - cd.pz[k]) * P.damp, s = k / (N - 1);
          cd.px[k] = cd.x[k]; cd.py[k] = cd.y[k]; cd.pz[k] = cd.z[k];
          cd.x[k] += vx + sway * (0.3 + s) * h2; cd.y[k] += vy - g * h2; cd.z[k] += vz * 0.85;
        }
        cd.x[0] = cd.px[0] = anchorX; cd.y[0] = cd.py[0] = Y_TOP; cd.z[0] = cd.pz[0] = 0;
        for (var it = 0; it < 8; it++) {
          for (k = 0; k < N - 1; k++) {
            var dx = cd.x[k + 1] - cd.x[k], dy = cd.y[k + 1] - cd.y[k], dz = cd.z[k + 1] - cd.z[k], L = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-6;
            var corr = (L - rest) / L, wa = k === 0 ? 0 : 0.5, wb = k === 0 ? 1 : 0.5;
            cd.x[k] += dx * corr * wa; cd.y[k] += dy * corr * wa; cd.z[k] += dz * corr * wa;
            cd.x[k + 1] -= dx * corr * wb; cd.y[k + 1] -= dy * corr * wb; cd.z[k + 1] -= dz * corr * wb;
          }
        }
        for (k = 1; k < N - 1; k++) {   // a little stiffness
          cd.x[k] += ((cd.x[k - 1] + cd.x[k + 1]) * 0.5 - cd.x[k]) * P.bend;
          cd.y[k] += ((cd.y[k - 1] + cd.y[k + 1]) * 0.5 - cd.y[k]) * P.bend;
          cd.z[k] += ((cd.z[k - 1] + cd.z[k + 1]) * 0.5 - cd.z[k]) * P.bend;
        }
      }
    }

    /* ---------- matrices ---------- */
    function persp(fovy, asp, near, far) { var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far); return [f / asp, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]; }
    function look(e, c, u) {
      var zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2], zl = Math.hypot(zx, zy, zz); zx /= zl; zy /= zl; zz /= zl;
      var xx = u[1] * zz - u[2] * zy, xy = u[2] * zx - u[0] * zz, xz = u[0] * zy - u[1] * zx, xl = Math.hypot(xx, xy, xz); xx /= xl; xy /= xl; xz /= xl;
      var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
      return [xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1];
    }
    function mul(a, b) { var o = new Array(16); for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) { var s = 0; for (var k = 0; k < 4; k++) s += a[i + 4 * k] * b[k + 4 * j]; o[i + 4 * j] = s; } return o; }

    /* ---------- one frame ---------- */
    var alive = true;
    function frame(st) {
      if (!alive) return;
      if (!LAY) LAY = layout();
      var dt = clamp(st.dt || 0.016, 0, 0.05), time = st.time || 0, energy = st.energy || 0, exit = st.exit || 0, enter = st.enter == null ? 1 : st.enter;
      var Z = smooth((exit - P.unravel0) / (P.unravel1 - P.unravel0)), zoomT = smooth((exit - P.unravel1) / (1 - P.unravel1));
      var amp = P.amp + (P.hotAmp - P.amp) * energy;
      for (var p = 0; p < 2; p++) spin[p] += (P.spin + (P.hotSpin - P.spin) * energy) * (st.dir || 1) * dt * (1 - Z) * enter;

      cords.forEach(function (cd, ci) {
        var c = cd.c;
        // enter: drop once, hang, then wind into the pair as soon as the visitor scrolls the band
        if (cd.mode === 'idle' && enter > 0.5) {
          if (!fellOnce && enter > 0.995 && !st.scrolled) { cd.mode = 'formed'; cd.form = 1; }
          else { cd.mode = 'falling'; cd.t = 0; cd.form = 0; helix(cd, amp); simDrop(cd); }
        }
        helix(cd, amp);
        var anchor = LAY.pairX[c.pair] + P.amp * 0.55 * Math.cos(c.phase), wq;
        if (cd.mode === 'falling' || cd.mode === 'hanging') {
          cd.t += dt;
          if (cd.t > c.delay) step(cd, dt, time, anchor, cd.mode === 'hanging' ? 1 : 1.9, cd.mode === 'hanging' ? 0.1 : 0.03);
          if (cd.mode === 'falling' && cd.t > c.delay + P.fall) cd.mode = 'hanging';
          if (cd.mode === 'hanging' && (st.slide || 0) > 0.002) { cd.form = Math.min(1, cd.form + dt / P.formIn); if (cd.form >= 1) { cd.mode = 'formed'; cd.sim = false; } }
          for (var k = 0; k < N; k++) {
            var s = k / (N - 1), S = clamp(cd.form * 1.55 - 0.55 * s, 0, 1); wq = 1 - smooth(S);
            cd.nodes[k * 3] = cd.hx[k] + (cd.x[k] - cd.hx[k]) * wq; cd.nodes[k * 3 + 1] = cd.hy[k] + (cd.y[k] - cd.hy[k]) * wq; cd.nodes[k * 3 + 2] = cd.hz[k] + (cd.z[k] - cd.hz[k]) * wq;
          }
        } else if (Z > 0) {
          // exit: unwind into a lone swaying cord, drifting to its own column and depth
          if (!cd.sim) simFromHelix(cd);
          step(cd, dt, time, anchor + (LAY.colX[ci] - anchor) * Z, 1, 1);
          var dz = c.depth * P.depthSpread * Z;
          for (k = 0; k < N; k++) {
            cd.nodes[k * 3] = cd.hx[k] + (cd.x[k] - cd.hx[k]) * Z; cd.nodes[k * 3 + 1] = cd.hy[k] + (cd.y[k] - cd.hy[k]) * Z; cd.nodes[k * 3 + 2] = cd.hz[k] + (cd.z[k] - cd.hz[k]) * Z + dz;
          }
        } else {
          cd.sim = false;
          for (k = 0; k < N; k++) { cd.nodes[k * 3] = cd.hx[k]; cd.nodes[k * 3 + 1] = cd.hy[k]; cd.nodes[k * 3 + 2] = cd.hz[k]; }
        }
      });
      if (enter > 0.5) fellOnce = true;

      // camera: straight on, then a fly-through on the way out
      var D = PERSP * VIEW_H, dist = D * (1 - P.zoom * zoomT), tilt = (st.tilt || 0) * Math.PI / 180;
      var eye = [Math.sin(tilt) * dist, 0, Math.cos(tilt) * dist];
      var fovy = 2 * Math.atan(VIEW_H / 2 / D);
      var PV = mul(persp(fovy, LAY.asp, 0.03, 80), look(eye, [0, 0, 0], [0, 1, 0]));

      gl.viewport(0, 0, cv.width, cv.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(U.uPV, false, new Float32Array(PV));
      gl.uniform3f(U.uEye, eye[0], eye[1], eye[2]);
      gl.uniform1f(U.uRadius, LAY.radius); gl.uniform1f(U.uLen, LEN); gl.uniform1f(U.uPeriod, 0.66); gl.uniform1f(U.uAlpha, 1);
      cords.forEach(function (cd) {
        gl.uniform3fv(U.uNodes, cd.nodes);
        gl.uniform3fv(U.uBase, cd.base); gl.uniform3fv(U.uDark, cd.dark); gl.uniform3fv(U.uAccent, cd.accent);
        gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
      });
    }
    function resize() {
      var r = container.getBoundingClientRect(), dpr = Math.min(w.devicePixelRatio || 1, r.width < 768 ? 1.5 : 1.75);
      cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      var keep = LAY; LAY = layout();
      if (keep && (keep.pairX[0] !== LAY.pairX[0])) cords.forEach(function (cd) { if (cd.sim) { helix(cd, P.amp); } });
    }
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); alive = false; }, false);
    container.appendChild(cv);
    resize();
    return { canvas: cv, frame: frame, resize: resize, alive: function () { return alive; },
      destroy: function () { alive = false; if (cv.parentNode) cv.parentNode.removeChild(cv); var ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); } };
  }
  w.TAP_CORDS3D = create;
})();
