import { getIntersection, lerp } from '../utils';
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
  readings: any[];
  constructor(car: Car) {
    this.car = car;

    this.rayCastCount = 5;
    this.rayCastLength = 66;
    this.rayCastSpread = Math.PI / 2;

    // this.rays = [] as RaysType;
    this.rays = [] as RaysType;
    this.readings = [];
  }

  public update(roadBorders) {
    this.castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.checkForCollision(this.rays[i], roadBorders));
    }
  }

  private checkForCollision(ray, roadBorders) {
    // check to see where the rays touches the borders
    const touches = [];

    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (touch) {
        console.log('touch', touch);
        touches.push(touch);
      }
    }
    if (touches.length === 0) {
      console.log('no touches');
      return null;
    } else {
      console.log('touches', touches);
      const offsets = touches.map((e) => e.offset);
      const minOffset = Math.min(...offsets);

      return touches.find((e) => e.offset === minOffset);
    }
  }
  // run() {
  //   this.castRays();
  // }

  private castRays() {
    this.rays = [] as RaysType;

    for (let i = 0; i < this.rayCount || 5; i++) {
      const rayAngle: number =
        lerp(
          this.rayCastSpread / 2,
          -this.rayCastSpread / 2,
          this.rayCastCount === 1 ? 0.5 : i / (this.rayCastCount - 1)
        ) - this.car.angle;

      const start: RayPointsInterface = {
        x: this.car.x,
        y: this.car.y,
      };
      const end: RayPointsInterface = {
        x: this.car.x - Math.sin(rayAngle) * this.rayCastLength,
        y: this.car.y + Math.cos(rayAngle) * this.rayCastLength,
      };
      console.log({ i });
      try {
        this.rays.push([start, end]);
        console.log(`caster rays, push done`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
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

    try {
      for (let i = 0; i < this.rayCastCount; i++) {
        let end = this.rays[i][1];
        if (this.readings[i]) {
          end = this.readings[i];
        }

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';
        ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
