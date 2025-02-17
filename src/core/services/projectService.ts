import { fileService } from '.';
import { userRepository, paymentRepository, projectRepository, fileRepository } from '../repositories';
import { ProjectCreate, ProjectUpdate, ProjectQuery } from '../types';
import { createProjectLink } from '../utils';

export const getMany = async (query: ProjectQuery) => {
  const projects = await projectRepository.getMany(query);
  return projects;
};

export const getManyByUserId = async (userId: number, query: ProjectQuery) => {
  const projects = await userRepository.getProjectsById(userId, query);
  return projects;
};

export const getOneByLink = async (link: string) => {
  const projects = await projectRepository.getProjectsByLink(link);
  return projects;
};

export const createOne = async (data: ProjectCreate) => {
  const link = await createProjectLink();
  await projectRepository.createOne({ ...data, link });
};

export const deleteOne = async (id: number) => {
  await paymentRepository.deleteMany(id);

  const files = await fileRepository.getManyByProjectId(id);
  await Promise.all(files.map((file) => fileService.deleteOne(file.id)));

  await projectRepository.deleteOne(id);
};

export const updateOne = async (id: number, data: ProjectUpdate) => {
  await projectRepository.getOneById(id);
  await projectRepository.updateOne(id, data);
};
