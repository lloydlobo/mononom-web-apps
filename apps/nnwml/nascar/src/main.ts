import { Car, Road } from './app';
import './app/app.element.ts';

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 700;

export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export const road = new Road(canvas.width / 2, canvas.width);
export const car = new Car(road.getLaneCenter(1), canvas.width / 2, 15, 25);

export function animate() {
  car.update(road.borders);

  canvas.height = 700;

  ctx.save();
  road.draw(ctx);

  car.draw(ctx);
  ctx.restore();

  requestAnimationFrame(animate);
}
animate();
