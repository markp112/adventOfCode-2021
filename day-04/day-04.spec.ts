import { AllBoards, Board, BoardRow, checkBoardForMatches, checkBoardForWinningColumn, checkForAWinner, checkForWinningRow, findTheLastWinningBoard, getBoardData, getBoardRow, getSumOfUmarkedNumbers, matchDrawnNumber, playBingo, removeWinningBoard, setupBoards } from "./day-04";

const br1: BoardRow = [22, 13, 17, 11,  0];
const br2: BoardRow = [8,  2, 23,  4, 24];
const br3: BoardRow =[21, 9, 14, 16,  7];
const br4: BoardRow =[6, 10,  3, 18,  5];
const br5: BoardRow =[1, 12, 20, 15, 19];
const board1 = [br1, br2, br3, br4, br5];

const br6: BoardRow = [3, 15,  0,  2, 22];
const br7: BoardRow = [9, 18, 13, 17,  5];
const br8: BoardRow = [19,  8,  7, 25, 23];
const br9: BoardRow = [20, 11, 10, 24,  4];
const br10: BoardRow = [14, 21, 16, 12,  6];

const board2 = [br6, br7, br8, br9, br10];

const br11: BoardRow = [14, 21, 17, 24,  4];
const br12: BoardRow = [10, 16, 15,  9, 19];
const br13: BoardRow = [18,  8, 23, 26, 20];
const br14: BoardRow = [22, 11, 13,  6,  5];
const br15: BoardRow = [2 , 0 ,12 , 3 , 7];

const board3 = [br11, br12, br13, br14, br15];

const testBoards: AllBoards = [board1, board2, board3];
const testRowString = '22 11 13 6  5';

const rawTestData = [
  '22 13 17 11 0',
 '8 2 23 4 24',
'21 9 14 16 7',
 '6 10 3 18 5',
 '1 12 20 15 19',
 '3 15 0 2 22',
 '9 18 13 17 5',
'19 8 7 25 23',
'20 11 10 24 4',
'14 21 16 12 6',
'14 21 17 24 4',
'10 16 15 9 19',
'18 8 23 26 20',
'22 11 13 6 5',
 '2 0 12 3 7',
  ];

