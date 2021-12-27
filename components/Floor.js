import BoxEngine from "../BoxEngine/BoxEngine.js";
import { Boy } from "./Boy.js";

const { set, Box, zoom, pause } = BoxEngine;

export const Floor = new Box({
  id: "Floor1",
  x: set(600),
  y: set(600),
  width: set(200),
  height: set(200),
  color: "green",
  layer: 2,
  important: true,
  canCollide: true,
  rigidBody: true,
  onCollision() {
    // Floor.color = "red";
  },
}).init();

const Floor2 = new Box({
  id: "Floor2",
  x: set(700),
  y: set(500),
  width: set(200),
  height: set(100),
  important: true,
  canCollide: true,
  dv: 0,
  v: 2,
  color: "green",
  layer: 2,
  rigidBody: true,
  // onCollision() {
  //   Floor2.dv = 0;
  //   Floor2.v = 0;
  // },
  // update() {
  //   Floor2.dv += 1;
  //   Floor2.y += set(Floor2.v + Floor2.dv);
  // },
}).init();

new Box({
  id: "bg",
  x: 0,
  y: 0,
  width: set(3000),
  height: set(2000),
  color: "yellowgreen",
  layer: -1,
}).init();

new Box({
  id: "Floor3",
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
// zoom(Boy, 2);
