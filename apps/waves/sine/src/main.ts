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

const colorOfStroke = {
  hue: 200,
  saturation: 50,
  lightness: 50,
};

const colorBackground = {
  hue: 0,
  saturation: 0,
  lightness: 0,
  alpha: 0.01,
};

const folderWave = gui.addFolder('wave');
const folderColorOfStroke = gui.addFolder('stroke color');
const folderBackground = gui.addFolder('background color');

folderWave.add(wave, 'y', 0, canvas.height);
folderWave.add(wave, 'wavelength', -0.01, 0.01);
folderWave.add(wave, 'amplitude', -300, 300);
folderWave.add(wave, 'frequency', -0.01, 1);
folderWave.open(); // helps to default to open on window load by default

folderColorOfStroke.add(colorOfStroke, 'hue', 0, 255);
folderColorOfStroke.add(colorOfStroke, 'saturation', 0, 100);
folderColorOfStroke.add(colorOfStroke, 'lightness', 0, 100);
// folderColorOfStroke.open();

folderBackground.add(colorBackground, 'hue', 0, 255);
folderBackground.add(colorBackground, 'saturation', 0, 100);
folderBackground.add(colorBackground, 'lightness', 0, 100);
folderBackground.add(colorBackground, 'alpha', 0, 1);
// folderBackground.open();

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `hsla(
    ${colorBackground.hue},
    ${colorBackground.saturation}%,
    ${colorBackground.lightness}%,
    ${colorBackground.alpha}
    )`;

  ctx.strokeStyle = `hsl(
    ${Math.abs(colorOfStroke.hue * Math.sin(increment))},
    ${colorOfStroke.saturation}%,
    ${colorOfStroke.lightness}%
    )`;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i += 1) {
    ctx.lineTo(
      i,
      wave.y +
        Math.sin(((i * wave.wavelength) as number) + increment) *
          (wave.amplitude * Math.sin(increment))
    );
  }
  // console.log(Math.abs(colorOfStroke.hue * Math.sin(increment)));

  ctx.stroke();

  increment += wave.frequency;
}

animate();

/**
 * Archive
 * 202205261225
 * // draw a line each time we iterate through the for loop // Math.sin() returns -1 to +1
 * for loop in animate()
 * // create a point for each pixel, right now we have two controllable points the left and right ends of window - least 600 points is enough
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
