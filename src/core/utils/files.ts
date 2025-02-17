import path from 'path';
import { promises as fsPromises, existsSync } from 'fs';

export const deleteFile = async (file: string, folder: string) => {
  const filePath = path.resolve(`./public/${folder}/uploads/${file}`);
  if (existsSync(filePath)) {
    await fsPromises.unlink(filePath);
  }
};
