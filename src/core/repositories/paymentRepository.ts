import { paymentModel } from '../modules';
import { PaymentCreate, PaymentUpdate } from '../types';

export const createOne = async (data: PaymentCreate) => {
  await paymentModel.create({ data });
};

export const updateOne = async (id: number, data: PaymentUpdate) => {
  await paymentModel.update({ where: { id }, data });
};

export const deleteMany = async (projectId: number) => {
  await paymentModel.deleteMany({ where: { projectId } });
};

export const deleteOne = async (id: number) => {
  await paymentModel.delete({ where: { id } });
};
