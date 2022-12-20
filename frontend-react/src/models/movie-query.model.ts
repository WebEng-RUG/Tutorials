/**
 * Here we describe what a `MovieQuery` should look like
 */
interface PaginationQuery {
    title?: string,
    year?: string,
    'order-dir': string,
    'order-by': string,
    limit : number,
    offset : number
}


export type {
    PaginationQuery
}