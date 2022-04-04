import BoxEngine from "../BoxEngine/index.js";

const { set, Box } = BoxEngine;

//Platforms
new Box({
  id: "plat1",
  x: set(600),
  y: set(1200),
  width: set(1000),
  height: set(100),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  static: true,
}).init();

new Box({
  id: "plat2",
  x: set(500),
  y: set(700),
  width: set(200),
  height: set(100),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  static: true,
}).init();

new Box({
  id: "plat3",
  x: set(1300),
  y: set(500),
  width: set(200),
  height: set(100),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  static: true,
}).init();

new Box({
  id: "plat4",
  x: set(2000),
  y: set(800),
  width: set(200),
  height: set(100),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  static: true,
}).init();

new Box({
  id: "plat5",
  x: set(2500),
  y: set(1000),
  width: set(500),
  height: set(100),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  static: true,
}).init();

//random brown box
// new Box({
//   id: "brown box",
//   x: set(700),
//   y: set(300),
//   width: set(200),
//   height: set(100),
//   important: true,
//   canCollide: true,
//   dv: 0,
//   v: 2,
//   color: "brown",
//   layer: 2,
//   rigidBody: true,
// }).init();

//Box for scroll parallax
new Box({
  id: "parallax box",
  x: set(1000),
  y: set(200),
  width: set(400),
  height: set(200),
  color: "rgb(120,180,50)",
  depth: set(2),
  layer: 1,
  onCollision() {},
  update() {},
}).init();

//Background lemon green box
new Box({
  id: "bg",
  x: 0,
  y: 0,
  width: set(3000),
  height: set(2000),
  color: "yellowgreen",
  layer: -1,
}).init();
