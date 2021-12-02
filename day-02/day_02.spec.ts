import { Command, getDirection, getUnits, processCommand, processWithAim } from "./day-02";

describe("getDirection", () => {

  const directions = ['forward 4', 'down 1', 'up 12', ];
  let result: string[] = [];

  beforeEach(()=> {
    result = [];
  })
  it('Should return the command when passed a command with a value', () => {
    const expectedResult = ['forward', 'down', 'up'];
    directions.forEach(direction => {
      const command = getDirection(direction);
      result.push(command);
    });
    expect(result).toEqual(expect.arrayContaining(expectedResult));
  });
});

describe("getUnits", () => {
  const directions = ['forward 4', 'down 1', 'up 12', ];
  let result: number[] = [];

  it('should return just the units from the movement string', ()=> {
    const expectedResult = [4, 1, 12, ];
    let sum = 0;
    directions.forEach(direction => {
      const unit = getUnits(direction);
      sum += unit;
      result.push(unit);
    });
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(sum).toEqual(17);
  })

  describe('processCommand', () => {

    it('should when passed a direction of down return a command containing vertical and the unit unchanged', () => {
      const direction = 'down';
      const unit = 4;
      const result: Command = processCommand(direction, unit);
      expect(result.direction).toBe('vertical');
      expect(result.units).toBe(unit);
    });

    it('should when passed a direction of up return a command containing vertical and the unit as a negative', () => {
      const direction = 'up';
      const unit = 4;
      const result: Command = processCommand(direction, unit);
      expect(result.direction).toBe('vertical');
      expect(result.units).toBe(-unit);
    });

    it('should when passed a direction of forward return a command containing vertical and the unit unchanged', () => {
      const direction = 'forward';
      const unit = 4;
      const result: Command = processCommand(direction, unit);
      expect(result.direction).toBe('horizontal');
      expect(result.units).toBe(unit);
    });

    it('should throw an error when the command is not recognised', () => {
      const direction = 'reverse';
      const unit = 4;
      expect(() => processCommand(direction, unit)).toThrowError('Invalid command cannot compute!! reverse');
      
    });

  })
});

describe('processWithAim', () => {
  it('should calc a new depth and position ', () => {
    const testData: string[] = [
      'forward 5',
      'down 5',
      'forward 8',
      'up 3',
      'down 8',
      'forward 2'
    ];
    const result = processWithAim(testData);
    expect(result).toBe(900);

  })
})