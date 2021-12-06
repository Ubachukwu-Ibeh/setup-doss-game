import { addComponent, keys } from "../globals/globals.js";
import { observe, XYobserver } from "../helpers/observer.js";

export class Box {
  constructor(props) {
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

    XYobserver(this, "x");
    XYobserver(this, "y");

    addComponent(this);
    return this;
  }
}
