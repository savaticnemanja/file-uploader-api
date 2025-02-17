import { Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIsPrismaError = (err: any) =>
  err instanceof PrismaClientKnownRequestError ||
  err instanceof PrismaClientUnknownRequestError ||
  err instanceof PrismaClientInitializationError ||
  err instanceof PrismaClientRustPanicError ||
  err instanceof PrismaClientValidationError;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorStatusCode = (err: any, res: Response): number => {
  const isPrismaError = checkIsPrismaError(err);
  if (isPrismaError) return 404;
  return err.statusCode ?? res.statusCode ?? 500;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (err: any): string => {
  const isPrismaError = checkIsPrismaError(err);
  if (isPrismaError) return 'Database Error';
  return err.message || 'Internal server error';
};
