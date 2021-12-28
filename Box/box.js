import { addComponent, keys } from "../globals/globals.js";

export class Box {
  constructor(props) {
    this.type = "component";
    this.depth = 1;
    Object.keys(props).forEach((key) => (this[key] = props[key]));
  }
  init() {
    if (this.animations) {
      this.animations.frameTick = 0;
      this.animations.frameNumber = 0;
      this.animations.done = true;

      this.playAnimation = (animationName) => {
        const isPrevious = this.animations.currentAnimation === animationName;
        const isImportant = this.animations[animationName].important;
        const isDone = this.animations.done;

        if (isPrevious || (!isImportant && !isDone)) return;
        this.animations.frameTick = 0;
        this.animations.frameNumber = 0;
        this.animations.currentAnimation = animationName;
      };
    }

    addComponent(this);

    return this;
  }
}
