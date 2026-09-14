import { useEffect, useRef } from "react";
import * as THREE from "three";

type Mode = "hero" | "play";

const COLORS = [0xff5a1f, 0x3de0c8, 0xf0d36c, 0xff6bd6];

export default function ArenaCanvas({ mode }: { mode: Mode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14081a);
    scene.fog = new THREE.Fog(0x14081a, 12, 38);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
    camera.position.set(0, mode === "hero" ? 18 : 16, mode === "hero" ? 16 : 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    wrap.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffe6c8, 0x3a1030, 0.85));
    const key = new THREE.DirectionalLight(0xff7a3c, 1.35);
    key.position.set(10, 16, 8);
    scene.add(key);
    const fill = new THREE.PointLight(0x3de0c8, 2.2, 40);
    fill.position.set(-8, 4, -4);
    scene.add(fill);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(15, 72),
      new THREE.MeshStandardMaterial({ color: 0x22101f, roughness: 0.7, metalness: 0.12 }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const makeRing = (inner: number, outer: number, color: number, y: number) => {
      const mesh = new THREE.Mesh(
        new THREE.RingGeometry(inner, outer, 80),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = y;
      scene.add(mesh);
      return mesh;
    };
    const ringA = makeRing(11.1, 11.55, 0xff5a1f, 0.03);
    const ringB = makeRing(8.2, 8.4, 0x3de0c8, 0.04);

    const grid = new THREE.PolarGridHelper(14, 8, 16, 64, 0x5a2048, 0x3de0c8);
    grid.position.y = 0.02;
    scene.add(grid);

    const player = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.38, 0.6, 5, 10),
      new THREE.MeshStandardMaterial({ color: 0xfff4e4, emissive: 0x402010, roughness: 0.28, metalness: 0.2 }),
    );
    player.position.y = 0.72;
    scene.add(player);

    const orbs: { mesh: THREE.Mesh; angle: number; radius: number; speed: number }[] = [];
    const orbGeo = new THREE.SphereGeometry(0.32, 18, 18);
    for (let i = 0; i < 24; i += 1) {
      const color = COLORS[i % COLORS.length];
      const mesh = new THREE.Mesh(
        orbGeo,
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.45,
          roughness: 0.25,
        }),
      );
      const angle = (i / 24) * Math.PI * 2;
      const radius = 3.2 + (i % 6) * 1.05;
      mesh.position.set(Math.cos(angle) * radius, 0.4, Math.sin(angle) * radius);
      scene.add(mesh);
      orbs.push({ mesh, angle, radius, speed: 0.32 + (i % 5) * 0.07 });
    }

    const sparkGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const sparks: { mesh: THREE.Mesh; life: number; vx: number; vz: number }[] = [];
    for (let i = 0; i < 28; i += 1) {
      const mesh = new THREE.Mesh(
        sparkGeo,
        new THREE.MeshBasicMaterial({ color: COLORS[i % COLORS.length] }),
      );
      scene.add(mesh);
      sparks.push({ mesh, life: Math.random(), vx: 0, vz: 0 });
    }

    const keys: Record<string, boolean> = {};
    const pointer = { x: 0, y: 0 };
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (mode !== "play") return;
      keys[e.key.toLowerCase()] = down;
    };
    const keyDown = (e: KeyboardEvent) => onKey(e, true);
    const keyUp = (e: KeyboardEvent) => onKey(e, false);
    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    wrap.addEventListener("pointermove", onPointer);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    let raf = 0;
    const tick = () => {
      const t = performance.now() * 0.001;
      ringA.rotation.z = t * 0.12;
      ringB.rotation.z = -t * 0.18;

      if (mode === "play") {
        const dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
        const dz = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
        player.position.x = THREE.MathUtils.clamp(player.position.x + dx * 0.18 - pointer.x * 0.01, -10, 10);
        player.position.z = THREE.MathUtils.clamp(player.position.z + dz * 0.18 + pointer.y * 0.01, -10, 10);
      } else {
        player.position.x = Math.sin(t * 0.7) * 2.4;
        player.position.z = Math.cos(t * 0.55) * 2.1;
      }

      orbs.forEach((o, i) => {
        o.angle += o.speed * 0.012;
        o.mesh.position.x = Math.cos(o.angle) * o.radius;
        o.mesh.position.z = Math.sin(o.angle) * o.radius;
        o.mesh.position.y = 0.38 + Math.sin(t * 2.4 + i) * 0.16;
      });

      sparks.forEach((s, i) => {
        s.life -= 0.016;
        if (s.life <= 0) {
          const a = t * 3 + i;
          s.mesh.position.set(player.position.x, 0.7, player.position.z);
          s.vx = Math.cos(a) * (0.18 + (i % 5) * 0.04);
          s.vz = Math.sin(a) * (0.18 + (i % 5) * 0.04);
          s.life = 0.7 + (i % 4) * 0.15;
        }
        s.mesh.position.x += s.vx;
        s.mesh.position.z += s.vz;
        s.mesh.position.y = 0.55 + s.life * 0.4;
        s.mesh.scale.setScalar(Math.max(s.life, 0.12));
      });

      camera.position.x += (player.position.x * 0.4 + pointer.x * 1.5 - camera.position.x) * 0.04;
      camera.position.z = (mode === "hero" ? 16 : 14) + Math.sin(t * 0.25) * 0.6;
      camera.lookAt(player.position.x * 0.3, 0, player.position.z * 0.3);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      wrap.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement);
    };
  }, [mode]);

  return <div ref={wrapRef} className={mode === "hero" ? "hero-canvas" : "player-canvas"} />;
}
