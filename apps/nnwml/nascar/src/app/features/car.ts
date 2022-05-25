import { Controls } from './controls';

export class Car {
  speed: number;
  acceleration: number;
  controls: Controls;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.1618;

    this.controls = new Controls();
  }

  update() {
    this.move();
  }

  private move() {
    if (this.controls.forward) {
      this.y -= 2;
      // this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.y += 2;
      // this.speed -= this.acceleration;
    }
    this.x -= this.speed;
    this.y -= this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.save();
    // ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    // x will be center
    ctx.fill();
    // ctx.restore();
  }
}
