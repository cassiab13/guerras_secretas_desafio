import { Request, Response } from 'express';
import { CreatorService } from '../service/creator.service';
import { CrudController } from './crud.controller';
import { Creator } from '../types/creator.types';
import { StatusCode } from '../enums/status.code';

export class CreatorController extends CrudController<Creator> {
    private readonly creatorService: CreatorService;
    constructor(service: CreatorService) {
        super(service);
        this.creatorService = service;
    }

    public async findComicsByCreator(
        req: Request,
        res: Response
    ): Promise<void> {
        const id = req.params.id;
        const comics = await this.creatorService.findComicsByCreator(id);
        res.status(StatusCode.SUCCESS).json(comics);
    }
}
