import { lerp } from '../utils';
import { Car } from './car';

export type RaysType = {
  x: number;
  y: number;
}[][];

export interface RayPointsInterface {
  x: number;
  y: number;
}

export class Sensor {
  car: Car;
  rays: RaysType;
  rayCastCount: number;
  rayCastLength: number;
  rayCastSpread: number;
  rayCount: number;
  constructor(car: Car) {
    this.car = car;

    this.rayCastCount = 5;
    this.rayCastLength = 66;
    this.rayCastSpread = Math.PI / 2;

    // this.rays = [] as RaysType;
    this.rays = [] as RaysType;
  }

  public update() {
    this.castRays();
  }

  private castRays() {
    this.rays = [] as RaysType;
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle: number =
        lerp(
          this.rayCastSpread / 2,
          -this.rayCastSpread / 2,
          this.rayCastCount === 1 ? 0.5 : i / (this.rayCastCount - 1)
        ) + this.car.angle;

      const start: RayPointsInterface = {
        x: this.car.x,
        y: this.car.y,
      };
      const end: RayPointsInterface = {
        x: this.car.x - Math.sin(rayAngle) * this.rayCastLength,
        y: this.car.y + Math.cos(rayAngle) * this.rayCastLength,
      };

      this.rays.push([start, end]);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // this.rays = [] as RaysType;
    // console.dir(this.rays);
    // const rayAngle: number =
    //   lerp(this.rayCastSpread / 2, -this.rayCastSpread / 2, 0.5) -
    //   this.car.angle;

    for (let i = 0; i < this.rayCastCount; i++) {
      const rayAngle: number =
        lerp(
          this.rayCastSpread / 2,
          -this.rayCastSpread / 2,
          this.rayCastCount === 1 ? 0.5 : i / (this.rayCastCount - 1)
        ) - this.car.angle;

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 2;
      ctx.moveTo(this.car.x, this.car.y);
      ctx.lineTo(
        this.car.x + Math.sin(rayAngle) * this.rayCastLength,
        this.car.y - Math.cos(rayAngle) * this.rayCastLength
      );
      ctx.stroke();
    }
    // try {
    //   for (let i = 0; i < this.rayCastCount; i++) {
    //     ctx.beginPath();
    //     ctx.lineWidth = 2;
    //     ctx.strokeStyle = '#00ffff';
    //     ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
    //     ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
    //     ctx.stroke();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // this.rays.map((ray) => {
    //   ctx.beginPath();
    //   ctx.moveTo(ray[0].x, ray[0].y);
    //   ctx.lineTo(ray[1].x, ray[1].y);
    //   ctx.stroke();
    // });
    // this.rays.forEach((ray) => {
    //   ctx.beginPath();
    //   ctx.moveTo(ray[0].x, ray[0].y);
    //   ctx.lineTo(ray[1].x, ray[1].y);
    //   ctx.stroke();
    // });
  }
}
