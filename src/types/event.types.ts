import { CollectionURI } from "dto/external/collection-uri.dto";
import { Image } from "./image.types"
import { Storie } from "./storie.types";
import { Serie } from "./serie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { Comic } from "./comic.types";

export interface Event {
    id: number;
    title: string,
    description: string,
    resourceURI: string,
    modified: Date | null,
    start: Date,
    end: Date,
    thumbnail: Image,
    comics: CollectionURI | Comic[],
    stories: CollectionURI | Storie[],
    series: CollectionURI | Serie[],
    characters: CollectionURI | Character[]
    creators: CollectionURI | Creator[]
}