import { JwtPayload } from 'jsonwebtoken';

export type Token = { token: string };

export type TokenPayload = JwtPayload & { id: number };
