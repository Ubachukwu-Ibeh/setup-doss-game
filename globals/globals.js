export const keys = {}; //object for keeping track of keyboard keys boolean values

/////////////////SCENES/////////////////

let scenes = {};
export const addScenes = (scene) => {
  scenes = { ...scenes, ...scene };
};

export let components = Object.values(scenes)[0];
export const switchScenes = (scene) => {
  components = scenes[scene];
};

/////////////////SETTINGS/////////////////

export let cameraSettings = {};
export let gameSettings = {};

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

//user
export const addComponent = (component) => {
  components = { ...components, ...component };
  const { scaleComponent } = gameSettings;
  scaleComponent(component);
};

export const setDisplay = () => {
  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");

  const { displayWidth, displayHeight, size, backgroundColor } = gameSettings;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const getScaleValue = () => {
    const dx = windowWidth - displayWidth;
    const dy = windowHeight - displayHeight;

    const refX = windowWidth / 2 / (displayWidth / 2);
    const refY = windowHeight / 2 / (displayHeight / 2);

    if (dx < dy) {
      if (size === "fit") return refX;
      if (size === "fill") return refY;
    } else {
      if (size === "fit") return refY;
      if (size === "fill") return refX;
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

  Object.values(scenes).forEach((scene) => {
    scene.forEach((component) => {
      scaleComponent(component);
    });
  });

  return {
    ctx,
    canvas,
    scaledWidth,
    scaledHeight,
    backgroundColor,
  };
};

export const setGame = (params) => {
  gameSettings = { ...gameSettings, ...params };
  return setDisplay();
};
