let ventsMap: Map<string, number> = new Map<string, number>();
type KeyValue = {key: string, value: number};

type Coordinate = {
  x: number,
  y: number,
};

type StartOrEnd =  | 'start' | 'end';

function removeDiagonalLines(ventsMap: string[]): string[] {
  const verticalHorizontalPlots: string[] = [];
  ventsMap.forEach(plot => {
    const start = getStartCoordinates(plot);
    const end = getEndCoordinates(plot);
    if (start.x === end.x || start.y === end.y) {
      verticalHorizontalPlots.push(plot);
    }
  })
  return verticalHorizontalPlots;
}

function getStartCoordinates(point: string): Coordinate {
  const indexOfComma = point.indexOf(',');
  const indexOfArrow = point.indexOf('-') -1;
  return {
    x: parseInt(point.slice(0, indexOfComma)),
    y: parseInt(point.slice(indexOfComma + 1, indexOfArrow)),
  };
}

function getEndCoordinates(point: string): Coordinate {
  const indexOfArrowEnd = point.indexOf('>') + 1;
  const indexOfComma = point.lastIndexOf(',');
  return {
    x: parseInt(point.slice(indexOfArrowEnd, indexOfComma)),
    y: parseInt(point.slice(indexOfComma + 1)),
  };
}

function getCoordinate(point: string, startOrEnd: StartOrEnd): Coordinate {
  if (startOrEnd === 'start') {
    return getStartCoordinates(point);
  } else {
    return getEndCoordinates(point)
  }
}

function getKeyAndValue(key: string, map: Map<string, number> ): KeyValue {
  let value = 0;
  if (map.has(key)) {
    value = map.get(key) as number;
    value++;
  } else {
    value = 1;
  }
  return {key: key, value: value};
}

function addKeyValueToMap(keyValue: KeyValue, map: Map<string, number> ):  Map<string, number> {
  if (map.has(keyValue.key)) {
    map.delete(keyValue.key)
  }
  map.set(keyValue.key, keyValue.value);
  return map;
}

function getNextCoordinate(startValue: number, endValue: number): number {
  if (startValue > endValue) {
    return --startValue;
  } else if (startValue < endValue){
    return ++startValue;
  }
  // return startValue < endValue ? ++startValue : startValue
  return startValue;
}

function populateMap(plots: string[]): Map<string, number> {
  // const data = removeDiagonalLines(plots);
  const data = plots;
  ventsMap.clear();
  data.forEach(point => {
    let start = getCoordinate(point, 'start');
    let end = getCoordinate(point, 'end');
    while (start.x !== end.x || start.y !== end.y) {
      const key = `${start.x}:${start.y}`;
      const newkeyValue = getKeyAndValue(key, ventsMap);
      ventsMap = addKeyValueToMap(newkeyValue, ventsMap);
      start.x = getNextCoordinate(start.x, end.x);
      start.y = getNextCoordinate(start.y, end.y);
    }
    const key = `${end.x}:${end.y}`;
    const newkeyValue = getKeyAndValue(key, ventsMap)
    ventsMap = addKeyValueToMap(newkeyValue, ventsMap);
  });
  return ventsMap;
}

function calcDangerZones(data: Map<string, number>): number {
  let dangerZones = 0;
  data.forEach((value: number) => {
    if (value > 1)  dangerZones++;
  })
  return dangerZones;
}

// function plotVents(data: string[]): void {
  
// }

export {
  getStartCoordinates,
  getEndCoordinates,
  getCoordinate,
  addKeyValueToMap,
  getKeyAndValue,
  getNextCoordinate,
  populateMap,
  calcDangerZones

}