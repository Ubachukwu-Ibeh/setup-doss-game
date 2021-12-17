const getRandom = (a) => Math.floor(Math.random() * a);

export const cameraShake = (intensity, duration) => {
  const arr = [];
  for (let i = 0; i < duration; i++) {
    const operation = Math.floor(Math.random() * 2) === 1 ? -1 : 1;
    arr.push(operation * getRandom(intensity));
  }
  return arr;
};

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
