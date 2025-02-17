import { RequestHandler } from 'express';
import { statisticService } from '../services';

export const get: RequestHandler = async (req, res, next) => {
  try {
    const result = await statisticService.get();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
