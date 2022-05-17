import './app/app.element.ts';
import Car from './app/features/car';
import Controls from './app/features/controls';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

canvas.height = window.innerHeight; /* makes it full height */
canvas.width = 200;

// a drawing context is a way to draw on a canvas
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// car dimensions in pixels (x,y,width,height) 0,0 is top left corner
const car: Car = new Car(100, 100, 30, 50); /* now define the Car */

// add car to DOM (in the canvas)
car.draw(ctx);

// intialize Controls so that it listens to keyboard events
const controls: Controls = new Controls();
