import { Car, Road, Visualizer } from './app';
// we include our base SASS here to ensure it is loaded
// and applied before any component specific style -> tip from MDN
// import './app.element.scss';
import './app/app.element.ts';
// import './app/features/road';
// import './app/features/sensor';
// import './app/features/car';

export const carCanvas =
  document.getElementById('carCanvas') as HTMLCanvasElement;
carCanvas.width = 200;

export const networkCanvas =
  document.getElementById('networkCanvas') as HTMLCanvasElement;
networkCanvas.width = 300;

export const carCtx =
  carCanvas.getContext('2d') as CanvasRenderingContext2D; // a drawing context is a way to draw on a canvas
export const networkCtx =
  networkCanvas.getContext('2d') as CanvasRenderingContext2D;

export const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9); // 0.9 reduces the width for showing road borders

// 'AI' for intelligence and 'KEYS' for keyboard -> replace AI with KEYS to Debug
export const car: Car = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI');
export const traffic: Car[] = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
];

animate();

export function animate(time?: number): void {
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].update(road.borders, []); // empty array to prevent traffic to not damage itself
  } /* can pass in empty array to keey traffic invulnerable in update */
  car.update(road.borders, traffic);
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();

  const carPositionNearBottom = -1 * car.y + (carCanvas.height * 70) / 100; // -car.y is top of the screen
  carCtx.translate(0, carPositionNearBottom); // moves car down from top of screen to see what's ahead of the car
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].draw(carCtx, 'red');
  }
  car.draw(carCtx, 'blue'); /* draw car on the canvas in the DOM */
  carCtx.restore(); // restores the canvas to its previous state from save()
  // 20220523110534 animate() -> animate(time), time is sent as a callback automatically to => reqAniFrm(animate)
  networkCtx.lineDashOffset = (-1 * time) / 50; // -1 reverses the order of linedashes animating
  Visualizer.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate); // calls the animate() method again and again gives the illusion of movement of the car
}

// console.table(car.brain.levels[0]); // log this  regularly to check values of biases, weights, etc; as small mistakes can creep in anytime.

// ============================================================================

/**

  ╔█████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝
  ███████║██████╔╝██║     ███████║██║██║   ██║█████╗
  ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝
  ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝

  */
/* car dimensions in pixels (x,y,width,height) 0,0 is top left corner */
/* getLaneCenter(1) puts the car in the middle => 0 , 1 , 2 */

// ----------------------------------------------------------------------------
/**
 * 20220522130214
 * The CanvasRenderingContext2D interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a element. It is used for drawing shapes, text, images, and other objects.
 * Add: networkCanvas
 */
/**
 * 20220519184813
 *
 * ctx.translate(0, -car.y); // moves car down from top of screen
 *
 * const carPositionNearBottom = -1 * car.y + (canvas.height * 70) / 100; // -car.y is top of the screen
 * console.log(carPositionNearBottom); // forward goes from 0 to 100000, backward goes from 0 to -100000
 */

/**
 * 20220519182625
 *
 * console.log(road.borders); =>
 *
 * Array [ (2) […], (2) […] ]
 *  0: Array [ {…}, {…} ]
 *    0: Object { x: 10, y: -1000000 }
 *    1: Object { x: 10, y: 1000000 }
 *    length: 2
 *    <prototype>: Array []
 *  1: Array [ {…}, {…} ]
 *    0: Object { x: 190, y: -1000000 }
 *    1: Object { x: 190, y: 1000000 }
 *    length: 2
 *    <prototype>: Array []
 * */

// ----------------------------------------------------------------------------

// (May 19th, 2022 4:42 PM
// export const car: Car = new Car(100, 100, 30, 50); /* now define the Car */

// ----------------------------------------------------------------------------
