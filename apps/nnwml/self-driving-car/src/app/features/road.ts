import { lerp } from '../utils/lerp';

export class Road {
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

    this.left = (x as number) - (width as number) / 2;
    this.right = (x as number) + (width as number) / 2;

    const infinity = 1000000; // using JS infinity may cause problems when drawing // want the road to go infinitely downwards
    this.top = -infinity as number;
    this.bottom = infinity as number;
  }

  /**
   * Get Lane Center - regardless of lane count, the car auto adjusts to the center of the lane
   * @date 5/19/2022 - 4:15:00 PM
   *
   * @param {number} laneIndex
   * @returns {number}
   */
  getLaneCenter(laneIndex: number): number {
    const laneWidth = this.width / this.laneCount;
    return (
      (this.left as number) +
      ((laneWidth / 2) as number) +
      ((laneIndex * laneWidth) as number)
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 5 as number;
    ctx.strokeStyle = 'white' as string | CanvasGradient | CanvasPattern;

    for (let i = 0; i < ((this.laneCount + 1) as number); i += 1) {
      /** LINEAR INTERPOLATION or lerp getting values from left to right depending on a percentage i.e. is i/laneCount => * we need to find the x coordinate of the lane lines to draw */
      const x: number = lerp(
        this.left,
        this.right,
        (i / this.laneCount) as number
      );
      if (i > 0 && i < this.laneCount) {
        ctx.setLineDash([20, 20]); /* break of 20px and dash of 20px */
      } else {
        ctx.setLineDash([]); /* no dash => for outer borders */
      }
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke(); /* after this add in main.ts => const road = new Road(canvas.width/2, canvas.width) */
    } // add multiple lanes with a for loop
  }
}
