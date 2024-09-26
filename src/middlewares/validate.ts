import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status.code';

export class Validate {

    public static async body(request: Request, response: Response, next: NextFunction, body: any): Promise<void> {
        const { error } = body.validate(request.body);
        const valid = error == null; 
  
        if (valid) { 
            next();
            return;
        }
            
        const { details } = error;
        const errors = details.map((i: any) => ({
            message: i.message.replace(/\"/g, ''),
            path: i.path.join('.')
        }));

        response.status(StatusCode.BAD_REQUEST).json({ errors });
    } 
}



