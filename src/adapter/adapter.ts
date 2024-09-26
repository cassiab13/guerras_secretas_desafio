
export interface Adapter<External, Internal> {

    toInternal(external: External): Promise<Internal>;

}