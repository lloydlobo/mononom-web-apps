import './app/app.element.ts';
export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
for (let i = 0; i < canvas.width; i += 1) {
  const amplitude = 100;
  const waveLength = 0.01;
  ctx.lineTo(i, canvas.height / 2 + Math.sin(i * waveLength) * amplitude); // draw a line each time we iterate through the for loop // Math.sin() returns -1 to +1
} // create a point for each pixel, right now we have two controllable points the left and right ends of window - least 600 points is enough

ctx.stroke();

/**
 * Archive
 *
 * 202205260846
 // ctx.lineTo(canvas.width, canvas.height / 2);
 *
 */
