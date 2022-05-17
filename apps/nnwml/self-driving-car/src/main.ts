import './app/app.element.ts';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

canvas.height = window.innerHeight; /* makes it full height */
canvas.width = 200;

console.dir(canvas);
