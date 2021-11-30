import { setGame } from "./globals/globals";

export const game = setGame({
  displayWidth: 1920,
  displayHeight: 1080,
  backgroundColor: "yellowgreen",
  size: "fit",
});

BoxEngine.addScenes({
  level1: {},
});
