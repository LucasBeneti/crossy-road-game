import * as THREE from 'three';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { player } from './Player';
import { map } from './Map';
import { animateVehicles } from './animations/vehicle';

import './style.css';

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambienteLight = new THREE.AmbientLight();
scene.add(ambienteLight);

const dirLight = new THREE.DirectionalLight();
dirLight.position.set(-100, -100, 200);
scene.add(dirLight);

const camera = Camera();
player.add(camera);

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();

  renderer.render(scene, camera);
}
