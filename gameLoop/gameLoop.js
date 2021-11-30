import { engine } from "../engine/engine.js";
import { newDisplaySettings } from "../globals/globals.js";
import { render } from "../renderer/renderer.js";

export const gameLoop = () => {
  //resolveComponents
  const Engine = engine(newDisplaySettings);

  //gravity
  Engine.resolveGravity();

  //updates
  Engine.resolveUpdate();

  //controls
  Engine.resolveControls();

  //collision
  Engine.resolveCollisions();

  //camera
  // Engine.resolveCamera();

  //render
  render(newDisplaySettings);

  requestAnimationFrame(gameLoop);
};
