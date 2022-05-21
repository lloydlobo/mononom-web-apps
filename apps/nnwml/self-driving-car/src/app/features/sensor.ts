// import { ctx } from '../../main';
import { getIntersection, lerp } from '../utils';
import { Car } from './car';
export type RoadBordersType = { x: number; y: number }[][];

type RayType = { x: number; y: number }[];
type RaysType = { x: number; y: number }[][];
type ReadingsType = { x: number; y: number }[];
type TouchType = { x: number; y: number; offset: number };

export class Sensor {
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: RaysType;
  car: Car;
  readings: ReadingsType;
  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = (Math.PI / 2) as number; // PI => ratio of the circumference of a circle to its diameter.

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders: RoadBordersType, traffic): void {
    this.castRays() as void;
    this.readings = [] as ReadingsType;
    for (let i = 0; i < this.rays.length; i++) {
      // const ray = this.rays[i];
      // const closest = this.getClosestIntersection(ray, roadBorders);
      // this.readings.push(closest);
      this.readings.push(this.getReading(
        this.rays[i],
        roadBorders,
        traffic));
    }
  }

  private getReading(ray: RayType, roadBorders: RoadBordersType, traffic): TouchType {
    const touches: TouchType[] = []; // from rowborders to polygon segments after adding traffic property

    for (let i = 0; i < roadBorders.length; i++) {
      const touch: TouchType = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );

      if (touch) {
        touches.push(touch);
      } // can be null if no segments intersect
    }

    // traffic
    for (let i = 0; i < traffic.length; i += 1) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j += 1) {
        const value = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]) as {
          x: number;
          y: number;
          offset: number;
        };
        if (value) {
          touches.push(value);
        }
      }
    }

    if (touches.length === 0) {
      return null;
    } else {
      const offsets: number[] = touches.map((element) => element.offset);
      const minOffset: number = Math.min(...offsets); // Math.min() doesn't take an array as an argument so we spread it out with ... (spread operator)
      return touches.find(
        (element) => element.offset === minOffset
      ) as TouchType; // find() returns the first element that matches the condition
    } // returns also an offset: 0.9 e.g. => apart from x, y
  }

  private castRays(): void {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle: number =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle; // lerp(start, end, amt)

      const start = { x: this.car.x, y: this.car.y }; // unit circle -> Math.sin(rayAngle) = 1px radius and scale with this.rayLength
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      // way of defining elements the same way as in borders -> road.ts (consistency)
      this.rays.push([start, end]);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i += 1) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      // prettier-ignore
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y); // start, end points
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      // prettier-ignore
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y); // start, end points
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}

/*
https://ascii-generator.site/r/w1sxOl/

%%%*-:.                                                                   .:-*%%
%%-                                                                           :#
%-                                      ::                                     =
%:                        .:.           ::            .:.                      -
%:                         ::           ::           .:.                       -
%:                          ::          ::          .::                        -
%:                          .::         ::          ::                         -
%:                           .:.        ::         ::.                         -
%:                            .:.       ::        .:. .:::.                    -
%:                             .:.      ::       .:.  .::::.     /             -
%:                              ::      ::      .:. .:::..     /               -
%:                              .::     ::      :.  :::::.  100                -
%:                               .:.    ::    .::     ...  /                   -
%:                                .:.   ::    ::  :::::. /                     -
%:                                 ::. .::.  .:.     .:.                       -
%:                                  :::.::.:::.                                -
%:                                  :=-:-=--=:                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  *@@@@@@@@+                                 -
%:                                  =********-                                 -
%:                                                                             -
%:                                                                             -
%:                                                                             -
%:                                                                             -
%:                                      ^                                      -
%:                                      :                                      -
%:                                    0 :                                      -
%:                                      :                                      -
%:                                :-::::=-:::::.                               -
%:                          .:::::.     :      .::::.                          -
%:                       .::.           :            :::                       -
%:                     :+:              :.              :-                     -
%:                   :-. :..............:..               :-                   -
%:                 .-.   . :.           :..                 --                 -
%:                ::     .   :.         :..                  .-                -
%:               ::      .    .:    α   :..                    +               -
%:              .-       .     :.       :..  cos(α)             .+             -
%:              +        .    1   :   . :..                     .-             -
%:             -:        .         .-   :..                      = :  𝜋        -
%:             +         .           :. :..                      -.  -——       -
%:             =         .             :-:.                      ::   2        -
%:      <......+........:---------------=........................-=.......     -
%:         𝜋   +             sin(α)     :                        ::            -
%:        ——-  +.                       :                        =             -
%:         2    +                       :                        -             -
%:              ::                      :                       =.             -
%:               -                      :                      -:              -
%:                =.                    :                     -.               -
%:                 -:                   :                    =.                -
%:                  :-.                 :                  :-                  -
%:                    :-:               :                :-                    -
%:                      .--             :             .--                      -
%:                         ::::         :         .:::.                        -
%:                             .::::::::-:::::::::.                            -
%:                                      :                                      -
%:                                      : 𝜋                                    -
%:                                      :                                      -
%*                                      :                                      *
#%*:                                                                         :#%


*/
