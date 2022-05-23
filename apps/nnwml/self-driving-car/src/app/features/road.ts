import { lerp } from '../utils/lerp';
/*
██████╗  ██████╗  █████╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗
██████╔╝██║   ██║███████║██║  ██║
██╔══██╗██║   ██║██╔══██║██║  ██║
██║  ██║╚██████╔╝██║  ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝

 */
/**
 * Class Road to draw the road for the car to drive on
 * Initiate it with --> `const road = new Road(canvas.width / 2, canvas.width * 0.9);`
 * @date 5/19/2022 - 6:21:19 PM
 *
 * @export
 * @class Road
 * @typedef {Road}
 */
export class Road {
  borders: { x: number; y: number }[][];
  bottom: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  constructor(x: number, width: number, laneCount = 3 as number) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = (x - width / 2) as number;
    this.right = (x + width / 2) as number;

    const infinity = 1000000; // using JS infinity may cause problems when drawing // want the road to go infinitely downwards
    this.top = -infinity as number;
    this.bottom = infinity as number;

    /* add collision detection - highways or complicated situations */
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ] as { x: number; y: number }[][]; /* console => road.borders */
    /* now after adding borders draw them separately in draw(ctx){} */
  }

  /* Get Lane Center - regardless of lane count, the car auto adjusts to the center of the lane */
  getLaneCenter(laneIndex: number): number {
    const laneWidth: number = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 5 as number;
    ctx.strokeStyle = 'white' as string | CanvasGradient | CanvasPattern;

    for (let i = 1; i <= ((this.laneCount - 1) as number); i += 1) {
      /** LINEAR INTERPOLATION or lerp getting values from left to right depending on a percentage i.e. is i/laneCount => * we need to find the x coordinate of the lane lines to draw */
      const x: number = lerp(
        this.left,
        this.right,
        (i / this.laneCount) as number
      );

      ctx.setLineDash([20, 20]); /* break of 20px and dash of 20px */
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke(); /* after this add in main.ts => const road = new Road(canvas.width/2, canvas.width) */
    } // add multiple lanes with a for loop

    ctx.setLineDash([]); /* reset line dash to default */
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    }); // add borders with a for loop - this is for collision detection
  } // end of draw()
} // end of class Road

// =====================================================================================================================

/*
 █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝
███████║██████╔╝██║     ███████║██║██║   ██║█████╗
██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝
██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝

 */

// 20220519182020

// ----------------------------------------------------------------------------

// 20220519181934
// for (let i = 0; i < ((this.laneCount + 1) as number); i += 1) { /* since didn't want to use i <= this.laneCount */
// .
// .
// .
// if (i > 0 && i < this.laneCount) {
//   ctx.setLineDash([20, 20]); /* break of 20px and dash of 20px */
// } else {
//   ctx.setLineDash([]); /* no dash => for outer borders */
// }

// ----------------------------------------------------------------------------
