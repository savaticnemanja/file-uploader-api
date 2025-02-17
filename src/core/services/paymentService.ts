import { paymentRepository, projectRepository } from '../repositories';
import { PaymentCreate, PaymentUpdate } from '../types';

export const getManyByProjectId = async (projectId: number) => {
  await projectRepository.getPaymentsById(projectId);
};

export const createOne = async (data: PaymentCreate) => {
  await paymentRepository.createOne(data);
};

export const updateOne = async (id: number, data: PaymentUpdate) => {
  await paymentRepository.updateOne(id, data);
};

export const deleteOne = async (id: number) => {
  await paymentRepository.deleteOne(id);
};
