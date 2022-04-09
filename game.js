import doss from "doss";

const { setGame, switchScenes } = doss;

export const game = setGame({
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
switchScenes("level1");
