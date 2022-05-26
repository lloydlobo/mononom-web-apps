import './app/app.element.ts';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

export const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
  y: canvas.height / 2,
  wavelength: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

gui.add(wave, 'y', 0, canvas.height);
gui.add(wave, 'wavelength', -0.01, 0.01);
gui.add(wave, 'amplitude', -300, 300);
gui.add(wave, 'frequency', -0.01, 1);

let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(0, 0, 0, 0.01)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i += 1) {
    ctx.lineTo(
      i,
      wave.y + Math.sin(i * wave.wavelength + increment) * wave.amplitude
    ); // draw a line each time we iterate through the for loop // Math.sin() returns -1 to +1
  } // create a point for each pixel, right now we have two controllable points the left and right ends of window - least 600 points is enough
  // ctx.strokeStyle = `hsl(${Math.random() * 360}, 50%, 50%)`;
  ctx.strokeStyle = `hsl(0, 50%, 50%)`;
  ctx.stroke();

  increment += wave.frequency;
}

animate();

/**
 * Archive
 * 202205260910
 * for (let i = 0; i < canvas.width; i += 1) {
    const amplitude = 100;
    const waveLength = 0.01;
    ctx.lineTo(i, canvas.height / 2 + Math.sin(i * waveLength) * amplitude); // draw a line each time we iterate through the for loop // Math.sin() returns -1 to +1
  }
 * 202205260846
 // ctx.lineTo(canvas.width, canvas.height / 2);
 *
 */
