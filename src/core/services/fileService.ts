import { FILE } from '../constants';
import { fileRepository } from '../repositories';
import { FileCreate } from '../types';
import { AppError, deleteFile } from '../utils';

export const createOne = async (data: FileCreate & { link: string }, file: Express.Multer.File | undefined) => {
  if (!file) throw new AppError('file not uploaded', 404);

  const fileData = {
    project: { connect: { link: data.link } },
    name: file.filename,
  };

  await fileRepository.createOne(fileData);
};

export const deleteOne = async (id: number) => {
  const file = await fileRepository.getOneById(id);
  await deleteFile(file.name, FILE.FILES);
  await fileRepository.deleteOne(id);
};
