type Cycle = { value: number};
type FishMap = Cycle[];

function initMap(): FishMap {
  return new Array(9).fill({value: 0});
}

function performCylce(fishMap: FishMap): number {
  const newMap: FishMap = initMap();
  return 0;
}

function calcPopulationGrowth(population: number[], numberOfDays: number): number {
  let fishMap = setBasePopulation(population);
  while (numberOfDays !== 0) {
   
    numberOfDays--;
  }
  return 0
}

function setBasePopulation(population: number[]): FishMap {
  const fishMap: FishMap = initMap();
  return fishMap.map((value, index) => {
    const newValue = population.filter(fish => fish === index).length;
    return {value: newValue};
  })
}

export {
  calcPopulationGrowth,
  setBasePopulation,
};

export type {FishMap};