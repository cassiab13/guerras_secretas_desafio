import { Comic } from '../../types/comic.types';
import { CollectionURI } from './collection-uri.dto';
import { ImageExternal } from './image-external.dto';
import { Storie } from '../../types/storie.types';
import { Event } from '../../types/event.types';
import { Serie } from '../../types/serie.types';

export interface CharacterExternal {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    thumbnail: ImageExternal;
    comics: CollectionURI | Comic[];
    stories: CollectionURI | Storie[];
    events: CollectionURI | Event[];
    series: CollectionURI | Serie[];
}
