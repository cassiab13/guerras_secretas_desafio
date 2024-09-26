import { Character } from '../../types/character.types';
import { CharacterRepository } from '../../repository/character.repository';
import characterModel from '../../schema/character.schema';

export class CharacterCaching {
    private static instance: CharacterCaching | null = null;
    private static characterById: Map<number, Character> = new Map();
    private static readonly repository: CharacterRepository =
        new CharacterRepository(characterModel);

    public static getInstance(): CharacterCaching {
        if (!CharacterCaching.instance) {
            CharacterCaching.instance = new CharacterCaching();
        }

        return CharacterCaching.instance;
    }

    public async findCharacter(character: Character): Promise<Character> {
        if (CharacterCaching.characterById.has(character.id)) {
            return CharacterCaching.characterById.get(character.id)!;
        }

        return this.saveCharacter(character);
    }

    public clear() {
        CharacterCaching.characterById.clear();
        CharacterCaching.instance = null;
    }

    private async saveCharacter(character: Character): Promise<Character> {
        const newCharacter: Character =
            await CharacterCaching.repository.create(character);
        CharacterCaching.characterById.set(newCharacter.id, newCharacter);

        return newCharacter;
    }

    private async populateUriByObjectId(): Promise<void> {
        const characters: Character[] =
            await CharacterCaching.repository.findAll();
        characters.map(character => {
            CharacterCaching.characterById.set(character.id, character);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}