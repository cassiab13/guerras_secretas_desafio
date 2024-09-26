import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Storie } from "./storie.types";
import { Comic } from "./comic.types";
import { Event } from "./event.types";
import { CollectionURI } from "../dto/external/collection-uri.dto";

export interface Creator {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  role: string;
  modified: Date | null;
  resourceURI: string;
  thumbnail: Image;
  series: CollectionURI | Serie[];
  stories: CollectionURI | Storie[];
  comics: CollectionURI | Comic[];
  events: CollectionURI | Event[];
}
