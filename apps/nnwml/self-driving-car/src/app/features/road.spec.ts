import { Road } from './road';
import { canvas } from './../../main';
import { ctx } from './../../main';

jest.mock('../../main', () => ({
  canvas: {
    width: 200,
    height: 2000000,
  },
  ctx: {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
  },
}));

let road: Road;
let laneCount: number;
let laneWidth: number;

beforeEach(() => {
  road = new Road(canvas.width / 2, canvas.width);
  return { canvas, road, ctx };
});

/*
██████╗  ██████╗  █████╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗
██████╔╝██║   ██║███████║██║  ██║
██╔══██╗██║   ██║██╔══██║██║  ██║
██║  ██║╚██████╔╝██║  ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝

 */
describe('Road', () => {
  it('should create an instance', () => {
    expect(new Road(canvas.width / 2, canvas.width)).toBeTruthy();
  });

  it('should have a width', () => expect(road.width).toBe(canvas.width));
});

/*
██████╗  ██████╗  █████╗ ██████╗     ██████╗ ██████╗  █████╗ ██╗    ██╗     ██████╗████████╗██╗  ██╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗██║    ██║    ██╔════╝╚══██╔══╝╚██╗██╔╝
██████╔╝██║   ██║███████║██║  ██║    ██║  ██║██████╔╝███████║██║ █╗ ██║    ██║        ██║    ╚███╔╝
██╔══██╗██║   ██║██╔══██║██║  ██║    ██║  ██║██╔══██╗██╔══██║██║███╗██║    ██║        ██║    ██╔██╗
██║  ██║╚██████╔╝██║  ██║██████╔╝    ██████╔╝██║  ██║██║  ██║╚███╔███╔╝    ╚██████╗   ██║   ██╔╝ ██╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝      ╚═════╝   ╚═╝   ╚═╝  ╚═╝

 */
describe('road.draw(ctx)', () => {
  it('should be truthy', () => expect(road.draw).toBeTruthy());

  it('should be a function', () => expect(typeof road.draw).toBe('function'));

  it('road.draw(ctx) throws an error "ctx.setLineDash is not a function"', () => {
    expect(() => road.draw(ctx)).toThrow('ctx.setLineDash is not a function');
  });
  /* why does it throw error "ctx.setLineDash is not a function" */
});

/*
██╗      █████╗ ███╗   ██╗███████╗     ██████╗███████╗███╗   ██╗████████╗███████╗██████╗
██║     ██╔══██╗████╗  ██║██╔════╝    ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
██║     ███████║██╔██╗ ██║█████╗      ██║     █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
██║     ██╔══██║██║╚██╗██║██╔══╝      ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
███████╗██║  ██║██║ ╚████║███████╗    ╚██████╗███████╗██║ ╚████║   ██║   ███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝     ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

*/
describe('Road.getLaneCenter', () => {
  // get laneCount from road
  beforeEach(() => {
    laneCount = 3;
    laneWidth = road.width / laneCount;
    return { laneCount, laneWidth };
  });

  it('should return the center of a lane', () =>
    expect(road.getLaneCenter(1)).toBe(canvas.width / 2));

  it('should be greater than canvas.width/2 and less than canvas.width', () => {
    expect(road.getLaneCenter(2)).toBeGreaterThan(canvas.width / 2);
    expect(road.getLaneCenter(2)).toBeLessThan(canvas.width);
  });

  // mock getLaneIndex here jest
  it('should not throw an error if lane is out of bounds', () => {
    expect(() => road.getLaneCenter(laneCount + 1)).not.toThrow();
    expect(() => road.getLaneCenter(3)).not.toThrow();
    expect(() => road.getLaneCenter(40)).not.toThrow();
  });

  it('should match the getLaneCenter mock statement where index = 0', () => {
    expect(road.getLaneCenter(0)).toBe(
      road.left +
        laneWidth / 2 +
        ((Math.min(0, laneCount) * laneWidth) as number)
    );
  });

  it('should match the getLaneCenter mock statement where index = 1', () =>
    expect(road.getLaneCenter(1)).toBe(
      road.left +
        laneWidth / 2 +
        ((Math.min(1, laneCount) * laneWidth) as number)
    ));

  it.todo('negative lane numbers should return the center of lane 1');
  // () => {
  //   expect(road.getLaneCenter(-1)).toBe(canvas.width / 2);
  // });

  it('should be a number', () =>
    expect(typeof road.getLaneCenter(0)).toBe('number'));
});
