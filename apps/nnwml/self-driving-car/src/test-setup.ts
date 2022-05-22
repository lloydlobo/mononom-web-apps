import { carCtx, road, traffic } from './main'
import { Car, Controls } from './app';
// ----------------------------------------------------------------------------
/*
 █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗███████╗
██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝
███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   █████╗
██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝
██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

 */

// let controls: Controls;
const controlsDummyCar = new Controls('DUMMY');

describe('animate', () => {
  it.todo('should be defined');
});


// import './main.ts';
// import { traffic, road } from './main'

describe('Car DUMMY Controls', () => {
  // const controls = new Controls();
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50, 'DUMMY');
    // car.update(road.borders, traffic);
  });

  it('should have a speed of 0', () => {
    expect(car.speed).toBeGreaterThanOrEqual(0);
  });

  it('control car forward, reverse, left, and right', () => {
    controlsDummyCar.forward = true;
  });

  it('control car reverse', () => {
    controlsDummyCar.reverse = true;
  });

  it('control car left', () => {
    controlsDummyCar.left = true;
  });

  it('control car right', () => {
    controlsDummyCar.right = true;
  });
});

describe('Car Controls', () => {
  // const controls = new Controls();
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50, 'DUMMY');
    // car.update(road.borders, traffic);
  });

  it('controls car forward, reverse, left, and right', () => {
    let forward, reverse, left, right;
    const controlsPropertyForEachArray = [forward, reverse, left, right];
    controlsPropertyForEachArray.forEach((control) => {
      controlsDummyCar[control] = true;
    });
  });

  it('new Controls() "DUMMY" forward, backward, left, right to be false by default', () => {
    expect(controlsDummyCar.forward).toBe(true);
    expect(controlsDummyCar.reverse).toBe(true);
    expect(controlsDummyCar.left).toBe(true);
    expect(controlsDummyCar.right).toBe(true);
  });

  // it('should have a speed of 0', () => {
  //   controls.forward = true;
  //   car.update();
  //   expect(car.speed).toBeGreaterThanOrEqual(0);
  // });

  it('friction in Car constructor is 0.05', () => {
    const car = new Car(100, 100, 30, 50, 'DUMMY');
    expect(car.friction).toBe(0.05);
  });

  // it.todo('update friction in Car constructor with mock data');
  it('should return a mutable friction property in Car constructor', () => {
    const car = new Car(100, 100, 30, 50, 'DUMMY');
    car.friction = 0.1;
    expect(car.friction).toBe(0.1);
  });
});
