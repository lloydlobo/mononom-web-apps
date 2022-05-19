import { Road } from './road';
import { canvas } from './../../main';

jest.mock('../../main', () => ({
  canvas: {
    width: 200,
    height: 200,
  },
}));

let road;

describe('Road', () => {
  beforeEach(() => {
    road = new Road(canvas.width / 2, canvas.width);
    return { canvas, road };
  });

  it('should create an instance', () => {
    expect(new Road(canvas.width / 2, canvas.width)).toBeTruthy();
  });

  // it('should have a width', () => {
  //   expect(road.width).toBe(canvas.width);
  // });
});

// import notifier = require('node-notifier');
// // String
// notifier.notify('Message');

// // Object
// notifier.notify({
//   title: 'My notification',
//   message: 'Hello, there!',
// });
