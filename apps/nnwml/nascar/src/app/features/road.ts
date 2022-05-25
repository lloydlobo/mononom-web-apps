export class Road {
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(public x: number, public width: number, public laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    // this.lanes = [];
    // for (let i = 0; i < this.laneCount; i++) {
    //   this.lanes.push(new Lane(this.x, this.y, this.width, i));
    // }

    this.left = x - width / 2;
    this.right = x + width / 2;
  }

  draw(ctx) {
    //   ctx.beginPath();
    // const arcRadius = ctxWidth / 3;
    // ctx.arc(ctxCenter, ctxHeight / 2, arcRadius, 0, Math.PI * 2, false);
    // ctx.strokeStyle = '#f6f6f6';
    // ctx.lineWidth = 120;
    // ctx.stroke();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#f6f6f6';

    // draw a circle road
    ctx.beginPath();
    const arcRadius = this.width / 2;
    ctx.arc(this.x, ctx.canvas.height / 2, arcRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = '#f6f6f6';
    ctx.lineWidth = 120;
    ctx.stroke();
  }
}
