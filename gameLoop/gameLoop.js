import { engine } from "../engine/engine.js";
import { game } from "../game.js";
import { render } from "../renderer/renderer.js";

export const gameLoop = () => {
  //resolveComponents
  const Engine = engine();

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
  render({ ...game });

  requestAnimationFrame(gameLoop);
};
