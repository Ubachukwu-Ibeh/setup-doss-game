import { game } from "../game.js";
import { components } from "../globals/globals.js";

export const render = ({ ctx, scaledWidth, scaledHeight }) => {
  ctx.clearRect(0, 0, scaledWidth, scaledHeight);
  ctx.fillStyle = game.backgroundColor;
  ctx.fillRect(0, 0, scaledWidth, scaledHeight);

  const tray = Object.values(components);

  tray.sort((A, B) => A.layer - B.layer);

  tray.forEach((component) => {
    if (component.id === "Boy") {
      const { x, y, width, height } = game.camera;

      ctx.fillStyle = "pink";
      ctx.fillRect(x, y, width, height);
    }

    const { x, y, width, height, color } = component;

    if (component.blendMode) {
      ctx.globalCompositeOperation = component.blendMode;
    }
    if (color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
    if (component.animations) {
      const { currentFrame, spriteSheet } = component.animations;

      if (currentFrame) {
        const [sx, sy, sw, sh, ix, iy, iw, ih] = currentFrame;
        ctx.drawImage(spriteSheet, sx, sy, sw, sh, ix, iy, iw, ih);
      }
    }
    ctx.globalCompositeOperation = "normal";
  });
};
