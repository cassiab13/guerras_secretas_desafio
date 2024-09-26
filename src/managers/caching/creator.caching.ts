import { Creator } from '../../types/creator.types';
import { CreatorRepository } from '../../repository/creator.repository';
import creatorModel from '../../schema/creator.schema';

export class CreatorCaching {
    private static instance: CreatorCaching | null = null;
    private static creatorById: Map<number, Creator> = new Map();
    private static readonly repository: CreatorRepository = new CreatorRepository(creatorModel);

    public static getInstance(): CreatorCaching {
        if (!CreatorCaching.instance) {
            CreatorCaching.instance = new CreatorCaching();
        }

        return CreatorCaching.instance;
    }

    public async findCreator(creator: Creator): Promise<Creator> {
        if (CreatorCaching.creatorById.has(creator.id)) {
            return CreatorCaching.creatorById.get(creator.id)!;
        }

        return this.saveCreator(creator);
    }

    public clear() {
        CreatorCaching.creatorById.clear();
        CreatorCaching.instance = null;
    }

    private async saveCreator(creator: Creator): Promise<Creator> {
        const newCreator: Creator = await CreatorCaching.repository.create(creator);
        CreatorCaching.creatorById.set(creator.id, newCreator);

        return newCreator;
    }

    private async populateUriByObjectId(): Promise<void> {
        const creators: Creator[] = await CreatorCaching.repository.findAll();
        creators.map(creator => {
            CreatorCaching.creatorById.set(creator.id, creator);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }
}