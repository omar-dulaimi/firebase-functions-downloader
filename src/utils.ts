import type { Mode, ObjectEncodingOptions, OpenMode } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';

export const writeFileSafely = async (
  writeLocation: string,
  content: any,
  options?:
    | (ObjectEncodingOptions & {
        mode?: Mode | undefined;
        flag?: OpenMode | undefined;
      })
    | BufferEncoding
    | null,
) => {
  await fs.mkdir(path.dirname(writeLocation), { recursive: true });
  await fs.writeFile(writeLocation, content, options);
};
