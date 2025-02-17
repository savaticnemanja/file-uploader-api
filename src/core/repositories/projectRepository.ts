import { projectModel } from '../modules';
import { AppError, filter } from '../utils';
import { ProjectCreate, ProjectUpdate, ProjectQuery } from '../types';

export const getMany = async (query: ProjectQuery) => {
  const take = query.take ? Number(query.take) : 10;
  const skip = query.page ? Number(query.page) * take : 0;

  const options = {
    include: { payments: true, files: true },
    skip,
    take,
    where: filter.project(query),
  };
  const projects = await projectModel.findMany(options);
  if (projects.length === 0) throw new AppError('no projects found', 404);
  return projects;
};

export const getOneById = async (id: number) => {
  const project = await projectModel.findUnique({ where: { id }, include: { files: true } });
  if (project === null) throw new AppError('no project found', 404);
  return project;
};

export const getPaymentsById = async (id: number) => {
  const project = await projectModel.findUnique({ where: { id }, include: { payments: true, files: true } });

  if (project === null) throw new AppError('no project found', 404);
  if (project.payments === null) throw new AppError('no payments found', 404);

  return project.payments;
};

export const createOne = async (data: ProjectCreate) => {
  await projectModel.create({ data });
};

export const updateOne = async (id: number, data: ProjectUpdate) => {
  await projectModel.update({ where: { id }, data });
};

export const deleteOne = async (id: number) => {
  await projectModel.delete({ where: { id } });
};

export const count = async () => {
  const projectsCount = await projectModel.count();
  return projectsCount;
};

export const countActive = async () => {
  const projectsCount = await projectModel.count({ where: { phase: { not: 7 } } });
  return projectsCount;
};

export const sumUpPrices = async () => {
  const projects = await projectModel.findMany();
  const sum = projects.reduce((accumulator, project) => accumulator + project.value, 0);
  return sum;
};

export const sumUpActivePrices = async () => {
  const projects = await projectModel.findMany({ where: { phase: { not: 7 } } });
  const sum = projects.reduce((accumulator, project) => accumulator + project.value, 0);
  return sum;
};

export const getProjectsByLink = async (link: string) => {
  const project = await projectModel.findUnique({ where: { link }, include: { files: true, documentations: true } });
  if (project === null) throw new AppError('no project found', 404);
  return project;
};
