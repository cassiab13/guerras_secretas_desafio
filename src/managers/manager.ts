import { Serie } from "../types/serie.types";

export interface Manager {

    save(serie: Serie): Promise<void>;

}