describe('day-04', () => {

  describe('getBoardData', () => {
    it('should read the board data file and return an array of the input data', () => {
      const data = getBoardData();
      expect(data.length).not.toBe(0);
    })
  })

  describe('getBoardRow', () => {
    it('should return an array of numbers when passed an array of string numbers', () => {
      const result = getBoardRow(testRowString);
      expect(result).toEqual(expect.arrayContaining(br14));
    })
    it('should remove any emtoy spaces from the string', () => {
      let testString= '727 88  4 68';
      let result = getBoardRow(testString);
      expect(result).toEqual(expect.arrayContaining( [ 727, 88, 4, 68 ]));
      testString =' 4 8 15 343'
      result = getBoardRow(testString);
      expect(result).toEqual(expect.arrayContaining( [ 4,8,15,343 ]));
    })
  })

  describe('setupBoards', () => {
    it('should return a set of boards when give and array containing sequences of 5 numbers in a string', () => {
      const result = setupBoards(rawTestData);
      console.log('%c⧭', 'color: #00bf00', result);
      expect(result.length).toBe(3);
      expect(result[0].length).toBe(5);
      expect(result[0][0].length).toBe(5);
      expect(result[0][1]).toEqual(expect.arrayContaining(br14));
    })
  });

  describe('matchDrawnNumber', () => {
    it('should if a number in the row matches the drawn number it should replace it with -1', () => {
      const result = matchDrawnNumber(br11, 24);
      expect(result).toEqual(expect.arrayContaining([14, 21, 17, -1,  4]));
    });
    it('should if there are no matching number return the same array', () => {
      const result = matchDrawnNumber(br11, 32);
      expect(result).toEqual(expect.arrayContaining([14, 21, 17, 24,  4]));
    })
  });

  describe('checkBoardForMatches', () => {
    it('should return the original board with a matching number replaced with -1', ()=> {
      let result = checkBoardForMatches(board1,3);
      expect(result[0]).toEqual(expect.arrayContaining(br1));
      expect(result[1]).toEqual(expect.arrayContaining(br2));
      expect(result[2]).toEqual(expect.arrayContaining(br3));
      expect(result[3]).toEqual(expect.arrayContaining([6, 10,  -1, 18,  5]));
      expect(result[4]).toEqual(expect.arrayContaining(br5));
      result =  checkBoardForMatches(result, 20);
      expect(result[0]).toEqual(expect.arrayContaining(br1));
      expect(result[1]).toEqual(expect.arrayContaining(br2));
      expect(result[2]).toEqual(expect.arrayContaining(br3));
      expect(result[3]).toEqual(expect.arrayContaining([6, 10,  -1, 18,  5]));
      expect(result[4]).toEqual(expect.arrayContaining([1, 12, -1, 15, 19]));
    })
  });

  describe('checkForWinningRow', () => {
    it('should return true if all the values in the boardrow = -1', () => {
      const boardRow: BoardRow = [-1, -1, -1, -1, -1];
      const result = checkForWinningRow(boardRow);
      expect(result).toBe(true);
    })

    it('should return false if not all of the values are set to -1 ', () => {
      let boardRow: BoardRow = [-1, -1, -1, 0, -1];
      let result = checkForWinningRow(boardRow);
      expect(result).toBe(false);
      boardRow = [1, -1, -1, -1, -1];
      result = checkForWinningRow(boardRow);
      expect(result).toBe(false);
    })
  });

  describe('checkBoardForWinningColumn', () => {
    const testData = board1;
    it('shoudl return a winner if the all the values in a column are set to -1', () => {
      testData[0][1] = -1;
      testData[1][1] = -1;
      testData[2][1] = -1;
      testData[3][1] = -1;
      testData[4][1] = -1;
      console.log('%c⧭', 'color: #0088cc', testData);
      const result = checkBoardForWinningColumn(testData);
      expect(result).toBe(true);
    });
    
    it('should return false if all the values in the column and not set to -1', () => {
      testData[1][1] = 1;
      const result = checkBoardForWinningColumn(testData);
      expect(result).toBe(false);
    })
  });

  describe('checkForAWinner', () => {

    it('should return a winning board if a row in the board is set to all -1', () => {
      const testBoard = [...board3];
      testBoard[0][1] = -1;
      testBoard[1][1] = -1;
      testBoard[2][1] = -1;
      testBoard[3][1] = -1;
      testBoard[4][1] = -1;
      const testBoards: AllBoards = [
        board1,
        testBoard,
        board3,
      ];
      const result = checkForAWinner(testBoards);
      expect(result).toEqual(expect.arrayContaining(testBoard));
    });
    
    it('should return a winning board if a column in the board is set to all -1', () => {
      const testBoard = [...board2];
      testBoard[0][0] =-1;
      testBoard[0][1] =-1;
      testBoard[0][2] =-1;
      testBoard[0][3] =-1;
      testBoard[0][4] =-1;
      const testBoards: AllBoards = [
        board1,
        testBoard,
        board3,
      ];
      const result = checkForAWinner(testBoards);
      expect(result).toEqual(expect.arrayContaining(testBoard));
    });

    it('should not return a winning board if none of the columns or rows have all -1s in them', () => {
      const testBoards: AllBoards = [
        board1,
        board2,
        board3,
      ];
      const result = checkForAWinner(testBoards);
      expect(result.length).toBe(0);
    });
  });

  describe('getSumOfUmarkedNumbers', () => {
    it('should return the sum of the all number not equal to -1', () => {
      const testBoard = [...board3];
      testBoard[1][0] =-1;
      testBoard[1][1] =-1;
      testBoard[1][2] =-1;
      testBoard[1][3] =-1;
      testBoard[1][4] =-1;
      const result = getSumOfUmarkedNumbers(testBoard);
      expect(result).toBe(256);
    })
  });

  describe('playBingo', () => {
    it('should return 4512 when played with the test numbers', () => {
      const drawNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
      const result = playBingo(rawTestData, drawNumbers);
      expect(result).toBe(4512);
    }
      
    )
  })

  describe('removeWinningBoard', () => {
    it('Should match two arrays if their contents are identical', () => {
      const winningBoard = board2;
      const boards: AllBoards = [board1, board2, board3 ];
      const result = removeWinningBoard(boards, winningBoard);
      expect(result).toEqual(expect.arrayContaining([board1, board3]));
    })
  })

  describe('findTheLastWinningBoard', () => {
    it('should find the last winning board', ()=> {

      const drawNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
      const result = findTheLastWinningBoard(rawTestData, drawNumbers);
      expect(result).toBe(1924);
    })
  })

})