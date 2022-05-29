import { Controls } from './controls';
import { Sensor } from './sensor';

export class Car {
  speed: number;
  acceleration: number;
  controls: Controls;
  sensor: Sensor;
  friction: number;
  angle: number;
  // outOfBounds: any;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public maxSpeed: number = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.1618;

    this.maxSpeed = maxSpeed;
    this.friction = 0.05;

    this.angle = 0; // implemented to curb car going past maxSpeed diagonally

    this.sensor = new Sensor(this);

    this.controls = new Controls();

    // this.outOfBounds = false;
  }

  update() {
    this.move();
    this.sensor.update();
  }

  private move() {
    if (this.controls.forward) this.speed += this.acceleration; //this.y -= 2;
    if (this.controls.reverse) this.speed -= this.acceleration; //this.y += 2;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2; // reverse as -speed is reversing on y plane? what if it's circular?
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0; // fix constant movement at restore

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) this.angle += 0.03 * flip; // this.x -= 2; => // this.angle += 0.03; // implement basics first then advance later -- based on unit circle  this will be the coordinate system for rotations in draw(ctx) save the context and translate to the point where you want the rotation to be centered at. @see https://img1.wikia.nocookie.net/__cb20140408175825/math/en/images/8/87/Unit_circle_indentities.png (IMAGE)
      if (this.controls.right) this.angle -= 0.03 * flip; // this.angle -= 0.03; => // this.x += 2;
    } // @param flip to fix reverse switched directions & angle to turn by unit circle

    const scaleBySpeedOfY = this.speed,
      turnByAngleX = Math.sin(this.angle),
      turnByAngleY = Math.cos(this.angle);
    this.x -= turnByAngleX * scaleBySpeedOfY; // y vertical window speed
    this.y -= turnByAngleY * scaleBySpeedOfY; // this.y -= this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y); // then remove this.x - this.width / 2 etc from rect() as we are already translating it here
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // x will be center
    ctx.fill();

    ctx.restore(); // after translating at each frame infinite series happen so restore it

    this.sensor.draw(ctx);
  }
}

// Language: typescript
//
// ARCHIVE
//

// * 202205221228

// draw(ctx: CanvasRenderingContext2D) {
//   ctx.save();
//   ctx.translate(this.x, this.y); // then remove this.x - this.width / 2 etc from rect() as we are already translating it here
//   ctx.rotate(-this.angle);

//   ctx.beginPath();
//   ctx.rect(
//     this.x - this.width / 2,
//     this.y - this.height / 2,
//     this.width,
//     this.height
//   );
//   // x will be center
//   ctx.fill();
//   // ctx.restore();
// }
