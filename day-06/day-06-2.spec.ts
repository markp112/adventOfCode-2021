import { testData } from "./data";
import {  calcPopulationGrowth, FishMap, setBasePopulation } from "./day-06-2";

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

  describe('setBasePopulation', () => {
    it ('should return a map with each key in the map having a count for each value in the array', () => {
      const result = setBasePopulation(testData);
      const expectResult: FishMap = [
        { value: 0 },
        { value: 1 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
      ];
      expect(result).toEqual(expectResult);
    })
  })
})