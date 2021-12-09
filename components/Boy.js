import BoxEngine from "../BoxEngine/BoxEngine.js";
import { game } from "../game.js";

const { move, Box } = BoxEngine;

export const Boy = new Box({
  id: "Boy",
  x: 1200,
  y: 600,
  width: 50,
  height: 50,
  color: "red",
  layer: 1,
  rigidBody: true,
  controls: {
    type: "keyboard",
    ArrowRight() {
      Boy.x += move(10);
    },
    ArrowDown() {
      Boy.y += move(10);
    },
    ArrowUp() {
      Boy.y -= move(10);
    },
    ArrowLeft() {
      Boy.x -= move(10);
    },
  },
  onCollision() {},
}).init();

const marginX = 2 * (Boy.width / 3);
const marginY = 2 * (Boy.height / 3);

game.camera = {
  focus: Boy,
  x: Boy.x - marginX,
  y: Boy.y - marginY,
  width: 2 * marginX + Boy.width,
  height: 2 * marginY + Boy.height,
};
