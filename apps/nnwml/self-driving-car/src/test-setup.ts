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

  it('control car forward', () => {
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

// describe(`canvas`, () => {
//   it('should have a width of 200', () => {
//     expect(canvas.width).toBe(200);
//   });
// });
