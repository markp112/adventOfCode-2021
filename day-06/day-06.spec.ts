import { testData } from "./data";
import { addNewFish, calcPopulationGrowth, decrementTimers, resetZeroTimerFish } from "./day-06";

describe('lantenFishPopulationGrowth', () => {

  describe('calcPopulationGrowth', () => {
    it('should calculate the total number of fish after n day cycles, from a starting population', () => {
        const startingPopulation = testData;
        let numberOfDays = 18;
        let numberOfLanternFish = calcPopulationGrowth(startingPopulation, numberOfDays);
        expect(numberOfLanternFish).toBe(26);
        numberOfDays = 80;
        numberOfLanternFish = calcPopulationGrowth(startingPopulation, numberOfDays);
        expect(numberOfLanternFish).toBe(5934);
    })
  });

  describe('decrementTimers', () => {
    it('should reduce the value of each item in the array by 1', () => {
      const expectedResult = [2,3,2,0,1];
      const result = decrementTimers(testData);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    })
  });

  describe('addNewFish', () => {
    it('should return a new array with n new values of 8 added', () => {
      const expectedResult = [3,4,3,1,2,8,8,8];
      const result = addNewFish(testData, 3);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    })
  });

  describe('resetZeroTimerFish', () => {
    it('should return a new array with any value equaling -1 returned as a 6 and all other values unchanged', () => {
      const testData = [1,2,-1,6,-1];
      const expectedResult = [1, 2, 6, 6, 6];
      const result = resetZeroTimerFish(testData);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    })
  })
})