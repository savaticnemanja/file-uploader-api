import { userRepository } from '../repositories';
import { hashPassword } from '../utils';
import { UserCreate, UserUpdate, AdminGetUsersQuery } from '../types';

export const getMany = async (query: AdminGetUsersQuery) => {
  const users = await userRepository.getMany(query);
  return users;
};

export const createOne = async (data: UserCreate) => {
  await userRepository.checkMail(data.mail);
  const hashedPassword = await hashPassword(data.password);
  await userRepository.createOne({ ...data, password: hashedPassword });
};

export const updateOne = async (userId: number, data: UserUpdate) => {
  await userRepository.updateOne(userId, data);
};

export const updatePassword = async (userId: number, data: { password: string }) => {
  const password = await hashPassword(data.password);
  await userRepository.updateOne(userId, { password });
};

export const addProject = async (userId: number, projectId: number) => {
  await userRepository.addProject(userId, projectId);
};

export const removeProject = async (userId: number, projectId: number) => {
  await userRepository.removeProject(userId, projectId);
};

export const deleteOne = async (id: number) => {
  await userRepository.deleteOne(id);
};
