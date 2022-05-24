import './app/app.element.ts';
import { Car, NeuralNetwork, Road, Visualizer } from './app';

export const carCanvas = document.getElementById('carCanvas') as HTMLCanvasElement; //prettier-ignore
carCanvas.width = 200;

export const btnBrainSave = document.getElementById('btnBrainSave') as HTMLElement; //prettier-ignore
export const btnBrainDiscard = document.getElementById('btnBrainDiscard') as HTMLElement; //prettier-ignore

export const networkCanvas = document.getElementById('networkCanvas') as HTMLCanvasElement; //prettier-ignore
networkCanvas.width = 300;

export const carCtx = carCanvas.getContext('2d') as CanvasRenderingContext2D; // a drawing context is a way to draw on a canvas
export const networkCtx = networkCanvas.getContext('2d') as CanvasRenderingContext2D; //prettier-ignore

export const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9); // 0.9 reduces the width for showing road borders

const N = 100; // 100 cars going in parallel
export const cars = generateCars(N);
let bestCar = cars[0]; // first car but it will update on every frame

if (localStorage.getItem('bestBrain')) {
  for (let i = 0; i < cars.length; i += 1) {
    cars[i].brain = JSON.parse(localStorage.getItem('bestBrain')); // this is boring without mutation as everyone follows same patern of best car
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1); // mutate by the last parameter 0.1 is 10% of the bestBrain
    }
  }
  // bestCar.brain = JSON.parse(localStorage.getItem('bestBrain'));
} // parsing as localStorage only works with strings

export const traffic: Car[] = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(0), -500, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(1), -700, 30, 50, 'DUMMY', 2),
  new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 2),
];

// 'AI' for intelligence and 'KEYS' for keyboard -> replace AI with KEYS to Debug
export function generateCars(N) {
  const cars = [];
  for (let i = 0; i <= N; i += 1) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'));
  }
  return cars;
}

animate();

btnBrainSave.addEventListener<'click'>('click', () => {
  save();
  // console.log('save');
});
btnBrainDiscard.addEventListener<'click'>('click', () => {
  discard();
  // console.log('discard');
});

// code to save the best car in local storage
export function save() {
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}
export function discard() {
  localStorage.removeItem('bestBrain');
}

export function animate(time?: number): void {
  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].update(road.borders, []); // empty array to prevent traffic to not damage itself
  } /* can pass in empty array to keey traffic invulnerable in update */

  for (let i = 0; i < cars.length; i += 1) {
    cars[i].update(road.borders, traffic);
  }
  // create new array with only y values of car; math.min doesn't work with value so spread(...)it & return the car whose y value is the minimum of all y values
  // minimum y value = top most window height in the DOM
  bestCar = cars.find(
    (c) => (c.y === Math.min(...cars.map((c) => c.y))) as boolean
  ); // todo => add better fitness functions that rewards and penalizes the cars
  // center of lane, going too sidewards etc

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();

  const carPositionNearBottom = -1 * bestCar.y + (carCanvas.height * 70) / 100; // -car.y is top of the screen
  carCtx.translate(0, carPositionNearBottom); // moves car down from top of screen to see what's ahead of the car

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i += 1) {
    traffic[i].draw(carCtx, 'red');
  }

  carCtx.globalAlpha = 0.2; // decrease opacity of N=100 clone cars
  for (let i = 0; i < cars.length; i += 1) {
    cars[i].draw(carCtx, 'blue'); /* draw car on the canvas in the DOM */
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(
    carCtx,
    'blue',
    true
  ); /* emphasize this car's transparency and add 3rd parameter(true) */

  carCtx.restore(); // restores the canvas to its previous state from save()

  // 20220523110534 animate() -> animate(time), time is sent as a callback automatically to => reqAniFrm(animate)
  networkCtx.lineDashOffset = (-1 * time) / 50; // -1 reverses the order of linedashes animating

  Visualizer.drawNetwork(networkCtx, bestCar.brain);

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
