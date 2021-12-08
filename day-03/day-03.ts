import { readFile } from "../util/readfile";

type GammaEpsilon =  {gamma: string, epsilon: string};

function getDiagnosticReport(): string[] {
  const diagnosticReport = readFile('/development/adventOfCode/day-1/day-03', 'diagnostic-report.txt');
  console.log(diagnosticReport[0]);
  return diagnosticReport;
}

function processDiagnosticReport() {
  const diagnosticReport = getDiagnosticReport();
  if (diagnosticReport.length === 0) {
    return 'no records found - report is empty'
  }
  const numberOfElements = diagnosticReport[0].length;
  const gammaAndEpsilon = getGammaAndEpsilon(diagnosticReport, numberOfElements);
  return multiplyBinary(gammaAndEpsilon.gamma, gammaAndEpsilon.epsilon);
}

function calcGammaAndEpsilon(gammaAndEpsilon: GammaEpsilon): number {
  const gamma = Number.parseInt(gammaAndEpsilon.gamma, 2);
  const epsilon = Number.parseInt(gammaAndEpsilon.epsilon, 2);
  return gamma * epsilon;
}

function createArrayFromElementN(diagnosticReport: string[], columnIndex: number): string[] {
  const result: string[] = [];
  diagnosticReport.forEach(item => 
    result.push(item.charAt(columnIndex))
  );
  return(result);
}

function getGammaAndEpsilon(diagnosticReport: string[], numberOfElements: number): GammaEpsilon {
  let gamma = '';
  let episilon = '';
  for (let index = 0; index < numberOfElements; index++) {
    const column: string[] = createArrayFromElementN(diagnosticReport, index);
    const countOfOnes = column.filter(ones => ones === '1').length;
    const countOfZeros = column.filter(zeros => zeros === '0').length;
    if (countOfOnes > countOfZeros) {
      gamma += '1';
      episilon += '0';
    } else {
      gamma += '0';
      episilon += '1';
    }
  }
  return {gamma: gamma, epsilon: episilon};
}

function getCountOfBits(diagnosticReportColumn: string[], comparator: 1 | 0): number {
    return diagnosticReportColumn.filter(item => parseInt(item) === comparator).length;
}

function getMostFrequentRows(diagnosticReport: string[], comparator: 1  | 0, column: number): string[] {
  return diagnosticReport.filter(row => 
    parseInt(row.charAt(column)) === comparator
  );
}

function multiplyBinary(binaryValue1: string, binaryValue2: string): number {
  return Number.parseInt(binaryValue1,2) * Number.parseInt(binaryValue2, 2);
}

function processOxygenAndCo2(diagnosticReport: string[]) {
  const oxygenRating = getOxygenRating(diagnosticReport);
  const Co2Scrubber = getCo2Rating(diagnosticReport);
  return multiplyBinary(oxygenRating, Co2Scrubber);
}

function getOxygenRating(diagnosticReport: string[]): string {
  let curentColumn = 0;
  const numberOfColumns = diagnosticReport[0].length;
  let countOfRows = diagnosticReport.length;
  let hasMatched = false;
  let result = '';
  let searchArray = diagnosticReport;
  while (countOfRows > 0 && !hasMatched) {
    const column = createArrayFromElementN(searchArray, curentColumn);
    const numberOfZeros = getCountOfBits(column, 0);
    const numberOfOnes = getCountOfBits(column, 1);
    if (countOfRows === 1) {
      result = searchArray[0];
      hasMatched = true;
    } else {
      if (numberOfZeros > numberOfOnes) {
        searchArray = getMostFrequentRows(searchArray, 0, curentColumn);
      } else if (numberOfOnes > numberOfZeros) {
        searchArray = getMostFrequentRows(searchArray, 1, curentColumn);
      } else if (numberOfOnes === numberOfZeros) {
        result = searchArray.filter(row => parseInt(row.charAt(curentColumn)) === 1)[0];
        hasMatched = true;
      }
    }
    curentColumn++;
    countOfRows = searchArray.length;
  }
  return result;
}

function getCo2Rating(diagnosticReport: string[]) {
  let curentColumn = 0;
  const numberOfColumns = diagnosticReport[0].length;
  let countOfRows = diagnosticReport.length;
  let hasMatched = false;
  let result = '';
  let searchArray = diagnosticReport;
  while (countOfRows > 0 && !hasMatched) {
    const column = createArrayFromElementN(searchArray, curentColumn);
    const numberOfZeros = getCountOfBits(column, 0);
    const numberOfOnes = getCountOfBits(column, 1);
    if (countOfRows === 1) {
      result = searchArray[0];
      hasMatched = true;
    } else {
      if (numberOfZeros < numberOfOnes) {
        searchArray = getMostFrequentRows(searchArray, 0, curentColumn);
      } else if (numberOfOnes < numberOfZeros) {
        searchArray = getMostFrequentRows(searchArray, 1, curentColumn);
      } else if (numberOfOnes === numberOfZeros) {
        result = searchArray.filter(row => parseInt(row.charAt(curentColumn)) === 0)[0];
        hasMatched = true;
      }
    }
    curentColumn++;
    countOfRows = searchArray.length;
  }
  return result;
}


export {
  getDiagnosticReport,
  createArrayFromElementN,
  getGammaAndEpsilon,
  processDiagnosticReport,
  getCountOfBits,
  getMostFrequentRows,
  getOxygenRating,
  getCo2Rating,
  processOxygenAndCo2
};
