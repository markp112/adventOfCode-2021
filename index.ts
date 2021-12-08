import { calcTripletDepths, calcChangeInDepth } from './day-01';
import { oceanDepths } from './day-01/data'

import { processMovementData, processWithAim } from './day-02/day-02';
import { movementData } from './day-02/movementData';
import { getDiagnosticReport, processDiagnosticReport, processOxygenAndCo2 } from './day-03/day-03';
import { findTheLastWinningBoard, getBoardData, playBingo } from './day-04/day-04';
import {drawNumbers} from './day-04/draw-numbers';

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

function dayThreeStep1() {
  const powerConsumption = processDiagnosticReport();
  console.log(`The power consumption is: ${powerConsumption}`);
}

function dayThreeStep2() {
  const diagnosticReport = getDiagnosticReport();
  const OxygenCo2 = processOxygenAndCo2(diagnosticReport);
  console.log(`The combined Oxygen and Co2 rating is: ${OxygenCo2}`);
}

function dayFourStep1() {
  const bingoBoards = getBoardData();
  const score = playBingo(bingoBoards, drawNumbers);
  console.log('And the winning cards score is: ', score);
}
function dayFourStep2() {
  const bingoBoards = getBoardData();
  const score = findTheLastWinningBoard(bingoBoards, drawNumbers);
  console.log('And the last winning cards score is: ', score);
}

// dayOneStep1();
// dayOneStep2();



// dayTwoStep1();
// dayTwoStep2();

// dayThreeStep1();
// dayThreeStep2();

dayFourStep2();

function start() {
  const daysToRun: string[] = [];
  process.argv.forEach((val: string) => {
    if (val === 'day') {
      const fn =`day${val}`;
      daysToRun.push(fn);
    } 
    
  })
}
