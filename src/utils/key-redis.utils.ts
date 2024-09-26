import { Find } from "./find.utils";

export class KeyRedis {
    public static findPage(url: string, find: Find): string {
        return `${url}-${JSON.stringify(find)}`;
    }
}