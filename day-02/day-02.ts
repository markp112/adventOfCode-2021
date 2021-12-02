
type Position = 'horizontal' | 'vertical';

type Command = {
  direction: Position,
  units: number,
};


function processMovementData(data: string[]) {
  let horizontalTally = 0;
  let verticalTally = 0;
  data.forEach(command => {
    const direction = getDirection(command);
    const unit = getUnits(command);
    const instruction = processCommand(direction, unit);
    if (instruction.direction === 'horizontal') {
      horizontalTally += instruction.units;
    } else {
      verticalTally += instruction.units;
    }
  });
  const result = horizontalTally * verticalTally;
  return result;
}

function getDirection(move: string): string {
  const SPACE = ' ';
  const firstSpace = move.indexOf(SPACE);
  return move.slice(0, firstSpace);
}

function getUnits(move: string): number {
  const SPACE = ' ';
  const firstSpace = move.indexOf(SPACE);
  return parseInt(move.slice(firstSpace));
}

function processCommand(direction: string, unit: number): Command {
  switch (direction) {
    case 'up':
      return { direction: 'vertical', units: unit * -1 };
    case 'down':
      return { direction: 'vertical', units: unit };
    case 'forward':
      return { direction: 'horizontal', units: unit };
    default: 
      throw new Error(`Invalid command cannot compute!! ${direction}`);
  }
}

function processWithAim(data: string[]) {
  let horizontalTally = 0;
  let verticalTally = 0;
  let aim = 0;
  data.forEach(command => {
    const direction = getDirection(command);
    const unit = getUnits(command);
    const instruction = processCommand(direction, unit);
    if (instruction.direction === 'horizontal') {
      horizontalTally += instruction.units;
      verticalTally += aim * instruction.units;
    } else {
      // verticalTally += instruction.units;
      aim += instruction.units;
    }
  });
  const result = horizontalTally * verticalTally;
  return result;
}

export {
  getDirection,
  getUnits,
  processCommand,
  processMovementData,
  processWithAim
};

export type {
  Position,
  Command,
}