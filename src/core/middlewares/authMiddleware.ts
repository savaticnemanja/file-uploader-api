import { RequestHandler } from 'express';
import { userRepository } from '../repositories';
import { AppError, stripBearerFromToken, decodeToken } from '../utils';

export const authenticated: RequestHandler = async (req, res, next) => {
  try {
    const token = stripBearerFromToken(req.headers.authorization);

    const { id } = decodeToken(token);
    if (id === undefined) throw new AppError('token not valid', 403);

    req.currentUser = await userRepository.getOneById(id);
    next();
  } catch (err) {
    next(err);
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.currentUser.isAdmin === false) throw new AppError('no access', 403);
    next();
  } catch (err) {
    next(err);
  }
};

const asyncFUnc = async (): Promise<string> => 'test';
