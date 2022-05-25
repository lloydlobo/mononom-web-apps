import './app/app.element.ts';
import { Car, Road } from './app';
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 700;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const car = new Car(100, 100, 30, 50);

export const road = new Road(canvas.width / 2, canvas.width * 0.9);

animate();

function animate() {
  car.update();

  canvas.height = (window.innerHeight * 70) / 100;
  road.draw(ctx);

  car.draw(ctx);
  requestAnimationFrame(animate);
}

// function animate() {
//   car.update();
//   car.draw(ctx);
//   requestAnimationFrame(animate);
// } // this makes the car draw like a brush a long line
