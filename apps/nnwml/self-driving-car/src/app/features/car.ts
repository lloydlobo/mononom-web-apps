import { Controls } from './controls';
import { Sensor } from './sensor';

export class Car {
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
  sensor: Sensor;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3; /* diagonally it's buggy => define an angle */
    this.friction = 0.05;
    this.angle = 0; /* works according to unit circle rotated 90deg counter clockwise
    as value of 0 is upwards*/

    this.sensor = new Sensor(this);
    // define this.rays as an array of sensor.rays.length
    this.sensor.rays = [];
    this.controls = new Controls();
  }

  // write an update method using the Controls class values and import Controls class in main.ts
  update(roadBorders) {
    this.move();
    this.sensor.update(roadBorders);
  }

  private move(): void {
    /* -speed indicates that car is going backwards since its a 2d x,y dimension */
    const maxSpeedReverse: number = (-1 * this.maxSpeed) / 2;
    if (this.controls.forward) {
      this.speed += this.acceleration; /* // this.y -= 5; */
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration; // this.y += 5;
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
    /**
     * to fix => car spinning in place reversing and reversing the other way. left <-> right flipped * +ve speed is forward, -ve speed is backwards
     * Box2D is a great library for physics and collision detection
     * */
    if (this.speed !== 0) {
      const flip: 1 | -1 = ((this.speed > 0) as boolean) ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    // based on unit circle & scale it with value of speed
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    // this.y -= this.speed; /* don't need this anymore after sin, cos */
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

    try {
      this.sensor.draw(ctx);
    } catch (error) {
      console.log(error);
    } // TypeError: this.rays[r] is undefined
  }
}

// define as custom element
// window.customElements.define('car-element', Car);
