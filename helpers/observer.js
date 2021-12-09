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
