import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import * as CANNON from "https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js";

const container = document.getElementById("contact");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;


const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg-canvas"), alpha: true });
renderer.setSize(window.innerWidth*0.85, window.innerHeight*0.85);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  const width = window.innerWidth*0.85;
  const height = window.innerHeight*0.85;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const world = new CANNON.World();
world.gravity.set(0, 0, 0);

function createBox() {
  const size = 1;

  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color: 0x819A91 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
  const body = new CANNON.Body({ mass: 0.2, shape });
  body.position.set(Math.random()*10, Math.random()*10, Math.random()*5);
  world.addBody(body);

  return { mesh, body };
}

const objects = Array.from({ length: 10 }, createBox);

const light = new THREE.PointLight(0xFFFFFF, 50);
light.position.set(5, 5, 5);
scene.add(light);
const light2 = new THREE.PointLight(0xFFFFFF, 50);
light2.position.set(-5, -5, 5);
scene.add(light2);


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