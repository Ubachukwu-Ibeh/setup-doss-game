import { spriteSheetData } from "../assets/spritesheet.js";
import BoxEngine from "../BoxEngine/BoxEngine.js";
import { game } from "../game.js";

const { set, Box, preloadImage } = BoxEngine;

let animData = JSON.parse(spriteSheetData);
let spriteSheet = preloadImage("./assets/spritesheet.png");

const img = (val) => animData.frames[val].frame;

let otherAnimations;

export const Boy = new Box({
  id: "Boy",
  x: set(1200),
  y: set(600),
  width: set(img(0).w),
  height: set(img(0).h),
  animations: {
    spriteSheet,
  },
  // color: "red",
  layer: 2,
  canCollide: true,
  rigidBody: true,
  // blendMode: "overlay",
  update() {
    if (!otherAnimations) {
      Boy.playAnimation("idle");
      otherAnimations = true;
    }

    // Boy.width = set(img(0).w);
    // Boy.height = set(img(0).h);

    const idle = getFrames(0, 0);
    Boy.animations.idle = idle;
  },
  keyboardControls: {
    ArrowRight() {
      Boy.x += set(10);
    },
    ArrowDown() {
      Boy.y += set(10);
    },
    ArrowUp() {
      Boy.y -= set(10);
    },
    ArrowLeft() {
      Boy.x -= set(10);
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
