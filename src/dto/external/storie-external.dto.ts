import { Comic } from "../../types/comic.types";
import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";
import { Serie } from "../../types/serie.types";
import { Event } from "../../types/event.types";
import { Character } from "../../types/character.types";
import { Creator } from "../../types/creator.types";

export interface StorieExternal {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: ImageExternal;
  comics: CollectionURI | Comic[];
  series: CollectionURI | Serie[];
  events: CollectionURI | Event[];
  characters: CollectionURI | Character[];
  creators: CollectionURI | Creator[];
}