import type { User } from '@prisma/client';

export {};

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
