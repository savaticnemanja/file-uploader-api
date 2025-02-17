import { RequestHandler } from 'express';
import { documentationService } from '../services';

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const result = await documentationService.getMany(req.query);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    await documentationService.createOne(req.body, req.file);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    await documentationService.updateOne(Number(req.params.id), req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const deleteOne: RequestHandler = async (req, res, next) => {
  try {
    await documentationService.deleteOne(Number(req.params.id));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};
