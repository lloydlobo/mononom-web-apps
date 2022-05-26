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
  frequency: 0.00618,
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
        waveSine(i, wave, increment, incrementX) *
          (wave.amplitude * modulateWave(increment, 'logarithmic'))
    );
  }

  ctx.stroke();

  increment += wave.frequency;
}

animate();

/**
 * modulateWave - modulates the wave by the given function and returns the result
 *
 * @export
 * @param {number} increment
 * @param {string} typeOfWave
 * @return {*}  {number}
 */
export function modulateWave(increment: number, typeOfWave: string): number {
  if (typeOfWave === 'sine') {
    return Math.sin(increment);
  } else if (typeOfWave === 'cosine') {
    return Math.cos(increment);
  } else if (typeOfWave === 'tangent') {
    return Math.tan(increment);
  } else if (typeOfWave === 'secant') {
    return 1 / Math.cos(increment);
  } else if (typeOfWave === 'cosecant') {
    return 1 / Math.sin(increment);
  } else if (typeOfWave === 'cotangent') {
    return 1 / Math.tan(increment);
  } else if (typeOfWave === 'hyperbolicSine') {
    return Math.sinh(increment);
  } else if (typeOfWave === 'hyperbolicCosine') {
    return Math.cosh(increment);
  } else if (typeOfWave === 'hyperbolicTangent') {
    return Math.tanh(increment);
  } else if (typeOfWave === 'hyperbolicSecant') {
    return 1 / Math.cosh(increment);
  } else if (typeOfWave === 'hyperbolicCosecant') {
    return 1 / Math.sinh(increment);
  } else if (typeOfWave === 'hyperbolicCotangent') {
    return 1 / Math.tanh(increment);
  } else if (typeOfWave === 'inverseSine') {
    return Math.asin(increment);
  } else if (typeOfWave === 'inverseCosine') {
    return Math.acos(increment);
  } else if (typeOfWave === 'inverseTangent') {
    return Math.atan(increment);
  } else if (typeOfWave === 'inverseSecant') {
    return 1 / Math.asin(increment);
  } else if (typeOfWave === 'inverseCosecant') {
    return 1 / Math.acos(increment);
  } else if (typeOfWave === 'inverseCotangent') {
    return 1 / Math.atan(increment);
  } else if (typeOfWave === 'inverseHyperbolicSine') {
    return Math.asinh(increment);
  } else if (typeOfWave === 'inverseHyperbolicCosine') {
    return Math.acosh(increment);
  } else if (typeOfWave === 'inverseHyperbolicTangent') {
    return Math.atanh(increment);
  } else if (typeOfWave === 'inverseHyperbolicSecant') {
    return 1 / Math.asinh(increment);
  } else if (typeOfWave === 'inverseHyperbolicCosecant') {
    return 1 / Math.acosh(increment);
  } else if (typeOfWave === 'square') {
    return Math.pow(increment, 2);
  } else if (typeOfWave === 'cube') {
    return Math.pow(increment, 3);
  } else if (typeOfWave === 'exponential') {
    return Math.exp(increment);
  } else if (typeOfWave === 'logarithmic') {
    return Math.log(increment);
  } else if (typeOfWave === 'naturalLogarithm') {
    return Math.log(increment);
  } else if (typeOfWave === 'inverseLogarithm') {
    return 1 / Math.log(increment);
  } else if (typeOfWave === 'inverseNaturalLogarithm') {
    return 1 / Math.log(increment);
  } else if (typeOfWave === 'inverseExponential') {
    return 1 / Math.exp(increment);
  } else if (typeOfWave === 'inverseSquare') {
    return 1 / Math.pow(increment, 2);
  } else if (typeOfWave === 'inverseCube') {
    return 1 / Math.pow(increment, 3);
  } else {
    return Math.sin(increment);
  }
}

export function waveSine(
  i: number,
  wave: {
    y: number;
    wavelength: number;
    amplitude?: number;
    frequency?: number;
  },
  increment: number,
  incrementX: number
): number {
  return Math.sin(i * wave.wavelength + increment * incrementX);
}

export function fibonacciSeries(n: number): number[] {
  const fibonacci: number[] = [];
  fibonacci.push(0);
  fibonacci.push(1);
  for (let i = 2; i < n; i += 1) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }
  return fibonacci;
}

// interface WaveInterface {
//   y: number;
//   wavelength: number;
//   amplitude: number;
//   frequency: number;
// }

// interface WaveSineInterface {
//   i: number;
//   wave: {
//     y: number;
//     wavelength: number;
//     amplitude?: number;
//     frequency?: number;
//   };
//   increment: number;
//   incrementX: number;
// }
