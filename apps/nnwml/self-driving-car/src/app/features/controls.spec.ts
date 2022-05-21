import { Car } from './car';
import { Controls } from './controls';

// let controls: Controls;
const controlsDummyCar = new Controls('DUMMY');
// const controlsDummy = new Controls('DUMMY');

describe('Controls', () => {
  it('should create an instance', () => {
    expect(controlsDummyCar).toBeTruthy();
  });
});

describe('Controls DUMMY Car', () => {
  // beforeEach(() => {
  //   controls = new Controls();
  //   return controls;
  // });

  it('should have a forward value of false', () => {
    expect(controlsDummyCar.forward).toBe(true);
  });

  it('should have a reverse value of false', () => {
    expect(controlsDummyCar.reverse).toBe(false);
  });

  it('should have a left value of false', () => {
    expect(controlsDummyCar.left).toBe(false);
  });

  it('should have a right value of false', () => {
    expect(controlsDummyCar.right).toBe(false);
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

describe('DUMMY Car Controls', () => {
  // const controls = new Controls();
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50, 'DUMMY');
    car.update([]);
  });

  it('should have a speed of 0>speed>1', () => {
    expect(car.speed).toBeGreaterThanOrEqual(0);
    expect(car.speed).toBeLessThanOrEqual(1);
  });
});
