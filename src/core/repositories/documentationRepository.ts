import { documentationModel } from '../modules';
import { DocumentationCreate, DocumentationUpdate, DocumentationQuery } from '../types';
import { AppError, filter } from '../utils';

export const getOneById = async (id: number) => {
  const documentation = await documentationModel.findUnique({ where: { id } });
  if (documentation === null) throw new AppError('no documentation found', 404);
  return documentation;
};

export const getMany = async (query: DocumentationQuery) => {
  const take = query.take ? Number(query.take) : 10;
  const skip = query.page ? Number(query.page) * take : 0;

  const options = {
    skip,
    take,
    where: filter.document(query),
  };

  const documentations = await documentationModel.findMany(options);
  if (documentations.length === 0) throw new AppError('no documentations found', 404);
  return documentations;
};

export const createOne = async (data: DocumentationCreate) => {
  await documentationModel.create({ data });
};

export const updateOne = async (id: number, data: DocumentationUpdate) => {
  await documentationModel.update({ where: { id }, data });
};

export const deleteOne = async (id: number) => {
  await documentationModel.delete({ where: { id } });
};
