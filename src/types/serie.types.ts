import { Image } from "./image.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { Event } from "./event.types";
import { CollectionURI } from "../dto/external/collection-uri.dto";

export interface Serie {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date | null;
  thumbnail: Image;
  comics: CollectionURI | Comic[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
  characters: CollectionURI | Character[];
  creators: CollectionURI | Creator[];
}
