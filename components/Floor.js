import BoxEngine from "../BoxEngine/BoxEngine.js";

const { move, Box } = BoxEngine;

export const Floor = new Box({
  id: "Floor",
  x: 600,
  y: 600,
  width: 200,
  height: 200,
  color: "green",
  layer: 2,
  rigidBody: true,
  onCollision() {},
}).init();

const Floor2 = new Box({
  id: "Floor2",
  x: 700,
  y: 10,
  width: 200,
  height: 100,
  dv: 0,
  v: 2,
  color: "green",
  layer: 2,
  rigidBody: true,
  onCollision() {
    Floor2.dv = 0;
    Floor2.v = 0;
  },
  update() {
    Floor2.dv += 1;
    Floor2.y += move(Floor2.v + Floor2.dv);
  },
}).init();

const bg = new Box({
  id: "bg",
  x: 0,
  y: 0,
  width: 3000,
  height: 2000,
  color: "yellowgreen",
  layer: -1,
}).init();
