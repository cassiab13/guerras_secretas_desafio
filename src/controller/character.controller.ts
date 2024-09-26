import { Request, Response } from 'express';
import { CharacterService } from '../service/character.service';
import { CrudController } from './crud.controller';
import { Character } from '../types/character.types';
import { StatusCode } from '../enums/status.code';
import { Image } from '../types/image.types';

export class CharacterController extends CrudController<Character> {
    private readonly characterService: CharacterService;

    constructor(service: CharacterService) {
        super(service);
        this.characterService = service;
    }

    public async findComicsByCharacter(req: Request, res: Response): Promise<void> {
        
        const id = req.params.id;
        const comics = await this.characterService.findComicsByCharacter(id);
        
        res.status(StatusCode.SUCCESS).json(comics);
    }

    public async findSeriesByCharacter(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        const series = await this.characterService.findSeriesByCharacter(id);

        res.status(StatusCode.SUCCESS).json(series);
    }

    public async findThumbnail(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const thumbnail: Image = await this.characterService.findThumbnail(id);

        res.status(StatusCode.SUCCESS).json(thumbnail);
    }
}
