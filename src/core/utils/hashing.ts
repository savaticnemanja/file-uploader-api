import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import AppError from './classes/AppError';

export const checkPassword = async (password: string, usersPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(password, usersPassword);
  if (!isPasswordCorrect) throw new AppError('wrong password', 401);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(12));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const createProjectLink = async () => {
  const hash = await crypto.randomBytes(10).toString('hex');
  return hash;
};

export const createFileName = (originalname: string) => {
  const hash = crypto.createHash('md5').update(originalname).digest('hex');
  const extension = originalname.split('.').pop() || 'pdf';
  const fileName = `${Date.now()}${hash}.${extension}`;
  return fileName;
};
