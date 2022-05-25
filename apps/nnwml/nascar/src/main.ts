import './app/app.element.ts';
import { Car, Road } from './app';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 700;

const canvasWidth = canvas.width;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const car = new Car(canvasWidth * 0.94, canvasWidth / 2, 30, 50);

export const road = new Road(canvas.width / 2, canvas.width * 1);

animate();

function animate() {
  car.update();

  canvas.height = 700;
  // canvas.height = (window.innerHeight * 70) / 100;
  road.draw(ctx);

  car.draw(ctx);
  requestAnimationFrame(animate);
}

// function animate() {
//   car.update();
//   car.draw(ctx);
//   requestAnimationFrame(animate);
// } // this makes the car draw like a brush a long line
