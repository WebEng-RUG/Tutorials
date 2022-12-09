import { SelectQueryBuilder } from "typeorm";
import { Min, Max, IsDefined } from "class-validator";

// I define a generic interface describing some kind of "querying"
// operation on a type. This is used for e.g. filtering, sorting,
// and paging on various API pages.
export interface IQueryHelper<T> {
    apply(query: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}

// This is a query implementation supporting paging
export class Paging<T> implements IQueryHelper<T> {
    @Min(1) @Max(100) @IsDefined()
    limit: number;
    offset: number = 0;

    public apply(query: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
        if (!this.limit) this.limit = 100; // default
        if (!this.offset) this.offset = 0;
        return query.skip(this.offset).take(this.limit);
    }
}