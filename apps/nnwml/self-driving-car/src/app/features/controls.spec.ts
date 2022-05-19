import { Car } from './car';
import { Controls } from './controls';

describe('Controls', () => {
  it('should create an instance', () => {
    expect(new Controls()).toBeTruthy();
  });
});

let controls: Controls;
describe('Controls', () => {
  beforeEach(() => {
    controls = new Controls();
    return controls;
  });

  it('should have a forward value of false', () => {
    expect(controls.forward).toBe(false);
  });

  it('should have a reverse value of false', () => {
    expect(controls.reverse).toBe(false);
  });

  it('should have a left value of false', () => {
    expect(controls.left).toBe(false);
  });

  it('should have a right value of false', () => {
    expect(controls.right).toBe(false);
  });
});

/**
 *
 ██████╗ █████╗ ██████╗      ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ███████╗
██╔════╝██╔══██╗██╔══██╗    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██╔════╝
██║     ███████║██████╔╝    ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ███████╗
██║     ██╔══██║██╔══██╗    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ╚════██║
╚██████╗██║  ██║██║  ██║    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
 *
 */

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

  it('control car forward', () => {
    controls.forward = true;
    car.update();
    expect(car.acceleration).toBe(0.2);
  });
});
