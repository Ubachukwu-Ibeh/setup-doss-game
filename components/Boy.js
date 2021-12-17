import BoxEngine from "../BoxEngine/BoxEngine.js";
import { game } from "../game.js";

const { set, Box, zoom } = BoxEngine;

export const Boy = new Box({
  id: "Boy",
  x: set(1200),
  y: set(600),
  width: set(50),
  height: set(50),
  color: "red",
  layer: 2,
  rigidBody: true,
  blendMode: "overlay",
  keyboardControls: {
    ArrowRight() {
      Boy.x += set(10);
    },
    ArrowDown() {
      Boy.y += set(10);
    },
    ArrowUp() {
      Boy.y -= set(10);
    },
    ArrowLeft() {
      Boy.x -= set(10);
    },
  },
  onCollision() {},
}).init();

const marginX = 2 * (Boy.width / 3);
const marginY = 2 * (Boy.height / 3);

game.camera = {
  focus: Boy,
  x: set(1200) - marginX,
  y: set(600) - marginY,
  width: 2 * marginX + Boy.width,
  height: 2 * marginY + Boy.height,
};
