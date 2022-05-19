import './app/app.element.ts';
import './app/features/road';
import { Car, Road } from './app';
export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement; // object
canvas.width = 200;

// a drawing context is a way to draw on a canvas
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const road = new Road((canvas.width / 2) as number, canvas.width as number);
// car dimensions in pixels (x,y,width,height) 0,0 is top left corner
export const car: Car = new Car(100, 100, 30, 50); /* now define the Car */

// add car to DOM (in the canvas)
car.draw(ctx);

animate();

export function animate() {
  car.update();
  /* transferred from global:makes it full height */
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  /* calls the animate() method again and again gives the illusion of movement of the car */
  requestAnimationFrame(animate);
}
