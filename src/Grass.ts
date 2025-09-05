import * as THREE from 'three';
import { tilesPerRow, tileSize } from './costants';

export function Grass(rowIndex: number) {
  const grass = new THREE.Group(); // é um grupo pois odemos adicionar filhos posteriormente
  grass.position.y = rowIndex * tileSize;

  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
    new THREE.MeshLambertMaterial({ color: 0xbaf455 })
  );
  foundation.position.z = 1.5;
  grass.add(foundation);

  return grass;
}
