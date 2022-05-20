/*
 █████╗ ███╗   ██╗██╗███╗   ███╗ █████╗ ████████╗███████╗
██╔══██╗████╗  ██║██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝
███████║██╔██╗ ██║██║██╔████╔██║███████║   ██║   █████╗
██╔══██║██║╚██╗██║██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝
██║  ██║██║ ╚████║██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗
╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

 */

describe('animate', () => {
  it.todo('should be defined');
});

// ----------------------------------------------------------------------------

// import './main.ts';
import { Car, Controls } from './app';

describe('Car Controls', () => {
  const controls = new Controls();
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50);
    car.update();
  });

  it('should have a speed of 0', () => {
    expect(car.speed).toBe(0);
  });

  it('control car forward, reverse, left, and right', () => {
    controls.forward = true;
  });

  it('control car reverse', () => {
    controls.reverse = true;
  });

  it('control car left', () => {
    controls.left = true;
  });

  it('control car right', () => {
    controls.right = true;
  });
});

describe('Car Controls', () => {
  const controls = new Controls();
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50);
    car.update();
  });

  it('controls car forward, reverse, left, and right', () => {
    let forward, reverse, left, right;
    const controlsPropertyForEachArray = [forward, reverse, left, right];
    controlsPropertyForEachArray.forEach((control) => {
      controls[control] = true;
    });
  });

  it('new Controls().forward, backward, left, right to be false by default', () => {
    expect(controls.forward).toBe(false);
    expect(controls.reverse).toBe(false);
    expect(controls.left).toBe(false);
    expect(controls.right).toBe(false);
  });

  // it('should have a speed of 0', () => {
  //   controls.forward = true;
  //   car.update();
  //   expect(car.speed).toBeGreaterThanOrEqual(0);
  // });

  it('friction in Car constructor is 0.05', () => {
    const car = new Car(100, 100, 30, 50);
    expect(car.friction).toBe(0.05);
  });

  // it.todo('update friction in Car constructor with mock data');
  it('should return a mutable friction property in Car constructor', () => {
    const car = new Car(100, 100, 30, 50);
    car.friction = 0.1;
    expect(car.friction).toBe(0.1);
  });
});
