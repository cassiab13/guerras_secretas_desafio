import { Request, Response } from "express";

export interface ICrudController {

    findAll(request: Request, response: Response): Promise<void>;

    findById(request: Request, response: Response): Promise<void>;

    create(request: Request, response: Response): Promise<void>;

    update(request: Request, response: Response): Promise<void>;

    delete(request: Request, response: Response): Promise<void>;

}
