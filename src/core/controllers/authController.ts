import { RequestHandler } from 'express';
import { authService } from '../services';

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.signUp(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.signIn(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
