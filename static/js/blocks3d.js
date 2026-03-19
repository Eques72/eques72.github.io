import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import * as CANNON from "https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js";

const container = document.getElementById("contact");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
camera.position.z = 10;


const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg-canvas"), alpha: true });
renderer.setSize(400, 400);
// renderer.setSize(window.innerWidth, window.innerHeight);

const world = new CANNON.World();
world.gravity.set(0, 0, 0);

function createBox() {
  const size = 1;

  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color: 0xEEBBBB });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
  const body = new CANNON.Body({ mass: 1, shape });
  body.position.set(Math.random()*5-1, Math.random()*5-1, Math.random()*5-1);
  world.addBody(body);

  return { mesh, body };
}

const objects = Array.from({ length: 10 }, createBox);

const light = new THREE.PointLight(0xEEAAff, 10);
light.position.set(5, 5, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  world.step(1/30);

  objects.forEach(obj => {
    obj.mesh.position.copy(obj.body.position);
    obj.mesh.quaternion.copy(obj.body.quaternion);
  });

  renderer.render(scene, camera);
}

animate();