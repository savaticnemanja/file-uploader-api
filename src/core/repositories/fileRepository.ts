import { fileModel } from '../modules';
import { FileCreate } from '../types';
import { AppError } from '../utils';

export const getOneById = async (id: number) => {
  const file = await fileModel.findUnique({ where: { id } });
  if (file === null) throw new AppError('no file found', 404);
  return file;
};

export const getManyByProjectId = async (projectId: number) => {
  const files = await fileModel.findMany({ where: { projectId } });
  return files;
};

export const createOne = async (data: FileCreate) => {
  await fileModel.create({ data });
};

export const deleteOne = async (id: number) => {
  await fileModel.delete({ where: { id } });
};
