import { Serie } from '../../types/serie.types';
import { SerieRepository } from '../../repository/serie.repository';

export class SerieCaching {

    private static instance: SerieCaching | null = null;
    private static serieById: Map<number, Serie> = new Map();
    private static readonly repository: SerieRepository = new SerieRepository();
    
    public static getInstance(): SerieCaching {

        if(!SerieCaching.instance) {
            SerieCaching.instance = new SerieCaching();
        }

        return SerieCaching.instance;
    }

    public async find(serie: Serie): Promise<Serie> {
        
        if (SerieCaching.serieById.has(serie.id)) {
            return SerieCaching.serieById.get(serie.id)!;
        }

        return this.save(serie);
    }

    public clear() {
        SerieCaching.serieById.clear();
        SerieCaching.instance = null;
    }
    
    private async save(serie: Serie): Promise<Serie> {
        
        const newSerie: Serie = await SerieCaching.repository.create(serie);
        SerieCaching.serieById.set(newSerie.id, newSerie);
        
        return newSerie; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const series: Serie[] = await SerieCaching.repository.findAll();
        series.map(serie => {
            SerieCaching.serieById.set(serie.id, serie);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}