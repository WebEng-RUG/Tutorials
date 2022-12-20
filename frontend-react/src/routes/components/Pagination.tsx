import { ChangeEvent } from "react";

interface PaginationProps {
    setOffset : React.Dispatch<React.SetStateAction<number>>;
    setLimit : React.Dispatch<React.SetStateAction<number>>;
    setOrderDir : React.Dispatch<React.SetStateAction<string>>;
    setOrderBy : React.Dispatch<React.SetStateAction<string>>;
    limit : number;
    offset : number;
    orderByList : string[];
}

function Pagination ({setOffset, setLimit, setOrderDir, setOrderBy, limit, offset, orderByList} : PaginationProps) {
    /**
     * Handle the next button
    */
     function handleNext() : void {
        setOffset((currentOffset) => currentOffset + limit);
    }

    /**
     * handles the previous button
      */
    function handlePrevious() : void {
        setOffset((currentOffset) => currentOffset - limit);
    }
    

    /**
     * Handles the results per page select
     * 
     * @param event the change event coming from the select
     */
    function handleResultsChange(event : ChangeEvent<HTMLSelectElement>) : void {
        const newValue = parseInt(event.target.value);
        setLimit(newValue);
        setOffset((currentOffset) => Math.floor(currentOffset / newValue) * newValue);
    }

    return (
        // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
        <>
        <button disabled={offset <= 0} type="button" onClick={handlePrevious}>Previous</button>
        <button type="button" onClick={handleNext}>Next</button>

        <label htmlFor="results">Results Per Page</label>
        <select id="results" name="results" onChange={handleResultsChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <label htmlFor="order-by">Order By</label>
        <select id="order-by" name="order-by" onChange={(e) => setOrderBy(e.currentTarget.value)}>
            {
                orderByList.map((orderBy) => <option key={orderBy.toLowerCase()} value={orderBy}>{orderBy}</option>)
            }
        </select>

        <label htmlFor="order-dir">Order</label>
        <select id="order-dir" name="order-dir" onChange={(e) => setOrderDir(e.currentTarget.value)}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
        </select>
        </>
    );
}

export {
    Pagination
}