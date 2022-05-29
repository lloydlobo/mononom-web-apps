// import './app/app.element.ts';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = `hsla(0, 0%, 0%, 0.01)`;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// const wave = new Wave(ctx, canvas.width, canvas.height);
const wave = {
  y: canvas.height / 2,
  wavelength: 0.01,
  amplitude: 100,
  phase: 0,
  frequency: 0.01,
};

const enabled = {
  true: 1,
  false: 0,
};

let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `hsla(0, 0%, 0%, 0.08)`;
  ctx.beginPath();

  ctx.strokeStyle = `hsla(300, 50%, 50%, 1)`;
  ctx.moveTo(-2, canvas.height / 2);
  for (let i = -1; i < canvas.width + 1; i++) {
    if (i % 2 === 0) {
      wave.phase = 0;
    } else {
      wave.phase = Math.PI;
      // increment -= wave.frequency;
    }

    const blockSineWave = Math.sin(wave.phase);
    ctx.lineTo(
      i,
      wave.y +
        Math.sin(
          i * wave.wavelength - increment / 1 + blockSineWave * enabled.false
        ) *
          (wave.amplitude * Math.sin(increment))
    );
  }
  ctx.stroke();

  increment += wave.frequency;
}

animate();
// document.appendChild(canvas);
