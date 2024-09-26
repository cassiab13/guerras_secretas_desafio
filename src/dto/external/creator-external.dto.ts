import { Serie } from '../../types/serie.types';
import { CollectionURI } from './collection-uri.dto';
import { ImageExternal } from './image-external.dto';
import { Storie } from '../../types/storie.types';
import { Comic } from '../../types/comic.types';
import { Event } from '../../types/event.types';

export interface CreatorExternal {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    fullName: string;
    role: string;
    modified: Date;
    resourceURI: string;
    thumbnail: ImageExternal;
    series: CollectionURI | Serie[];
    stories: CollectionURI | Storie[];
    comics: CollectionURI | Comic[];
    events: CollectionURI | Event[];
}
