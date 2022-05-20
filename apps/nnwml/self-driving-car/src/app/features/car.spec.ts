import { Car } from './car';

describe('Car', () => {
  // const car = new Car(100, 100, 30, 50);
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50);
    car.update([]);
  });
  it('should create an instance', () => {
    expect(new Car(100, 100, 30, 50)).toBeTruthy();
  });

  it('should have a speed of 0', () => {
    expect(car.speed).toBe(0);
  });

  it('should have an acceleration of 0.2', () => {
    expect(car.acceleration).toBe(0.2);
  });

  it('should have a friction of 0.05', () => {
    expect(car.friction).toBe(0.05);
  });
});

describe('Car', () => {
  let car: Car;

  beforeEach(() => {
    car = new Car(100, 100, 30, 50);
    car.update([]);
  });

  it('should have a maxSpeed of 3', () => {
    expect(car.maxSpeed).toBe(3);
  });

  it('should have an angle of 0', () => {
    expect(car.angle).toBe(0);
  });

  it('should have a width of 30', () => {
    expect(car.width).toBe(30);
  });

  it('should have a height of 50', () => {
    expect(car.height).toBe(50);
  });

  it('should have an x of 100', () => {
    expect(car.x).toBe(100);
  });

  it('should have a y of 100', () => {
    expect(car.y).toBe(100);
  });

  it('should have a controls object', () => {
    expect(car.controls).toBeTruthy();
  });
});
