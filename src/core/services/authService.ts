import { userRepository } from '../repositories';
import { UserCreate } from '../types';
import { hashPassword, checkPassword, createToken } from '../utils';

export const signUp = async (data: UserCreate) => {
  const hashedPassword = await hashPassword(data.password);

  const user = await userRepository.createOne({ ...data, password: hashedPassword });

  const token = createToken(user.id);
  return { token };
};

export const signIn = async (data: { mail: string; password: string }) => {
  const user = await userRepository.getOneByMail(data.mail);

  await checkPassword(data.password, user.password);

  const token = createToken(user.id);
  return { token };
};
