function calcPopulationGrowth(basePopulation: number[], numberOfDays: number): number {
  let population = [...basePopulation];
  while (numberOfDays !== 0) {
    const numberOfNewFish = countFishOnCycleZero(population);
    population = decrementTimers(population);
    population = resetZeroTimerFish(population);
    population = addNewFish(population, numberOfNewFish);
    numberOfDays--;
  }
  return population.length;
}

function countFishOnCycleZero(population: number[]): number {
  return population.filter(fish => fish === 0).length;
}

export {
  calcPopulationGrowth,
  countFishOnCycleZero,
  decrementTimers,
  addNewFish,
  resetZeroTimerFish,
}

function decrementTimers(population: number[]): number[] {
  return population.map(fish => --fish);
}

function addNewFish(currentPopulation: number[], numberOfNewFish: number): number[] {
  const newFish = Array.from(Array(numberOfNewFish).fill(8));
  return [...currentPopulation, ...newFish];
}

function resetZeroTimerFish(population: number[]): number[] {
  return population.map(fish => {
    return fish === -1 ? 6 : fish;
  });
}

