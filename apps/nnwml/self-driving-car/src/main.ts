import './app/app.element.ts';
import Car from './app/features/car';

export const canvas: HTMLCanvasElement = document.getElementById(
  'myCanvas'
) as HTMLCanvasElement;

console.log(typeof canvas);

(canvas as HTMLCanvasElement).width = 200 as number;

// a drawing context is a way to draw on a canvas
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// car dimensions in pixels (x,y,width,height) 0,0 is top left corner
export const car: Car = new Car(100, 100, 30, 50); /* now define the Car */

// add car to DOM (in the canvas)
car.draw(ctx);

animate();

export function animate() {
  car.update();
  /* transferred from global:makes it full height */
  canvas.height = window.innerHeight;
  car.draw(ctx);
  /* calls the animate() method again and again gives the illusion of movement of the car */
  requestAnimationFrame(animate);
}
