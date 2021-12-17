import { engine } from "../engine/engine.js";
import { game } from "../game.js";
import { render } from "../renderer/renderer.js";

const { newDisplaySettings } = game;

export const gameLoop = () => {
  const Engine = engine(newDisplaySettings);

  Engine.resolveUpdate();

  Engine.resolveControls();

  Engine.resolveCollisions();

  Engine.resolveCamera();

  render(newDisplaySettings);

  requestAnimationFrame(gameLoop);
};
