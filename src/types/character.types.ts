import { CollectionURI } from '../dto/external/collection-uri.dto';
import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { Event } from './event.types';

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date | null;
  resourceURI: string;
  thumbnail: Image;
  comics: CollectionURI | Comic[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
  series: CollectionURI | Serie[];
}
