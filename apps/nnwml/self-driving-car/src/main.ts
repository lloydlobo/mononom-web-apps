import './app/app.element.ts';
import './app/features/road';
import './app/features/sensor';
import './app/features/car';
import { Car, Road } from './app';

export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement; // object
canvas.width = 200;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; // a drawing context is a way to draw on a canvas

export const road = new Road(canvas.width / 2, canvas.width * 0.9);

export const car: Car = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI');
export const traffic: Car[] = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
];

animate();

export function animate(): void {
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].update(road.borders, []); // empty array to prevent traffic to not damage itself
  } /* can pass in empty array to keey traffic invulnerable in update */
  car.update(road.borders, traffic);

  canvas.height = window.innerHeight;

  ctx.save();
  const carPositionNearBottom = -1 * car.y + (canvas.height * 70) / 100; // -car.y is top of the screen

  ctx.translate(0, carPositionNearBottom); // moves car down from top of screen to see what's ahead of the car

  road.draw(ctx);

  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].draw(ctx, 'red');
  }
  car.draw(ctx, 'blue'); /* draw car on the canvas in the DOM */

  ctx.restore(); // restores the canvas to its previous state from save()
  requestAnimationFrame(animate); // calls the animate() method again and again gives the illusion of movement of the car
}

// ============================================================================

/**

   █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗
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
