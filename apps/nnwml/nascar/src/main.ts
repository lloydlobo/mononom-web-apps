import { Car, Road } from './app';
import './app/app.element.ts';

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 700;

export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export const road = new Road(canvas.width / 2, canvas.width);
export const car = new Car(road.getLaneCenter(1), canvas.width / 2, 15, 25);

// const traffic = [
//   new Car(road.getLaneCenter(1), canvasWidth / 2, 15, 25),
//   new Car(road.getLaneCenter(2), canvasWidth / 2, 15, 25),
//   new Car(road.getLaneCenter(3), canvasWidth / 2, 15, 25),
//   new Car(road.getLaneCenter(4), canvasWidth / 2, 15, 25),
//   new Car(road.getLaneCenter(5), canvasWidth / 2, 15, 25),
// ];

export function animate() {
  car.update();

  canvas.height = 700;
  // canvas.height = (window.innerHeight * 70) / 100;

  ctx.save();
  // if (car.outOfBounds) {
  //   ctx.translate(-car.x + canvas.width / 2, -car.y + canvas.height / 2);
  // }
  road.draw(ctx);

  car.draw(ctx);
  ctx.restore();
  // traffic.forEach((car) => {
  //   car.draw(ctx);
  // });

  requestAnimationFrame(animate);
}
animate();

// function animate() {
//   car.update();
//   car.draw(ctx);
//   requestAnimationFrame(animate);
// } // this makes the car draw like a brush a long line
