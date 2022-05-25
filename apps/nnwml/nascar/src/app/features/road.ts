export class Road {
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(public x: number, public width: number, public laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
    // this.lanes = [];
    // for (let i = 0; i < this.laneCount; i++) {
    //   this.lanes.push(new Lane(this.x, this.y, this.width, i));
    // }

    this.left = x - width / 2;
    this.right = x + width / 2;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#fff';

    ctx.beginPath();
    ctx.arc((this.left + this.right) / 2, 330, this.width / 2, 0, Math.PI * 2);
    ctx.moveTo(this.x, this.top);
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((this.left + this.right) / 2, 330, this.width / 4, 0, Math.PI * 2);
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();

    // draw a circle road
    // ctx.beginPath();
    // const arcRadius = this.width / 2;
    // ctx.arc(this.x, ctx.canvas.height / 2, arcRadius, 0, Math.PI * 2, false);
    // ctx.strokeStyle = '#f6f6f6';
    // ctx.lineWidth = 120;
    // ctx.stroke();
  }
}
