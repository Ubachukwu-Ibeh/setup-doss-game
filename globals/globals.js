import { game } from "../game.js";

export const keys = {}; //object for keeping track of keyboard keys boolean values

export let currentScene, components;

export const resolveComponents = (newDisplayDetails) => {
  //Resolves which components should be calculated and rendered on screen
  const { scaledX, scaledY, scaledWidth, scaledHeight } = newDisplayDetails;

  const resolvedComponents = {};

  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (
      (component.x < scaledWidth &&
        scaledX < component.x + component.width &&
        component.y < scaledHeight &&
        scaledY < component.y + component.height) ||
      component.important
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

let scaleValue = getScaleValue();
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

const getRandom = (a) => Math.floor(Math.random() * a);

export const cameraShake = (intensity, duration) => {
  game.cameraShakeDetails[axis] = [];
  for (let i = 0; i < duration; i++) {
    const operation = Math.floor(Math.random() * 2) === 1 ? -1 : 1;
    game.cameraShakeDetails[axis].push(operation * getRandom(intensity));
  }
};

const resolveZoom = (focus, val, reset) => {
  let amount = val;
  if (reset) amount = 1 / amount;
  scaleValue = Math.floor(amount);

  const initialPx = focus.x + focus.width / 2;
  const initialPy = focus.y + focus.height / 2;

  focus.x *= amount;
  focus.y *= amount;
  focus.width *= amount;
  focus.height *= amount;

  let dx = initialPx - (focus.x + focus.width / 2);
  let dy = initialPy - (focus.y + focus.height / 2);

  focus.x += dx;
  focus.y += dy;

  game.camera.x *= amount;
  game.camera.y *= amount;
  game.camera.width *= amount;
  game.camera.height *= amount;
  game.camera.x += dx;
  game.camera.y += dy;

  currentScene.worldX = dx;
  currentScene.worldY = dy;
  currentScene.worldWidth *= amount;
  currentScene.worldHeight *= amount;

  game.newDisplaySettings.scaledX = dx;
  game.newDisplaySettings.scaledY = dy;
  game.newDisplaySettings.scaledWidth = displayWidth * amount;
  game.newDisplaySettings.scaledHeight = displayWidth * amount;

  Object.values(components).forEach((component) => {
    if (component === focus) return;
    component.x *= amount;
    component.y *= amount;
    component.width *= amount;
    component.height *= amount;
    component.x += dx;
    component.y += dy;
  });
};

let hasScaled = false;

export const zoom = (focus, amount) => {
  if (hasScaled) {
    resolveZoom(focus, scaleValue, true);
    hasScaled = false;
    zoom(focus, amount);
  } else {
    resolveZoom(focus, amount);
    hasScaled = true;
  }
};

export const addComponent = (component) => {
  components[component.id] = component;
};
