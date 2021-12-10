import BoxEngine from "../BoxEngine/BoxEngine.js";

const { set, Box } = BoxEngine;

export const Floor = new Box({
  id: "Floor",
  x: set(600),
  y: set(600),
  width: set(200),
  height: set(200),
  color: "green",
  layer: 2,
  rigidBody: true,
  onCollision() {},
}).init();

const Floor2 = new Box({
  id: "Floor2",
  x: set(700),
  y: set(10),
  width: set(200),
  height: set(100),
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
    Floor2.y += set(Floor2.v + Floor2.dv);
  },
}).init();

const bg = new Box({
  id: "bg",
  x: 0,
  y: 0,
  width: set(3000),
  height: set(2000),
  color: "yellowgreen",
  layer: -1,
}).init();
