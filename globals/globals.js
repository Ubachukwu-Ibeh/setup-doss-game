import { game } from "../game.js";
export const keys = {}; //object for keeping track of keyboard keys boolean values

/////////////////SCENES/////////////////

let scenes = {};

export const addScenes = (scene) => {
  scenes = { ...scenes, ...scene };
};
export const switchScenes = (scene) => {
  components = scenes[scene];
};

export let components = Object.values(game.scenes)[0];

/////////////////SETTINGS/////////////////

export let cameraSettings = {};

export const setCamera = (settings) => {
  cameraSettings = { ...cameraSettings, ...settings };
};

/////////////////DISPLAY/////////////////

export const resolveComponents = (newDisplayDetails) => {
  //Resolves which components should be calculated and rendered on screen
  const { scaledWidth, scaledHeight } = newDisplayDetails;

  const resolvedComponents = {};

  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (
      component.x < scaledWidth &&
      0 < component.x + component.width &&
      component.y < scaledHeight &&
      0 < component.y + component.height
    ) {
      resolvedComponents[key] = component;
    }
  });

  return resolvedComponents;
};

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const { displayWidth, displayHeight, size, backgroundColor } = game;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const getScaleValue = () => {
  const dx = windowWidth - displayWidth;
  const dy = windowHeight - displayHeight;

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

const scale = (component, x, y, scale) => {
  const dx = component.x - x;
  const dy = component.y - y;

  component.x = x + scale * dx;
  component.y = y + scale * dy;

  component.width *= scale;
  component.height *= scale;
};

const scaleValue = getScaleValue();

const scaledWidth = displayWidth * scaleValue;
const scaledHeight = displayHeight * scaleValue;

canvas.width = scaledWidth;
canvas.height = scaledHeight;

const initialPx = displayWidth / 2;
const initialPy = displayHeight / 2;
const finalPx = scaledWidth / 2;
const finalPy = scaledHeight / 2;

const scaleComponent = (component) => {
  component.x += component.x - initialPx - (component.x - finalPx);
  component.y += component.y - initialPy - (component.y - finalPy);
  scale(component, finalPx, finalPy, scaleValue);
};

export const addComponent = (component) => {
  components[component.id] = component;
  scaleComponent(component);
};

export const newDisplaySettings = {
  ctx,
  scaledWidth,
  scaledHeight,
};
