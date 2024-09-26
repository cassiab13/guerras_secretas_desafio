import { Storie } from '../../types/storie.types';
import { StorieRepository } from '../../repository/storie.repository';

export class StorieCaching {
    
    private static instance: StorieCaching | null = null;
    private static storieById: Map<number, Storie> = new Map();
    private static readonly repository: StorieRepository = new StorieRepository();
    
    public static getInstance(): StorieCaching {

        if(!StorieCaching.instance) {
            StorieCaching.instance = new StorieCaching();
        }

        return StorieCaching.instance;
    }

    public async findStorie(storie: Storie): Promise<Storie> {
        
        if (StorieCaching.storieById.has(storie.id)) {
            return StorieCaching.storieById.get(storie.id)!;
        }

        return this.saveStorie(storie);
    }

    public clear() {
        StorieCaching.storieById.clear();
        StorieCaching.instance = null;
    }

    private async saveStorie(storie: Storie): Promise<Storie> {
        
        const newStorie: Storie = await StorieCaching.repository.create(storie);
        StorieCaching.storieById.set(newStorie.id, newStorie);
        
        return newStorie; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const stories: Storie[] = await StorieCaching.repository.findAll();
        stories.map(storie => {
            StorieCaching.storieById.set(storie.id, storie);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}