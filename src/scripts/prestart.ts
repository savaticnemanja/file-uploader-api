import fs from 'fs';
import { FILE } from '../core/constants';

(async () => {
  const FOLDERS = [FILE.FILES, FILE.DOCUMENTATIONS];

  FOLDERS.forEach((folder) => {
    if (!fs.existsSync(`./public/${folder}/uploads`)) fs.mkdirSync(`./public/${folder}/uploads`, { recursive: true });
  });
})();
