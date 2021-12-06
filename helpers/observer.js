import { game } from "../game.js";
import { newDisplaySettings } from "../globals/globals.js";

export const observe = (obj, key, callBack) => {
  let val = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      val = newVal;
      callBack();
    },
  });
};

export const XYobserver = (obj, key) => {
  let val = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      const diff = Math.floor(newVal - val);

      if (key === "x" && diff !== 0) {
        val += (diff * newDisplaySettings.scaledWidth) / game.displayWidth;
      }
      if (key === "y" && diff !== 0) {
        val += (diff * newDisplaySettings.scaledHeight) / game.displayHeight;
      }
    },
  });
};
