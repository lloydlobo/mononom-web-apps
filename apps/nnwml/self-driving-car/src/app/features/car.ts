import { Controls } from './controls';
import { Sensor, RoadBordersType } from './sensor';
import { polysIntersect } from '../utils';

export type PointsType = { x: number; y: number }[];
/**
 * Car Class
 * @date 5/20/2022 - 9:04:45 PM
 *
 * @export
 * @class Car
 * @typedef {Car}
 */
export class Car {
  x: number;
  y: number;
  width: number;
  height: number;

  acceleration: number;
  angle: number;
  controls: Controls;
  friction: number;
  maxSpeed: number;
  polygon: PointsType;
  sensor: Sensor;
  speed: number;
  damaged: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    controlType: string,
    maxSpeed = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed; /* diagonally it's buggy => define an angle */
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    if (controlType != 'DUMMY') {
      this.sensor = new Sensor(this)
    }
    this.controls = new Controls(controlType);
  }

  // type RoadBordersType = {}
  // write an update method using the Controls class values and import Controls class in main.ts
  update(roadBorders: RoadBordersType, traffic): void {
    if (!this.damaged) {
      this.move() as void;
      this.polygon = this.createPolygon();
      this.damaged = this.assessDamage(roadBorders, traffic);
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
    }
  }

  private assessDamage(roadBorders: RoadBordersType, traffic): boolean {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  private createPolygon() {
    const points: PointsType = [];
    const rad: number = Math.hypot(this.width, this.height) / 2;
    const alpha: number = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points as { x: number; y: number }[];
  }

  private move(): void {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    const maxSpeedReverse: number = -this.maxSpeed / 2;
    if (this.speed < maxSpeedReverse) {
      this.speed = maxSpeedReverse;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip: 1 | -1 = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, color) {
    if (this.damaged) {
      ctx.fillStyle = 'grey';
    } else {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

    for (let i = 1; i < this.polygon.length; i += 1) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    if (this.sensor) {
      this.sensor.draw(ctx);
    } // controlType = 'Dummy' do not get sensors
  }
}

// define as custom element
// window.customElements.define('car-element', Car);

/**
 * CAR DIAGRAM
 *
 *  z*r_;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;I-n*
 *  z-.                                                                  .(
 *    c`                                      width                        ;
 *    c`                  .                                           .    :
 *  c`                 < ...........................................>    :
 *  c`               ^.!MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMcI.   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$$$v~*'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$$r?BB'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$\)$$B'   :
 *  /`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$@?/$$$B'   :
 *  /`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$W~c$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$M+8$$$$$B'   :
 *  x'               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$r_%$$$$$$B'   :
 *  {`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$     $$$${1$$$$$$$$B'   :
 *  v`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$  α  $$$[x$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ +........+c$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$v+     /    $$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$r?@  radius  $$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$\)$$  /       $$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$B?t$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$W~c$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $M+%$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$ r_%$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$@[,~@$$$$$$$$$$$$$$$$$$$B'   :
 *  c`    height     . ~$$$$$$$$$$$$$$$$$$$$@l^/$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  /`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  1'               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  c`               v.~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
 *  z;                 .'''''''''''''''''''''''''''''''''''''''''''''    ?
 *  z*r_;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;I-n*
 *
 * */

/**
 * ARCHIVE
 *
 * 20220520174006
 * before createPolygon() was featured to replace this type of code
 */

//  draw(ctx: CanvasRenderingContext2D) {
//   ctx.save();
//   ctx.translate(this.x, this.y);
//   ctx.rotate(-this.angle); /* next remove this.x, this.y
//   from ctx.rect( -this.width,height) */

//   ctx.beginPath();
//   ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
//   ctx.fill(); /* context fills the rectangle with the rect defined values */

//   ctx.restore(); /* avoids infinite series of translations and rotations */

//   try {
//     this.sensor.draw(ctx);
//   } catch (error) {
//     console.log(error);
//   } // TypeError: this.rays[r] is undefined
// }
