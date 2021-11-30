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
  x: 900,
  y: 600,
  width: 200,
  height: 100,
  color: "green",
  layer: 2,
  rigidBody: true,
  onCollision() {},
}).init();
