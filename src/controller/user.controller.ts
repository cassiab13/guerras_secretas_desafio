import { Request, Response } from 'express';
import { User } from '../../src/types/user.types';
import { CrudController } from './crud.controller';
import { UserService } from '../service/user.service';
import { StatusCode } from '../enums/status.code';

export class UserController extends CrudController<User> {

    protected readonly service: UserService;

    constructor(service: UserService) {
        super(service);
        this.service = service;
    }

    public async auth(request: Request, response: Response) {

        const user: User = request.body;
        const token: string = await this.service.auth(user);

        response.status(StatusCode.SUCCESS).json(token);

    }

}