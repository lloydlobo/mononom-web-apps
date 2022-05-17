import Car from './car';

describe('Car', () => {
  it('should create an instance', () => {
    expect(new Car(100, 100, 30, 50)).toBeTruthy();
  });
});
