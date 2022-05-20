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

  private createPolygon(): { x: number, y: number }[] {
    const points: { x: number, y: number }[] = []; // 1 point per corner of car -> you can add more
    const rad: number = Math.hypot(this.width, this.height) / 2; // hypotenuse of car -> Returns the square root of the sum of squares of its arguments.
    const alpha: number = Math.atan2(this.width, this.height); // no need to divide by 2 as the angle is the same no matter the way you look at it

    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    }); // top right corner (point)
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    }); // top left corner (point)
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points as {x: number, y: number}[];
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

/*


z*r_;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;I-n*
z-.                                                                  .(
  c`                                      width                        ;
  c`                  .                                           .    :
c`                 < ...........................................>    :
c`               ^.!MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMcI.   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$$$v~*'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$$r?BB'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$$$\)$$B'   :
/`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$$@?/$$$B'   :
/`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$$W~c$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$$M+8$$$$$B'   :
x'               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$$$$$$r_%$$$$$$B'   :
{`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$     $$$${1$$$$$$$$B'   :
v`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$  α  $$$[x$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ +........+c$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$$v+     /    $$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$$r?@  radius  $$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$$$\)$$  /       $$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$$B?t$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $$W~c$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ $M+%$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$ r_%$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$@[,~@$$$$$$$$$$$$$$$$$$$B'   :
c`    height     . ~$$$$$$$$$$$$$$$$$$$$@l^/$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
/`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
1'               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               . ~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
c`               v.~$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$B'   :
z;                 .'''''''''''''''''''''''''''''''''''''''''''''    ?
z*r_;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;I-n*





*/
