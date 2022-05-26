import './app/app.element.ts';
// import * as dat from 'dat.gui';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

document.body.style.overflow = 'hidden';

canvas.style.backgroundColor = 'gray';

export const ctx = canvas.getContext('2d');

const wave = {
  y: canvas.height / 2,
  wavelength: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

let increment = wave.frequency;

type FlipType = 0 | 1 | -1; // 1 is for sine wave moving along the x axis and 0 is for stationary wave moving nowhere but oscillating along the y axis
const incrementX: FlipType = 0;

function animate(): void {
  requestAnimationFrame(animate);
  ctx.fillStyle = `hsla(0, 0%, 0%, 0.08)`;
  ctx.strokeStyle = `hsla(
    ${Math.abs(180 * Math.sin(increment))},
    50%,
    50%,
    0.9)`;

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  ctx.moveTo(-2, canvas.height / 2);

  for (let i = -1; i <= canvas.width; i += 1) {
    ctx.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.wavelength + increment * incrementX) *
          (wave.amplitude * Math.sin(increment))
    );
  }

  ctx.stroke();

  increment += wave.frequency;
}

animate();
