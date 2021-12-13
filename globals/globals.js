import { game } from "../game.js";

/////////////////CONTROLS///////////////
export const keys = {}; //object for keeping track of keyboard keys boolean values

/////////////////SCENES/////////////////

export let currentScene, components;

/////////////////DISPLAY/////////////////

export const resolveComponents = (newDisplayDetails) => {
  //Resolves which components should be calculated and rendered on screen
  const { scaledWidth, scaledHeight } = newDisplayDetails;

  const resolvedComponents = {};

  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (
      (component.x < scaledWidth &&
        0 < component.x + component.width &&
        component.y < scaledHeight &&
        0 < component.y + component.height) ||
      component.isColliding
    ) {
      resolvedComponents[key] = component;
      if (component.isColliding) component.isColliding = false;
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

const scaleValue = getScaleValue();

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

canvas.width = scaledWidth;
canvas.height = scaledHeight;

export const addComponent = (component) => {
  components[component.id] = component;
};

export const newDisplaySettings = {
  ctx,
  scaledWidth,
  scaledHeight,
};

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
