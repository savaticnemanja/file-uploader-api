import { FILE } from '../constants';
import { documentationRepository } from '../repositories';
import { DocumentationCreate, DocumentationUpdate, DocumentationQuery } from '../types';
import { AppError, deleteFile } from '../utils';

export const getMany = async (query: DocumentationQuery) => {
  const documents = await documentationRepository.getMany(query);
  return documents;
};

export const createOne = async (data: DocumentationCreate & { id: string }, file: Express.Multer.File | undefined) => {
  if (!file) throw new AppError('file not uploaded', 404);

  const documentationData = {
    name: data.name,
    fileName: file.filename,
    Project: { connect: { id: Number(data.id) } },
  };

  await documentationRepository.createOne(documentationData);
};

export const updateOne = async (id: number, data: DocumentationUpdate) => {
  await documentationRepository.updateOne(id, data);
};

export const deleteOne = async (id: number) => {
  const documentation = await documentationRepository.getOneById(id);
  await deleteFile(documentation.fileName, FILE.DOCUMENTATIONS);
  await documentationRepository.deleteOne(id);
};
