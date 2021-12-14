import { addKeyValueToMap, calcDangerZones, getCoordinate, getEndCoordinates, getKeyAndValue, getNextCoordinate, getStartCoordinates, populateMap } from "./day-5";


const testPlots = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
];
describe('day-05', () => {

  let testMap: Map<string, number>;

  beforeEach(() => {
    testMap = new Map<string, number>();
  })

  describe('getStartCoordinates', () => {
    it('should return the two first x and y points from  a string in the format of x,y -> x,y ', () => {
      let point = '556,286 -> 341,71';
      let result = getStartCoordinates(point);
      expect(result.x).toBe(556);
      expect(result.y).toBe(286);
      point = '35,706 -> 398,706';
      result = getStartCoordinates(point);
      expect(result.x).toBe(35);
      expect(result.y).toBe(706);
    });

  });

  describe('getEndCoordinates', () => {
    it('should return the last two x and y points from a string in the format of x,y -> x,y', () => {
      let point = '556,286 -> 341,71';
      let result = getEndCoordinates(point);
      expect(result.x).toBe(341);
      expect(result.y).toBe(71);
      point = '35,706 -> 398,706';
      result = getEndCoordinates(point);
      expect(result.x).toBe(398);
      expect(result.y).toBe(706);
    })
  });

  describe('getCoordinate', () => {

    it('should return the start coordinates when given a point', () => {
      let point = '556,286 -> 341,71';
      let result = getCoordinate(point, 'start');
      expect(result.x).toBe(556);
      expect(result.y).toBe(286);
      point = '35,706 -> 398,706';
      result = getCoordinate(point, 'start');
      expect(result.x).toBe(35);
      expect(result.y).toBe(706);
    });

    it('should return the end coordinates when given a point', () => {
      let point = '556,286 -> 341,71';
      let result = getCoordinate(point, 'end');
      expect(result.x).toBe(341);
      expect(result.y).toBe(71);
      point = '35,706 -> 398,706';
      result = getCoordinate(point, 'end');
      expect(result.x).toBe(398);
      expect(result.y).toBe(706);
    })

  })

  describe('addKeyValueToMap', () => {
  
    it('should add a key to the map if it does not aleady exist', () => {
      const key = '123';
      const result = addKeyValueToMap({key: key, value: 1}, testMap);
      expect(result.get(key)).toBe(1);
    })
    it('should replace a key in the map if it already exists with the new key and value', () => {
      const key = '123';
      let map = addKeyValueToMap({key: key, value: 1}, testMap);
      const result = addKeyValueToMap({key: key, value: 5}, testMap);
      expect(result.get(key)).toBe(5);
    })
  });

  describe('getKeyAndValue', () => {
    it('should retun a keyValue with the key and a value of 1 if the key is not already in the map', () => {
      const key = '123';
      const result = getKeyAndValue(key, testMap);
      expect(result.value).toBe(1);
    });

    it('should retun a keyValue with the key and a value of value + 11 if the key already exists', () => {
      const key = '123';
      testMap.set(key, 2);
      const result = getKeyAndValue(key, testMap);
      expect(result.value).toBe(3);
    });
  });

  describe('getNextCoordinate', () => {
    it('should return the start value + 1 if the start value is less than the end value', () => {
      const startValue = 1;
      const endValue = 2;
      const result = getNextCoordinate(startValue, endValue);
      expect(result).toBe(2);
    })

  })

  describe('populateMap', () => {
    it('should populate the map with the coordinate plots for each point on the map it should maintain a count', () => {
      const testPlotsSingle = ['0,9 -> 5,9'];
      let result = populateMap(testPlotsSingle);
      console.log('%c⧭', 'color: #00258c', result);
      expect(result.get('0:9')).toBe(1);
      expect(result.get('1:9')).toBe(1);
      expect(result.get('2:9')).toBe(1);
      expect(result.get('3:9')).toBe(1);
      expect(result.get('4:9')).toBe(1);
      expect(result.get('5:9')).toBe(1);

      const testPlot2 = ['5,5 -> 8,2'];
      result = populateMap(testPlot2);

      const testPlot3 = [
        '0,9 -> 2,9',
        '0,9 -> 5,9'
      ];
      result = populateMap(testPlot3);
      console.log('%c⧭', 'color: #00258c', result);
      expect(result.get('0:9')).toBe(2);
      expect(result.get('1:9')).toBe(2);
      expect(result.get('2:9')).toBe(2);
      expect(result.get('3:9')).toBe(1);
      expect(result.get('4:9')).toBe(1);
      expect(result.get('5:9')).toBe(1);


      result = populateMap(testPlots);
      console.log('%c⧭', 'color: #f279ca', result);
      expect(result.get('0:9')).toBe(2);
      expect(result.get('1:9')).toBe(2);
      expect(result.get('2:9')).toBe(2);
      expect(result.get('3:9')).toBe(1);
      expect(result.get('4:9')).toBe(1);
      expect(result.get('5:9')).toBe(1);
      expect(result.get('3:4')).toBe(2);
      expect(result.get('7:3')).toBe(1);
      expect(result.get('7:1')).toBe(1);
      expect(result.get('7:2')).toBe(1);
      expect(result.get('7:3')).toBe(1);
      expect(result.get('7:4')).toBe(2);
      expect(result.get('7:5')).toBe(undefined);
      }
    )
  });

  describe('calcDangerZones', () => {
    it('should count how many plot lines overlap i.e. have a value > 1', () => {
      const ventsmap = populateMap(testPlots);
      const result = calcDangerZones(ventsmap);
      expect(result).toBe(5);
    })
  })

})