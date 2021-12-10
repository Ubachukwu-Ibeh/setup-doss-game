import { engine } from "../engine/engine.js";
import { newDisplaySettings } from "../globals/globals.js";
import { render } from "../renderer/renderer.js";

export const gameLoop = () => {
  const Engine = engine(newDisplaySettings);

  Engine.resolveUpdate();

  Engine.resolveControls();

  Engine.resolveCollisions();

  Engine.resolveCamera();

  render(newDisplaySettings);

  requestAnimationFrame(gameLoop);
};
