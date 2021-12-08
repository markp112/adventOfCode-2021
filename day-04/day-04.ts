import { readFile } from "../util/readfile";



type BoardRow = number[];

type Board = BoardRow[];

type AllBoards = Board[];

function getBoardData(): string[] {
  const boardDataRaw = readFile('/development/adventOfCode/day-1/day-04', 'boards.dat');
  const boardDataCleaned = boardDataRaw.filter(item => item !=='');
  return boardDataCleaned;
}

function getBoardRow(aRow: string): BoardRow {
  const row = aRow.replace('  ', ' ');
  const textArray = row.split(' ');
  const removeemptyStrings = textArray.filter(value => value !== '');
  return removeemptyStrings.map(textArray =>  parseInt(textArray.trim()))
}

function setupBoards(data: string[]): AllBoards {
  const allBoards: AllBoards = [];
  let boardRow: BoardRow = [];
  let board: Board = [];
  data.forEach(textRow => {
    if (textRow.length > 0) {
      boardRow = getBoardRow(textRow);
      board.push(boardRow);
      if (board.length === 5) {
        allBoards.push(board);
        board = [];
      }
    }
  })
  return allBoards;
}

function drawNumber(nextNumber: number, drawNumbers: number[]): number {
  return nextNumber < drawNumbers.length ? drawNumbers[nextNumber] : -1;
}

function matchDrawnNumber(boardRow: BoardRow, drawnNumber: number): BoardRow {
  return boardRow.map(item => {
    if (item === drawnNumber) {
      item = -1;
    }
    return item;
  });
}

function checkBoardForMatches(board: Board, drawnNumber: number): Board {
  const newBoard: Board = [];
  board.forEach(row => {
    const boardRow = matchDrawnNumber(row, drawnNumber);
    newBoard.push(boardRow);
  });
  return newBoard;
}

function markBoards(gameBoards: AllBoards, drawnNumber: number): AllBoards {
  const boards: AllBoards = [];
  let boardRow: BoardRow = [];
  gameBoards.forEach(board => {
    const newBoard: Board = [];
    boards.push(checkBoardForMatches(board, drawnNumber));
  });
  return boards;
}

function checkForWinningRow(boardRow: BoardRow): boolean {
  return boardRow.reduce(function(a, b) { return a+b }) === -5;
}

function checkBoardForWinningRow(board: Board): boolean {
  let weHaveAWinner = false;
  board.forEach(boardRow => {
    if (checkForWinningRow(boardRow)) {
      weHaveAWinner = true;
    }
  });
  return weHaveAWinner;
}

function checkBoardForWinningColumn(board: Board): boolean {
  let isAWinner = false;
  for (let colIndex = 0; colIndex <= board[0].length; colIndex++) {
    let sum = 0;
    for (let boardIndex = 0; boardIndex < board.length; boardIndex++) {
      sum += board[boardIndex][colIndex];
    }
    if (sum === -5) {
      isAWinner = true;
      break
    };
  }
  return isAWinner;
}

function checkForAWinner(boards: AllBoards): Board {
  const losingBoard: Board = [];
  const winningBoard = boards.map((board, index) => {
    const isWinningBoard = checkBoardForWinningRow(board);
    if (isWinningBoard) {
      return board;
    } else {
      if (checkBoardForWinningColumn(board)) {
        return board;
      } else return losingBoard;
    }
  });
  const isWinningBoard = winningBoard.filter(board => board.length > 0);
  return isWinningBoard.length > 0
    ? winningBoard.filter(board => board.length > 0)[0]
    : losingBoard;
}

function getSumOfUmarkedNumbers(board: Board): number {
  let total = 0;
  board.forEach(board => {
    board.forEach (value => {
      if (value !== -1) total += value;
    });

  })
  return total;
}

function removeWinningBoard(boards: AllBoards, winningBoard: Board): AllBoards {
  const winningBd = JSON.stringify(winningBoard);
  return boards.filter(board => {
    const matchBoard = JSON.stringify(board);
    return matchBoard !== winningBd;
  })
}

function playBingo(boardData: string[], drawNumbers: number[]): number {
  const boards: AllBoards = setupBoards(boardData);
  let round = 0;
  let gameBoards = boards;
  let drawnNumber = drawNumber(round, drawNumbers);
  while (drawnNumber !== -1) {
    gameBoards = markBoards(gameBoards, drawnNumber);
    const winningBoard = checkForAWinner(gameBoards);
    if (winningBoard.length > 0) {
      const sumOfUnmarkedNumbers = getSumOfUmarkedNumbers(winningBoard);
      return sumOfUnmarkedNumbers * drawnNumber;
    } 
    round++;
    drawnNumber = drawNumber(round, drawNumbers)
  }
  
  return -1;
}

function findTheLastWinningBoard(boardData: string[], drawNumbers: number[]): number {
  const boards: AllBoards = setupBoards(boardData);
  let round = 0;
  let gameBoards = boards;
  let drawnNumber = drawNumber(round, drawNumbers);
  let lastWinningBoard: Board = [];
  let lastDrawnNumber = 0;
  while (drawnNumber !== -1) {
    gameBoards = markBoards(gameBoards, drawnNumber);
    let winningBoard = checkForAWinner(gameBoards);
    while(winningBoard.length > 0) {
      lastWinningBoard = winningBoard;
      lastDrawnNumber = drawnNumber;
      if (gameBoards.length === 1) {
        const score = getSumOfUmarkedNumbers(gameBoards[0]);
        return score * drawnNumber;
      }
      gameBoards = removeWinningBoard(gameBoards, winningBoard);
      winningBoard = checkForAWinner(gameBoards);
    }
    round++;
    if (round === drawNumbers.length) {
      const score = getSumOfUmarkedNumbers(lastWinningBoard);
      return score * lastDrawnNumber;
    }
    drawnNumber = drawNumber(round, drawNumbers);
  }
  return -1;
}

export {
  getBoardData,
  getBoardRow,
  setupBoards,
  matchDrawnNumber,
  checkBoardForMatches,
  checkForWinningRow,
  checkBoardForWinningColumn,
  checkForAWinner,
  getSumOfUmarkedNumbers,
  playBingo,
  removeWinningBoard,
  findTheLastWinningBoard
}

export type {
  BoardRow,
  Board,
  AllBoards, 
}