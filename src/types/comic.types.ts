import { Storie } from './storie.types';
import { Character } from './character.types';
import { Creator } from './creator.types';
import { ComicPrice } from './comic-price.types';
import { ComicDate } from "./comic-date.types";
import { Serie } from "./serie.types";
import { Image } from "./image.types";
import { Event } from "./event.types";
import { ComicText } from "./comit-text.types";
import { CollectionURI } from '../dto/external/collection-uri.dto';

export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date | null;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  resourceURI: string;
  textObjects: ComicText[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: Image;
  images: Image[];
  creators: CollectionURI | Creator[];
  characters: CollectionURI | Character[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
}