import { ComicText } from "../../types/comit-text.types";
import { ComicDateExternal } from "./comic-date-external.dto";
import { ComicPrice } from "../../types/comic-price.types";
import { ImageExternal } from "./image-external.dto";
import { CollectionURI } from "./collection-uri.dto";
import { Creator } from "../../types/creator.types";
import { Character } from "../../types/character.types";
import { Storie } from "../../types/storie.types";
import { Event } from "../../types/event.types";

export interface ComicExternal {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  resourceURI: string;
  textObjects: ComicText[];
  dates: ComicDateExternal[];
  prices: ComicPrice[];
  thumbnail: ImageExternal;
  images: ImageExternal[];
  creators: CollectionURI | Creator[];
  characters: CollectionURI | Character[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
}