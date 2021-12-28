import { game } from "../game.js";

export const keys = {}; //object for keeping track of keyboard keys boolean values

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

export const preloadImage = (src) => {
  const image = document.createElement("img");
  image.setAttribute("src", src);
  return image;
};

export const preloadSound = (src) => {
  const sfx = new Audio(src);
  sfx.preload = "auto";
  return sfx;
};

export let currentScene, components;

export const resolveComponents = () => {
  //Resolves which components should be calculated and rendered on screen
  const { scaledX, scaledY, scaledWidth, scaledHeight } =
    game.newDisplaySettings;

  const resolvedComponents = {};

  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (
      component.important ||
      (component.x < scaledWidth &&
        scaledX < component.x + component.width &&
        component.y < scaledHeight &&
        scaledY < component.y + component.height)
    ) {
      resolvedComponents[key] = component;
    }
  });

  return resolvedComponents;
};

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const { displayWidth, displayHeight, size } = game;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const getScaleValue = () => {
  const refX = windowWidth / 2 / (displayWidth / 2);
  const refY = windowHeight / 2 / (displayHeight / 2);

  const res = {
    refXY() {
      if (size === "fit") return refX;
      if (size === "fill") return refY;
    },
    refYX() {
      if (size === "fit") return refY;
      if (size === "fill") return refX;
    },
  };

  if (displayWidth > displayHeight) {
    if (windowHeight < windowWidth) {
      return res.refYX();
    } else {
      return res.refXY();
    }
  } else {
    if (windowHeight < windowWidth) {
      return res.refXY();
    } else {
      return res.refYX();
    }
  }
};

export let scaleValue = getScaleValue();
game.originalScaleValue = scaleValue;

export const addScenes = (name, scene) => {
  game.scenes[name] = scene;
};

export const switchScenes = (scene) => {
  const sceneType = typeof scene;

  if (sceneType === "number") {
    currentScene = Object.values(game.scenes)[scene];
  } else if (sceneType === "string") {
    currentScene = game.scenes[scene];
  }

  components = currentScene.components;

  currentScene.worldWidth *= scaleValue;
  currentScene.worldHeight *= scaleValue;
};

switchScenes(0);

const scaledWidth = displayWidth * scaleValue;
const scaledHeight = displayHeight * scaleValue;

game.newDisplaySettings.scaledWidth = scaledWidth;
game.newDisplaySettings.scaledHeight = scaledHeight;

game.newDisplaySettings.ctx = ctx;

canvas.width = scaledWidth;
canvas.height = scaledHeight;

export const set = (val) => {
  return val * scaleValue;
};

export const cameraShake = (arr) => arr;

const resolveZoom = (point, val, reset) => {
  let amount = val;
  if (reset) amount = 1 / amount;

  scaleValue = amount;

  let { x, y } = point;

  const initialPx = x;
  const initialPy = y;

  x *= amount;
  y *= amount;

  let dx = initialPx - x;
  let dy = initialPy - y;

  game.camera.x *= amount;
  game.camera.y *= amount;
  game.camera.width *= amount;
  game.camera.height *= amount;
  game.camera.x += dx;
  game.camera.y += dy;

  currentScene.worldX *= amount;
  currentScene.worldY *= amount;
  currentScene.worldWidth *= amount;
  currentScene.worldHeight *= amount;

  Object.values(components).forEach((component) => {
    component.x *= amount;
    component.y *= amount;
    component.width *= amount;
    component.height *= amount;
    component.x += dx;
    component.y += dy;
  });
};

let hasScaled = false;

export const zoom = (point, amount) => {
  if (hasScaled) {
    resolveZoom(point, scaleValue, true);
    hasScaled = false;
    zoom(point, amount);
  } else {
    resolveZoom(point, amount);
    hasScaled = true;
  }
};

export const addComponent = (component) => {
  components[component.id] = component;
};

export const rotate = ({ x, y }, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x, -y);
};

export const save = () => {
  localStorage.setItem("saved-game", JSON.stringify(game));
};

export const pause = () => {
  game.pause = true;
};

export const play = () => {
  game.pause = false;
};
