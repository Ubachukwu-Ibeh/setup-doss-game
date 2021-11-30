import { game } from "../game.js";
import {
  keys,
  resolveComponents,
  cameraSettings,
  components,
} from "../globals/globals.js";

export const engine = (newDisplayDetails) => {
  const validComponents = resolveComponents(newDisplayDetails);
  const validComponentsArray = Object.values(validComponents);

  const resolveControls = () => {
    validComponentsArray.forEach((component) => {
      if (component.controls) {
        Object.keys(keys)
          .filter((key) => {
            if (keys[key] === true) {
              return key;
            }
          })
          .forEach((key) => {
            const cmd = component.controls[key];
            if (cmd) {
              cmd();
            }
          });
      }
    });
    //resolve touch ...

    //resolve pad ...
  };

  const resolveUpdate = () => {
    validComponentsArray.forEach((component) => {
      if (component.update) {
        component.update();
      }
    });
  };

  const resolveCollisions = () => {
    const rigidBodies = validComponentsArray.filter((component) => {
      if (component.rigidBody === true) {
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
      for (i; i < rigidBodies.length; i++) {
        j = 0;
        for (j; j < rigidBodies.length; j++) {
          if (i === j) continue;

          const A = rigidBodies[i];
          const B = rigidBodies[j];

          if (testForCollision(A, B)) {
            collided = true;
            k = i;
            l = j;
            const resolveX = () => {
              if (A.x < B.x) {
                return A.x + A.width - B.x;
              } else {
                return -(B.x + B.width - A.x);
              }
            };

            const resolveRefA = () => {
              resolve();
            };

            const resolveRefB = () => {
              i = j;
              resolve();
            };

            if (A.y < B.y) {
              let dx = resolveX(),
                dy = A.y + A.height - B.y;

              if (Math.abs(dx) < dy) {
                if (B.static) {
                  A.x -= dx;
                  resolveRefA();
                } else {
                  B.x += dx;
                  resolveRefB();
                }
              } else {
                if (B.static) {
                  A.y -= dy;
                  resolveRefA();
                } else {
                  B.y += dy;
                  resolveRefB();
                }
              }
            } else {
              let dx = resolveX(),
                dy = B.y + B.height - A.y;

              if (Math.abs(dx) < dy) {
                if (B.static) {
                  A.x -= dx;
                  resolveRefA();
                } else {
                  B.x += dx;
                  resolveRefB();
                }
              } else {
                if (B.static) {
                  A.y += dy;
                  resolveRefA();
                } else {
                  B.y -= dy;
                  resolveRefB();
                }
              }
            }

            if (A.onCollision) A.onCollision();
            if (B.onCollision) B.onCollision();
          } else if (collided && j === rigidBodies.length - 1) {
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

  const resolveGravity = () => {
    Object.keys(validComponents).forEach((key) => {
      const component = validComponents[key];

      if (component.gravity === true) {
        component.y += component * (game.gravity / 100);
      }
    });
  };

  const resolveCamera = () => {
    let { focus, focusAreaX, focusAreaY, focusAreaW, focusAreaH } =
      cameraSettings;

    const componentsArray = Object.values(components);

    if (focus.x < focusAreaX) {
      const dx = focusAreaX - focus.x;
      componentsArray.forEach((component) => {
        component.x += dx;
      });
    }
    if (focus.x + focus.width > focusAreaX + focusAreaW) {
      const dx = focus.x + focus.width - (focusAreaX + focusAreaW);
      componentsArray.forEach((component) => {
        component.x -= dx;
      });
    }
    if (focus.y < focusAreaY) {
      const dy = focusAreaY - focus.y;
      componentsArray.forEach((component) => {
        component.y += dy;
      });
    }
    if (focus.y + focus.height > focusAreaY + focusAreaH) {
      const dy = focus.y + focus.height - (focusAreaY + focusAreaH);
      componentsArray.forEach((component) => {
        component.y -= dy;
      });
    }
  };

  return {
    resolveControls,
    resolveUpdate,
    resolveCollisions,
    resolveCamera,
    resolveGravity,
  };
};
