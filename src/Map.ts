import * as THREE from 'three';
import { Grass } from './Grass';
import { Road } from './Road';
import { Car } from './Car';
import { Tree } from './Tree';

type MetadataType = Array<
  | {
      type: 'forest';
      trees: Array<{ tileIndex: number; height: number }>;
    }
  | {
      type: 'car';
      direction: boolean;
      speed: number;
      vehicles: Array<{
        ref?: THREE.Group<THREE.Object3DEventMap>;
        initialTileIndex: number;
        color: number;
      }>;
    }
>;

export const metadata: MetadataType = [
  {
    type: 'car',
    direction: false,
    speed: 188,
    vehicles: [
      { initialTileIndex: -4, color: 0xbdb638 },
      { initialTileIndex: -1, color: 0x78b14b },
      { initialTileIndex: 4, color: 0xa52523 },
    ],
  },
  {
    type: 'forest',
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
      { tileIndex: 5, height: 50 },
    ],
  },
  {
    type: 'car',
    direction: false,
    speed: 10,
    vehicles: [{ initialTileIndex: 2, color: 0xff0000 }],
  },
  {
    type: 'car',
    direction: true,
    speed: 125,
    vehicles: [
      { initialTileIndex: -4, color: 0x78b14b },
      { initialTileIndex: 0, color: 0xbdb638 },
      { initialTileIndex: 5, color: 0xbdb638 },
    ],
  },
  {
    type: 'forest',
    trees: [
      { tileIndex: -8, height: 30 },
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
    ],
  },
];

export const map = new THREE.Group();

const grass = Grass(0);
map.add(grass);

metadata.forEach((rowData, index) => {
  const rowIndex = index + 1;

  if (rowData.type === 'forest') {
    const row = Grass(rowIndex);

    rowData.trees.forEach(({ tileIndex, height }) => {
      const tree = Tree(tileIndex, height);
      row.add(tree);
    });

    map.add(row);
  }

  if (rowData.type === 'car') {
    const row = Road(rowIndex);

    rowData.vehicles.forEach((vehicle) => {
      const car = Car(
        vehicle.initialTileIndex,
        rowData.direction,
        vehicle.color
      );
      vehicle.ref = car;
      row.add(car);
    });
    map.add(row);
  }
});
