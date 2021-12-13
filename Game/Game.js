export class Game {
  constructor(props) {
    for (const key in props) {
      this[key] = props[key];
      this.cameraShakeDetails = {
        xShakeValues: [],
        yShakeValues: [],
      };
      this.newDisplaySettings = {
        scaledX: 0,
        scaledY: 0,
        scaledWidth: undefined,
        scaledHeight: undefined,
        ctx: undefined,
      };
      this.camera = {
        focus: undefined,
        x: undefined,
        y: undefined,
        width: undefined,
        height: undefined,
      };
    }
    return this;
  }
}
