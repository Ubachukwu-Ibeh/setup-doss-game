import BoxEngine from "../BoxEngine/BoxEngine.js";

export const Floor = new BoxEngine.Box({
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

const Floor2 = new BoxEngine.Box({
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
    Floor2.y += Floor2.v + Floor2.dv;
  },
}).init();

const bg = new BoxEngine.Box({
  id: "bg",
  x: 0,
  y: 0,
  width: 3000,
  height: 2000,
  color: "yellowgreen",
  layer: -1,
}).init();
