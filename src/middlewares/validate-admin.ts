import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../enums/status.code";
import { UnauthorizedError } from "../utils/errors/unauthorized.error";
import { Token } from "../utils/token.utils";


export default class ValidateAdmin {

    public static async isAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    
        const authHeader = request.headers.authorization;

        const body: any = request.body;

        if (!body.isAdmin) {
            next();
            return;
        }

        if(!authHeader || !authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError("Token not found", StatusCode.UNAUTHORIZED);
        }

        const token: string = authHeader.split(' ')[1];
        const payload = Token.verify(token);

        if(body.isAdmin && !payload.isAdmin) {
            throw new UnauthorizedError("Somente administradores podem criar novos administradores.", StatusCode.UNAUTHORIZED);
        }

        next();
    }

}
