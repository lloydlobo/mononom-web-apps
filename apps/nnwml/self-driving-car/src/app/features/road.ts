export class Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(x: number, width: number, laneCount = 3 as number) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    // want the road to go infinitely downwards
    const infinity = 1000000; // using JS infinity may cause problems when drawing
    this.top = -infinity as number;
    this.bottom = infinity as number;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 5 as number;
    ctx.strokeStyle = 'white' as string | CanvasGradient | CanvasPattern;
    // draw line on left side of road
    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();
    // draw line on right side of road
    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();
  } /* after this add in main.ts
  const road = new Road(canvas.width/2, canvas.width) */
}
