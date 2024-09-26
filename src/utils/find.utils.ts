
export class Find {

    private _populate: string[] = [];
    private _project: any = {};
    private _filter: any = {};
    private _sort: any = {};
    private _page: number;
    private _pageSize: number;
    private _skip: number;

    constructor(query: any) {
        this._page = parseInt(query.page as string, 10) || 1;
        this._pageSize = parseInt(query.pageSize as string, 10) || 10;
        this._skip = (this._page - 1) * this._pageSize;
        this.generatePopulate(query);
        this.generateProject(query);
        this.generateSort(query);
        this.generateFinalFilter(query, this.generateFilter(query));
    }

    public get populate(): string[] {
        return this._populate;
    }

    public get project(): any {
        return this._project;
    }

    public get filter(): any {
        return this._filter;
    }

    public get sort(): any {
        return this._sort;
    }

    public get page(): number {
        return this._page;
    }

    public get pageSize(): number {
        return this._pageSize;
    }

    public get skip(): number {
        return this._skip;
    }

    private generateFilter(query: any): any[] {

        const filters: any[] = [];

        delete query.operator;
        delete query.sort;
        delete query.project;
        delete query.populate;
        delete query.page;
        delete query.pageSize;

        const values = Object.keys(query);
        values.forEach(value => {

            const columnAndOperator = value.split(":");

            const valueColumn = isNaN(Number(query[value])) ? query[value] : Number(query[value]);
            const column = columnAndOperator[0];
            const conditional = columnAndOperator[1];

            filters.push(this.generateFilterByConditional(conditional, valueColumn, column));

        });

        return filters;
    }

    private generateFinalFilter(query: any, filters: any[]): void {

        const operator: string = query.operator as string;

        if (filters.length === 0) {
            this._filter = {}
            return;
        }

        const operators: any = { and: { $and: filters }, or: { $or: filters }}
        this._filter = operators[operator] || { $and: filters };
    }

    private generateSort(query: any): void {

        const sort: string = query.sort as string;

        if (sort) {

            const sorts = sort.split(",");
            sorts.forEach(value => {

                const splitValue = value.split(":");
                const name = splitValue[0];
                const order = this.order(splitValue[1]);

                this._sort[name] = order;

            });
        }
    }

    private order(order: string) {

        const orders: any = {
            asc: 1,
            desc: -1
        }

        return orders[order] || 1;
    }

    private generateProject(query: any): void {

        const project: string = query.project as string;

        if(project) {
            this._project['_id'] = 0;

            const projects = project.split(",");
            projects.forEach(value => {
                this._project[value] = 1
            })
        }
    }

    private generatePopulate(query: any): void {

        const populate: string = query.populate as string;

        if (populate) {
            this._populate = populate.split(",");
        }
    }

    private generateFilterByConditional(conditional: string, value: any, column: string): any {

        const conditionals: any = {
            eq: { [column]: { $eq: value }},
            ne: { [column]: { $ne: value }},
            gt: { [column]: { $gt: value }},
            gte: { [column]: { $gte: value }},
            lt: { [column]: { $lt: value }},
            lte: { [column]: { $lte: value }},
            like: typeof value === 'string' ? this.generateFilterRegex(value, column) : null
        }

        return conditionals[conditional] || { [column]: { $eq: value }};
    }

    private generateFilterRegex(value: string, column: string) {
        const regex = new RegExp(this.escapeRegexCharacters(value), 'i');
        return { [column]: { $regex: regex } }
    }

    private escapeRegexCharacters(regexString: string) {
        return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
