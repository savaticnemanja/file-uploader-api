import { RequestHandler } from 'express';
import { fileService } from '../services';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    await fileService.createOne(req.body, req.file);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const deleteOne: RequestHandler = async (req, res, next) => {
  try {
    await fileService.deleteOne(Number(req.params.id));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};
