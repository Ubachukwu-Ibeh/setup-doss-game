import BoxEngine from "../BoxEngine/BoxEngine.js";

export const Boy = new BoxEngine.Box({
  id: "Boy",
  x: 1200,
  y: 600,
  width: 50,
  height: 150,
  color: "red",
  layer: 1,
  rigidBody: true,
  controls: {
    type: "keyboard",
    ArrowRight() {
      Boy.x += 10;
    },
    ArrowDown() {
      Boy.y += 10;
    },
    ArrowUp() {
      Boy.y -= 10;
    },
    ArrowLeft() {
      Boy.x -= 10;
    },
  },
  onCollision() {},
}).init();

BoxEngine.setCamera({
  focus: Boy,
  focusAreaX: window.innerWidth / 2,
  focusAreaY: window.innerHeight / 2,
  focusAreaW: 200,
  focusAreaH: 200,
});
