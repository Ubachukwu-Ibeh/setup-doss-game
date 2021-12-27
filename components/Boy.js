import { spriteSheetData } from "../assets/spritesheet.js";
import BoxEngine from "../BoxEngine/BoxEngine.js";
import { game } from "../game.js";

const { set, Box, zoom, preloadImage } = BoxEngine;

let animData = JSON.parse(spriteSheetData);
let spriteSheet = preloadImage("./assets/spritesheet.png");

const img = (val) => animData.frames[val].frame;

let time = 0,
  val = 1;

export const Boy = new Box({
  id: "Boy",
  x: set(1200),
  y: set(600),
  width: set(img(0).w),
  height: set(img(0).h),
  animations: {
    spriteSheet,
    speed: 6,
    idle: {},
    punch: {
      important: true,
    },
  },
  // color: "red",
  layer: 2,
  canCollide: true,
  rigidBody: true,
  // blendMode: "overlay",
  update() {
    Boy.animations.idle.frames = () => getFrames(0, 0);

    Boy.playAnimation("idle");

    // time += 1;
    // if (time % 5 === 0) {
    //   val += 0.01;
    //   zoom(Boy, val);
    //   time = 0;
    // }
  },
  keyboardControls: {
    ArrowRight() {
      Boy.x += set(20);
    },
    ArrowDown() {
      Boy.y += set(20);
    },
    ArrowUp() {
      Boy.y -= set(20);
    },
    ArrowLeft() {
      Boy.x -= set(20);
    },
    d() {
      Boy.animations.punch.frames = () => getFrames(1, 3);

      Boy.playAnimation("punch");
    },
  },
  onCollision() {},
}).init();

game.camera = {
  focus: Boy,
  x: set(1200) - Boy.width / 3,
  y: set(600) - Boy.height / 3,
  width: 2 * (Boy.width / 3) + Boy.width,
  height: 2 * (Boy.height / 3) + Boy.height,
};

const getFrames = (a, b) => {
  const frames = [];
  for (let i = a; i < b + 1; i++) {
    const data = animData.frames[i].frame;
    frames.push([
      data.x,
      data.y,
      data.w,
      data.h,
      Boy.x,
      Boy.y,
      Boy.width,
      Boy.height,
    ]);
  }
  return frames;
};
