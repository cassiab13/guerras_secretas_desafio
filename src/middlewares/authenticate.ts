import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../enums/status.code";
import { ForbiddenError } from "../utils/errors/forbidden.error";
import { UnauthorizedError } from "../utils/errors/unauthorized.error";
import { Token } from "../utils/token.utils";

export default class Authenticate {

    public static async populate(request: Request, response: Response, next: NextFunction): Promise<void> {
    
        const authHeader = request.headers.authorization;

        if(!authHeader || !authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError("Token not found", StatusCode.UNAUTHORIZED);
        }

        const token: string = authHeader.split(' ')[1];
        const payload = Token.verify(token);

        if (!payload.isAdmin) {
            throw new ForbiddenError("Only admins can populate the database", StatusCode.FORBIDDEN);
        }

        next();
    }

}
