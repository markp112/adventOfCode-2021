import { oceanDepths } from "./data";



function calcChangeInDepth(data: number[]): number {
  let previousValue = data[0];
  let index = 1;
  let count = 0;

  while (index < data.length ) {
    const currentValue = data[index];
    if (currentValue > previousValue) {
      count++;
    }
    index++;
    previousValue = currentValue;
  }
  return count;
}

function calcTripletDepths(oceanDepths: number[]): number[] {
  const sumsTable: number[] = [];
  let index = 0;
  while (index < oceanDepths.length && (oceanDepths.length - index >= 3)) {
    let sum = 0;
    for (let index2 = 0; index2 < 3; index2++) {
      sum += oceanDepths[index+index2];
    }
    sumsTable.push(sum);
    index++;
  }
  return sumsTable;
}

export {calcTripletDepths, calcChangeInDepth};
