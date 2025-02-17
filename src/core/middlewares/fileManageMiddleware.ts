import multer from 'multer';
import { FILE } from '../constants';
import { createFileName } from '../utils';

export const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/${FILE.FILES}/uploads`);
    },
    filename: (req, file, cb) => {
      cb(null, createFileName(file.originalname));
    },
  }),
}).single('file');

export const uploadDocumentation = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/${FILE.DOCUMENTATIONS}/uploads`);
    },
    filename: (req, file, cb) => {
      cb(null, createFileName(file.originalname));
    },
  }),
}).single('file');
