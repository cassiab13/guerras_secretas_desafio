import jwt from 'jsonwebtoken';
import { User } from '../types/user.types';
import { UnauthorizedError } from './errors/unauthorized.error';
import { StatusCode } from '../enums/status.code';

export class Token {

    private static readonly SECRET_KEY: string = process.env.SECRET_KEY!;

    public static generate(user: User): string {
        const payload = {
          email: user.email,
          isAdmin: user.isAdmin
        };
      
        return jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
    }

    public static verify(token: string): jwt.JwtPayload {
        try {
            return jwt.verify(token, this.SECRET_KEY) as jwt.JwtPayload;
        } catch {
            throw new UnauthorizedError("Token inválido", StatusCode.UNAUTHORIZED);
        }
    }

}