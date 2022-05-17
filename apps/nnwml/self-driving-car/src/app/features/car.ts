import Controls from './controls';

export default class Car {
  acceleration: number;
  angle: number;
  controls: Controls;
  friction: number;
  height: number;
  maxSpeed: number;
  speed: number;
  width: number;
  x: number;
  y: number;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    /* implement some friction */
    this.maxSpeed = 3; /* diagonally it's buggy => define an angle */
    this.friction = 0.05;
    this.angle = 0; /* works according to unit circle rotated 90deg counter clockwise
    as value of 0 is upwards*/

    this.controls = new Controls();
  }

  // write an update method using the Controls class values and import Controls class in main.ts
  update() {
    /* -speed indicates that car is going backwards since its a 2d x,y dimension */
    const maxSpeedReverse: number = (-1 * this.maxSpeed) / 2;
    if (this.controls.forward) {
      this.speed += this.acceleration; /* // this.y -= 5; */
    }
    if (this.controls.reverse) {
      // this.y += 5;
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < maxSpeedReverse) {
      this.speed = maxSpeedReverse;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    /* the car still moves slightly so this fixes it */
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // left right controls
    if (this.controls.left) {
      this.angle += 0.03;
    }
    if (this.controls.right) {
      this.angle -= 0.03;
    }

    /* setting 0 speed => at rest */
    this.y -= this.speed;
  }

  /* now call animate() method in main.ts */

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle); /* next remove this.x, this.y
    from ctx.rect( -this.width,height) */

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill(); /* context fills the rectangle with the rect defined values */

    ctx.restore(); /* avoids infinite series of translations and rotations */
  }
}

// define as custom element
// window.customElements.define('car-element', Car);
