import { addComponent, keys } from "../globals/globals.js";

const createImgElement = (src) => {
  const image = document.createElement("img");
  image.setAttribute("src", src);
  return image;
};

const observe = (obj, key) => {
  let val = obj[key];

  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      val = createImgElement(newVal);
    },
  });
};

export class Box {
  constructor(props) {
    this.type = "component";
    this.depth = 1;
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }
  init() {
    if (this.keyboardControls) {
      window.addEventListener("keydown", (e) => {
        keys[e.key] = true;
      });
      window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
      });
    }

    if (this.animations) {
      this.animations.spriteSheet = createImgElement(
        this.animations.spriteSheet
      );

      observe(this.animations, "spriteSheet");

      this.playAnimation = (animationName) => {
        this.animations.frameTick = 0;
        this.animations.frameNumber = 0;
        this.animations.currentAnimation = this.animations[animationName];
      };
    }

    addComponent(this);

    return this;
  }
}
