import { createArrayFromElementN, getCo2Rating, getCountOfBits, 
  getDiagnosticReport, getGammaAndEpsilon, getMostFrequentRows, getOxygenRating, processOxygenAndCo2 } from "./day-03"

const testData =[
'00100',
'11110',
'10110',
'10111',
'10101',
'01111',
'00111',
'11100',
'10000',
'11001',
'00010',
'01010'
];

const firstColumn: string[] = ['0','1','1','1','1','0','0','1','1','1','0','0'];
const thirdColumn: string[] = ['1','1','1','1','1','1','1','1','0','0','0','0'];

describe('day-03', () => {

  describe('getDiagnosticReport', () => {
    it('should read the diagnostic report and return the records', () => {
      const result: string[] = getDiagnosticReport();
      expect(result.length).toBe(1000);
      expect(result[1]).toBe('110011100010');
      expect(result[7]).toBe('000100010001');
    })
  });

  describe('createArrayFromElementN', () => {

    it('should return a new array consisting of values from the nth column', () => {
      let result = createArrayFromElementN(testData, 0);
      expect(result).toEqual(expect.arrayContaining(firstColumn));
      result = createArrayFromElementN(testData, 2);
      expect(result).toEqual(expect.arrayContaining(thirdColumn));
    })
  })

  describe('getGammaAndEpsilon', () => {

    it('should calculate gamma and epsilon based on the frequency of 1s and 0s in each column', () => {
      const numberOfElements = testData[0].length;
      const result = getGammaAndEpsilon(testData, numberOfElements);
      expect(result.epsilon).toBe('01001');
      expect(result.gamma).toBe('10110');
    })
  })


  describe('getCountofBits', () => {
    it('should return a count of the number of bits in a column', () => {
      let count = getCountOfBits(firstColumn, 0);
      expect(count).toBe(5);
      count = getCountOfBits(firstColumn, 1);
      expect(count).toBe(7);
    })
  })

  describe('getMostFrequentRows', () => {
    it('should return a filtered array with only the elements where the bit in a given column matches to the bit passed in', () => {
      let rows: string[] = getMostFrequentRows(testData, 1, 0);
      expect(rows.length).toBe(7);
      expect(rows[0]).toBe('11110');
      rows = getMostFrequentRows(testData, 0, 1);
      expect(rows.length).toBe(7);
      expect(rows[0]).toBe('00100');
    })
    
  })

  describe('getOxygenRating', () => {
    it('should get the binary string for the oxygen rating', () => {
      let result = getOxygenRating(testData);
      expect(result).toBe('10111');
      const testDataSimple = ['00100',
      '11110',
      '10110'];
      result = getOxygenRating(testDataSimple);
      expect(result).toBe('11110');
    })
  })
  
  describe('getCo2Rating', () => {
    it('should get the binary string for the Co2 rating', () => {
      let result = getCo2Rating(testData);
      expect(result).toBe('01010');
      const testDataSimple = ['00100',
      '11110',
      '10110'];
      result = getCo2Rating(testDataSimple);
      expect(result).toBe('00100');
    })
  })
  
  describe('processStep2', () => {
    it('should calc the combined ozygen and Co2 ratings', () => {
      const result = processOxygenAndCo2(testData);
      expect(result).toBe(230);
    })
  })
})