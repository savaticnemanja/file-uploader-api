import { RequestHandler } from 'express';
import { userService } from '../services';

export const getManyUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getMany(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createOneUser: RequestHandler = async (req, res, next) => {
  try {
    await userService.createOne(req.body);
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const updateOneUser: RequestHandler = async (req, res, next) => {
  try {
    await userService.updateOne(Number(req.params.id), req.body);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const addProjectToUser: RequestHandler = async (req, res, next) => {
  try {
    await userService.addProject(Number(req.params.userId), Number(req.params.projectId));
    res.status(201).json();
  } catch (err) {
    next(err);
  }
};

export const removeProjectFromUser: RequestHandler = async (req, res, next) => {
  try {
    await userService.removeProject(Number(req.params.userId), Number(req.params.projectId));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};

export const deleteOneUser: RequestHandler = async (req, res, next) => {
  try {
    await userService.deleteOne(Number(req.params.id));
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};
