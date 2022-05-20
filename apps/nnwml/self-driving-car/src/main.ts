import './app/app.element.ts';
import './app/features/road';
import { Car, Road } from './app';

/**

 █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗███████╗
██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝
███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   █████╗
██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝
██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

  */

export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement; // object
canvas.width = 200;
// a drawing context is a way to draw on a canvas
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const road = new Road(
  (canvas.width / 2) as number,
  (canvas.width * 0.9) as number
);
/* car dimensions in pixels (x,y,width,height) 0,0 is top left corner */
/* getLaneCenter(1) puts the car in the middle => 0 , 1 , 2 */
export const car: Car = new Car(road.getLaneCenter(1), 100, 30, 50);

car.draw(ctx); /* draw car on the canvas in the DOM */

animate();

export function animate(): void {
  car.update();
  /* transferred from global:makes it full height */
  canvas.height = window.innerHeight;
  // illusion of a camera above the car
  ctx.save();
  const carPositionNearBottom = -1 * car.y + (canvas.height * 70) / 100; // -car.y is top of the screen
  ctx.translate(0, carPositionNearBottom); // moves car down from top of screen to see what's ahead of the car

  road.draw(ctx);
  car.draw(ctx);

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
