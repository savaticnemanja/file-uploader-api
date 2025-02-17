import { RequestHandler } from 'express';
import { paymentService, projectService } from '../services';

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const result = await projectService.getMany(req.query);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getManyPayments: RequestHandler = async (req, res, next) => {
  try {
    const result = await paymentService.getManyByProjectId(Number(req.params.id));
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    await projectService.createOne(req.body);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    await projectService.updateOne(Number(req.params.id), req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const deleteOne: RequestHandler = async (req, res, next) => {
  try {
    await projectService.deleteOne(Number(req.params.id));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};

export const getOneByLink: RequestHandler = async (req, res, next) => {
  try {
    const result = await projectService.getOneByLink(req.params.link);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
