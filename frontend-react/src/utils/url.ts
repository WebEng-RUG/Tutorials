import { PaginationQuery } from "../models";

function constructUrl (url : string, props : PaginationQuery) {
    let newUrl = new URL(url);

    const params = new URLSearchParams();

    for (let [key, value] of Object.entries(props)) {
        if (value) {
            params.set(key, value.toString());
        }
    }

    return newUrl + params.toString();
}

export {
    constructUrl
}