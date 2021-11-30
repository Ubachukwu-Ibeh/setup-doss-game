import { game } from "../game.js";
import { components, cameraSettings } from "../globals/globals.js";

export const render = ({ ctx, scaledWidth, scaledHeight }) => {
  ctx.clearRect(0, 0, scaledWidth, scaledHeight);
  ctx.fillStyle = game.backgroundColor;
  ctx.fillRect(0, 0, scaledWidth, scaledHeight);

  const tray = Object.values(components);

  tray.sort((A, B) => B.layer - A.layer);

  // const {
  //   focusAreaX: x,
  //   focusAreaY: y,
  //   focusAreaW: width,
  //   focusAreaH: height,
  // } = cameraSettings;
  // ctx.fillStyle = "pink";
  // ctx.fillRect(x, y, width, height);

  tray.forEach((component) => {
    const { x, y, width, height, color } = component;

    if (color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
  });
};
