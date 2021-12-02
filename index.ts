import { calcTripletDepths, calcChangeInDepth } from './day-01';
import { oceanDepths } from './day-01/data'

import { processMovementData, processWithAim } from './day-02/day-02';
import { movementData } from './day-02/movementData';

function dayOneStep1(): void {
  const numberOfChanges = calcChangeInDepth(oceanDepths);
  console.log("The number of times the depth decreased was ", numberOfChanges);
}

async function dayOneStep2() {
  const recalcDepths = await calcTripletDepths(oceanDepths);
  const changedDepths = calcChangeInDepth(recalcDepths);
  console.log("the number of time the depth changed is", changedDepths);

}

function dayTwoStep1() {
  const firstPosition = processMovementData(movementData);
  console.log(`After much deliberation the first position is calculated to be: ${firstPosition}`)
}

function dayTwoStep2() {
  const secondPosition = processWithAim(movementData);
  console.log(`after further deliberation the second result is ${secondPosition}`);
}

// dayOneStep1();
// dayOneStep2();

dayTwoStep1();
dayTwoStep2();