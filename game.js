import { Game } from "./Game/Game.js";

export const game = new Game({
  displayWidth: 1920,
  displayHeight: 1080,
  backgroundColor: "black",
  size: "fit",
  scenes: {
    level1: {
      worldWidth: 3000,
      worldHeight: 2000,
      worldX: 0,
      worldY: 0,
      components: {},
    },
  },
});
