import * as fs from 'fs';
import path from 'path';

function readFile(filepath: string, filename: string): string[] {
  const result:string[] = [];
  const file = path.join(filepath, filename)
  const data = fs.readFileSync(file, 'utf-8');
  const lines = data.split(/\r?\n/);
  lines.forEach(line => 
    result.push(line)
  );
  return result;
}

export {readFile};
