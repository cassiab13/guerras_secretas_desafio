import { Router } from 'express';
import characterModel from '../schema/character.schema';
import { CharacterService } from './../service/character.service';
import { CharacterRepository } from './../repository/character.repository';
import { CharacterController } from './../controller/character.controller';
import { Validate } from '../middlewares/validate';
import { createCharacterDTO } from '../dto/create.character.dto';
import { updateCharacterDTO } from '../dto/update.character.dto';

const characterRoutes = Router();

const characterRepository: CharacterRepository = new CharacterRepository(
    characterModel
);
const characterService: CharacterService = new CharacterService(
    characterRepository
);
const characterController: CharacterController = new CharacterController(
    characterService
);

characterRoutes.get('', characterController.findAll.bind(characterController));
characterRoutes.post(
    '',
    (req, res, next) => Validate.body(req, res, next, createCharacterDTO),
    characterController.create.bind(characterController)
);
characterRoutes.get(
    '/:id',
    characterController.findById.bind(characterController)
);
characterRoutes.put(
    '/:id',
    (req, res, next) => Validate.body(req, res, next, updateCharacterDTO),
    characterController.update.bind(characterController)
);
characterRoutes.delete(
    '/:id',
    characterController.delete.bind(characterController)
);
characterRoutes.get(
    '/:id/comics',
    characterController.findComicsByCharacter.bind(characterController)
);
characterRoutes.get(
    '/:id/series',
    characterController.findSeriesByCharacter.bind(characterController)
);
characterRoutes.get(
    '/:id/thumbnail',
    characterController.findThumbnail.bind(characterController)
);

export { characterRoutes };
