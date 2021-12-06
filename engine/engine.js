import { game } from "../game.js";
import {
  keys,
  resolveComponents,
  components,
  currentScene,
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
      let collisionDataA, collisionDataB;

      for (i; i < rigidBodies.length; i++) {
        j = 0;
        for (j; j < rigidBodies.length; j++) {
          if (i === j) continue;

          const A = rigidBodies[i];
          const B = rigidBodies[j];

          if (testForCollision(A, B)) {
            A.isColliding = true; //for view rendering
            B.isColliding = true; //for view rendering

            collided = true;
            k = i;
            l = j;
            const resolveX = () => {
              if (A.x < B.x) {
                collisionDataA = { object: B, right: true };
                collisionDataB = { object: A, left: true };
                return A.x + A.width - B.x;
              } else {
                collisionDataA = { object: B, left: true };
                collisionDataB = { object: A, right: true };
                return -(B.x + B.width - A.x);
              }
            };

            const getResolveRef = () => {
              if (A.onCollision) A.onCollision(collisionDataA);
              if (B.onCollision) B.onCollision(collisionDataB);

              const resolveRefA = () => {
                resolve();
              };

              const resolveRefB = () => {
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
                dy = A.y + A.height - B.y;

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
                dy = B.y + B.height - A.y;

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

  const resolveCamera = () => {
    let { focus, x, y, width, height } = game.camera;
    let { worldX, worldY, worldWidth, worldHeight } = currentScene;
    let { scaledWidth, scaledHeight } = newDisplayDetails;

    const componentsArray = Object.values(components);

    if (focus.x < x) {
      let dx = x - focus.x;

      if (worldX + dx > 0) dx = -worldX;

      currentScene.worldX += dx;

      componentsArray.forEach((component) => {
        component.x += dx;
      });
    }
    if (focus.x + focus.width > x + width) {
      let dx = focus.x + focus.width - (x + width);

      if (worldX + worldWidth - dx < scaledWidth)
        dx = worldX + worldWidth - scaledWidth;

      currentScene.worldX -= dx;

      componentsArray.forEach((component) => {
        component.x -= dx;
      });
    }
    if (focus.y < y) {
      let dy = y - focus.y;

      if (worldY + dy > 0) dy = -worldY;

      currentScene.worldY += dy;

      componentsArray.forEach((component) => {
        component.y += dy;
      });
    }
    if (focus.y + focus.height > y + height) {
      let dy = focus.y + focus.height - (y + height);

      if (worldY + worldHeight - dy < scaledHeight)
        dy = worldY + worldHeight - scaledHeight;

      currentScene.worldY -= dy;

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
  };
};
