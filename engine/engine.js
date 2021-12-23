import { game } from "../game.js";
import {
  keys,
  resolveComponents,
  components,
  currentScene,
} from "../globals/globals.js";

export const engine = ({ newDisplaySettings, camera, pause } = game) => {
  const validComponents = resolveComponents(newDisplaySettings);
  const validComponentsArray = Object.values(validComponents);

  const resolveControls = () => {
    validComponentsArray.forEach((component) => {
      if (pause && component.type !== "ui") return;
      if (component.keyboardControls) {
        Object.keys(keys)
          .filter((key) => {
            if (keys[key] === true) {
              return key;
            }
          })
          .forEach((key) => {
            const cmd = component.keyboardControls[key];
            if (cmd) {
              cmd();
            }
          });
      }
    });
  };

  const resolveUpdate = () => {
    validComponentsArray.forEach((component) => {
      if (pause && component.type !== "ui") return;
      if (component.update) {
        component.update();
      }
    });
  };

  const resolveCollisions = () => {
    const collisionBoxes = validComponentsArray.filter((component) => {
      if (pause && component.type !== "ui") return;
      if (component.canCollide === true) {
        return component;
      }
    });

    const testForCollision = (A, B) => {
      if (
        A.x < B.x + B.width &&
        B.x < A.x + A.width &&
        A.y < B.y + B.height &&
        B.y < A.y + A.height
      ) {
        return true;
      } else {
        return false;
      }
    };

    let i = 0,
      j,
      k,
      l,
      collided;

    const resolve = () => {
      let collisionDataA, collisionDataB;

      for (i; i < collisionBoxes.length; i++) {
        j = 0;
        for (j; j < collisionBoxes.length; j++) {
          if (i === j) continue;

          const A = collisionBoxes[i];
          const B = collisionBoxes[j];

          if (testForCollision(A, B)) {
            collided = true;
            k = i;
            l = j;
            const resolveX = () => {
              if (A.x < B.x) {
                collisionDataA = { object: B, right: true };
                collisionDataB = { object: A, left: true };
                return A.rigidBody && B.rigidBody ? A.x + A.width - B.x : 0;
              } else {
                collisionDataA = { object: B, left: true };
                collisionDataB = { object: A, right: true };
                return A.rigidBody && B.rigidBody ? -(B.x + B.width - A.x) : 0;
              }
            };

            const getResolveRef = () => {
              if (A.onCollision) A.onCollision(collisionDataA);
              if (B.onCollision) B.onCollision(collisionDataB);

              const resolveRefA = () => {
                resolve();
              };

              const resolveRefB = () => {
                if (!A.rigidBody) return;
                i = j;
                resolve();
              };
              return {
                resolveRefA,
                resolveRefB,
              };
            };

            const checkX = (dx) => {
              if (B.static) {
                A.x -= dx;
                getResolveRef().resolveRefA();
              } else {
                B.x += dx;
                getResolveRef().resolveRefB();
              }
            };

            if (A.y < B.y) {
              let dx = resolveX(),
                dy = A.rigidBody && B.rigidBody ? A.y + A.height - B.y : 0;

              if (Math.abs(dx) < dy) {
                checkX(dx);
              } else {
                collisionDataA = { object: B, bottom: true };
                collisionDataB = { object: A, top: true };

                if (B.static) {
                  A.y -= dy;
                  getResolveRef().resolveRefA();
                } else {
                  B.y += dy;
                  getResolveRef().resolveRefB();
                }
              }
            } else {
              let dx = resolveX(),
                dy = A.rigidBody && B.rigidBody ? B.y + B.height - A.y : 0;

              if (Math.abs(dx) < dy) {
                checkX(dx);
              } else {
                collisionDataA = { object: B, top: true };
                collisionDataB = { object: A, bottom: true };

                if (B.static) {
                  A.y += dy;
                  getResolveRef().resolveRefA();
                } else {
                  B.y -= dy;
                  getResolveRef().resolveRefB();
                }
              }
            }
          } else if (collided && j === collisionBoxes.length - 1) {
            i = k;
            j = l;
            k = undefined;
            l = undefined;
            collided = false;
            resolve();
          }
        }
      }
    };
    resolve();
  };

  const resolveCamera = () => {
    if (pause) return;
    const allComponents = Object.values(components);

    const componentsArray = allComponents.filter(
      (component) => component.type !== "ui"
    );

    let { focus, x, y, width, height } = camera;
    if (!focus) return;
    let { scaledWidth, scaledHeight } = newDisplaySettings;

    const resolveFit = () => {
      //fit screen after all camera movememnts
      let { worldX, worldY, worldWidth, worldHeight } = currentScene;

      if (worldX > 0) {
        let dx = -worldX;
        currentScene.worldX += dx;
        componentsArray.forEach((component) => {
          component.x += dx / component.depth;
        });
      }

      if (worldX + worldWidth < scaledWidth) {
        let dx = scaledWidth - (worldX + worldWidth);
        currentScene.worldX += dx;
        componentsArray.forEach((component) => {
          component.x += dx / component.depth;
        });
      }

      if (worldY > 0) {
        let dy = -worldY;
        currentScene.worldY += dy;
        componentsArray.forEach((component) => {
          component.y += dy / component.depth;
        });
      }

      if (worldY + worldHeight < scaledHeight) {
        let dy = scaledHeight - (worldY + worldHeight);
        currentScene.worldY += dy;
        componentsArray.forEach((component) => {
          component.y += dy / component.depth;
        });
      }
    };

    /////////////////////TRACKING//////////////////////
    if (focus.x < x) {
      let dx = x - focus.x;
      currentScene.worldX += dx;
      componentsArray.forEach((component) => {
        component.x += dx / component.depth;
      });
    }

    if (focus.x + focus.width > x + width) {
      let dx = focus.x + focus.width - (x + width);
      currentScene.worldX -= dx;
      componentsArray.forEach((component) => {
        component.x -= dx / component.depth;
      });
    }

    if (focus.y < y) {
      let dy = y - focus.y;
      currentScene.worldY += dy;
      componentsArray.forEach((component) => {
        component.y += dy / component.depth;
      });
    }

    if (focus.y + focus.height > y + height) {
      let dy = focus.y + focus.height - (y + height);
      currentScene.worldY -= dy;
      componentsArray.forEach((component) => {
        component.y -= dy / component.depth;
      });
    }

    resolveFit(); //resolve fit after tracking.

    ////////////////////////SHAKE/////////////////////////////
    const xShakeValues = game.cameraShake.xValues;
    const yShakeValues = game.cameraShake.yValues;

    if (xShakeValues.length !== 0 || yShakeValues.length !== 0) {
      let xVal = xShakeValues[0] || 0;
      let yVal = yShakeValues[0] || 0;

      currentScene.worldX += xVal;
      currentScene.worldY += yVal;

      componentsArray.forEach((component) => {
        if (xShakeValues.length) {
          component.x += xVal / component.depth;
        }
        if (yShakeValues.length) {
          component.y += yVal / component.depth;
        }
      });

      resolveFit(); //resolve fit after shaking.

      xShakeValues.shift();
      yShakeValues.shift();
    }
  };

  const resolveAnimation = () => {
    validComponentsArray.forEach((component) => {
      if (pause && component.type !== "ui") return;
      if (component.animations && component.animations.currentAnimation) {
        const { frameTick, frameNumber, speed, currentAnimation } =
          component.animations;

        if (frameTick % (speed || 1) === 0) {
          const playingAnimation = component.animations[currentAnimation];
          component.animations.currentFrame = playingAnimation[frameNumber];
          component.animations.frameNumber =
            (frameNumber + 1) % playingAnimation.length;

          component.animations.frameTick = 0;
        }
        component.animations.frameTick += 1;
      }
    });
  };

  return {
    resolveControls,
    resolveUpdate,
    resolveCollisions,
    resolveCamera,
    resolveAnimation,
  };
};
