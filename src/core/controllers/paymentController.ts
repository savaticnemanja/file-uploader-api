import { RequestHandler } from 'express';
import { paymentService } from '../services';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    await paymentService.createOne(req.body);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    await paymentService.updateOne(Number(req.params.id), req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const deleteOne: RequestHandler = async (req, res, next) => {
  try {
    await paymentService.deleteOne(Number(req.params.id));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};
