import { addComponent, keys } from "../globals/globals.js";

let numberOfInstances = 0;

const observe = (obj, key, callBack) => {
  let val = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      let diff;
      if (key === "x") {
        diff = val - newVal;
      }
      val = newVal;
      callBack(diff);
    },
  });
};

export class Box {
  constructor(props /**@object */) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }
  init() {
    if (this.controls) {
      switch (this.controls.type) {
        case "keyboard":
          window.addEventListener("keydown", (e) => {
            keys[e.key] = true;
          });
          window.addEventListener("keyup", (e) => {
            keys[e.key] = false;
          });
          break;
        case "touch":
          break;
        case "pad":
          break;

        default:
          break;
      }
    }

    if (this.imageProperties) {
      let setImage;
      setImage = () => {
        const src = this.imageProperties.src;
        const image = document.createElement("img");
        image.setAttribute("src", src);
        image.setAttribute("width", this.imageProperties.width);
        image.setAttribute("height", this.imageProperties.height);
        this.imageProperties.image = image;
      };
      setImage();
      observe(this, "imageProperties", () => setImage());
    }

    numberOfInstances += 1;
    addComponent({ [this.id + `${numberOfInstances}`]: this });
    return this;
  }
}
