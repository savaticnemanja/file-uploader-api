import { userModel } from '../modules';
import { UserCreate, UserUpdate, AdminGetUsersQuery, ProjectQuery } from '../types';
import { AppError, filter } from '../utils';

export const getMany = async (query: AdminGetUsersQuery) => {
  const take = query.take ? Number(query.take) : 10;
  const skip = query.page ? Number(query.page) * take : 0;

  const options = {
    skip,
    take,
    where: filter.user(query),
    include: { projects: true },
  };

  const users = await userModel.findMany(options);
  if (users.length === 0) throw new AppError('no users found', 404);
  return users;
};

export const getOneById = async (id: number) => {
  const user = await userModel.findUnique({ where: { id } });
  if (user === null) throw new AppError('no user found', 404);
  return user;
};

export const getOneByMail = async (mail: string) => {
  const user = await userModel.findUnique({ where: { mail } });
  if (user === null) throw new AppError('no user found', 404);
  return user;
};

export const getProjectsById = async (id: number, query: ProjectQuery) => {
  const take = query.take ? Number(query.take) : 10;
  const skip = query.page ? Number(query.page) * take : 0;

  const options = {
    where: { id },
    include: {
      projects: {
        skip,
        take,
        where: filter.project(query),
      },
    },
  };
  const user = await userModel.findUnique(options);

  if (user === null) throw new AppError('no user found', 404);
  if (user.projects === null) throw new AppError('no projects found', 404);

  return user.projects;
};

export const createOne = async (data: UserCreate) => {
  const user = await userModel.create({ data });
  return user;
};

export const updateOne = async (id: number, data: UserUpdate) => {
  await userModel.update({ where: { id }, data });
};

export const addProject = async (userId: number, projectId: number) => {
  await userModel.update({
    where: { id: userId },
    data: { projects: { connect: { id: projectId } } },
  });
};
export const removeProject = async (userId: number, projectId: number) => {
  await userModel.update({
    where: { id: userId },
    data: { projects: { disconnect: { id: projectId } } },
  });
};

export const deleteOne = async (id: number) => {
  await userModel.delete({ where: { id } });
};

export const checkMail = async (mail: string) => {
  const user = await userModel.findUnique({ where: { mail } });
  if (user) throw new AppError('mail already taken', 404);
  return user;
};
