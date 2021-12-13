export class Game {
  constructor(props) {
    for (const key in props) {
      this[key] = props[key];
      this.cameraShakeDetails = {
        xShakeValues: [],
        yShakeValues: [],
      };
    }
    return this;
  }
}
