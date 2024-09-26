import config from "../../config";

export class UrlExternalUtils {

    public static generateFind(name: string, id: string): string {
        return `${config.marvel_api}${name}/${id}${UrlExternalUtils.generateCredentials()}`;
    }

    public static generateCredentials(): string {
        return `?ts=${config.ts}&apikey=${config.publicKey}&hash=${config.privateHash}`;
    }

} 