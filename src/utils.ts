import { promises as fs } from 'fs';
import path from 'path';

export const writeFileSafely = async (writeLocation: string, content: any) => {
  await fs.mkdir(path.dirname(writeLocation), { recursive: true });
  await fs.writeFile(writeLocation, content);
};
