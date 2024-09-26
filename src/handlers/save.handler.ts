
export interface SaveHandler {

    setNext(handler: SaveHandler): SaveHandler;

    save(): Promise<any>;

}