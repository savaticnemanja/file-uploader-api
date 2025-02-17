import { RequestHandler } from 'express';
import { projectService, userService } from '../services';

export const getCurrent: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ currentUser: req.currentUser });
  } catch (err) {
    next(err);
  }
};

export const getAllProjects: RequestHandler = async (req, res, next) => {
  try {
    const result = await projectService.getManyByUserId(Number(req.currentUser.id), req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateCurrent: RequestHandler = async (req, res, next) => {
  try {
    await userService.updateOne(req.currentUser.id, req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    await userService.updatePassword(req.currentUser.id, req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
