import { Controls } from './controls';

export class Car {
  speed: number;
  acceleration: number;
  controls: Controls;
  friction: number;
  angle: number;

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

    this.controls = new Controls();
  }

  update() {
    this.move();
  }

  private move() {
    if (this.controls.forward) {
      // this.y -= 2;
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      // this.y += 2;
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2; // reverse as -speed is reversing on y plane? what if it's circular?
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    // fix constant movement at restore
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    /**
     * implement basics first then advance later -- based on unit circle
     * this will be the coordinate system for rotations
     * in draw(ctx) save the context and translate to the point where you want the rotation to be centered at
     * @param angle
     * @see https://img1.wikia.nocookie.net/__cb20140408175825/math/en/images/8/87/Unit_circle_indentities.png (IMAGE)
     * */
    if (this.controls.left) {
      // this.x -= 2;
      this.angle += 0.03;
    }
    if (this.controls.right) {
      this.angle -= 0.03;
      // this.x += 2;
    }

    // this.x -= this.speed;
    this.y -= this.speed;
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
