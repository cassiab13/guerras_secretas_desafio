import { Comic } from '../../types/comic.types';
import { CollectionURI } from './collection-uri.dto';
import { ImageExternal } from './image-external.dto';
import { Storie } from '../../types/storie.types';
import { Serie } from '../../types/serie.types';
import { Character } from '../../types/character.types';
import { Creator } from '../../types/creator.types';

export interface EventExternal {
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    modified: Date;
    start: Date;
    end: Date;
    thumbnail: ImageExternal;
    comics: CollectionURI | Comic[];
    stories: CollectionURI | Storie[];
    series: CollectionURI | Serie[];
    characters: CollectionURI | Character[];
    creators: CollectionURI | Creator[];
}
