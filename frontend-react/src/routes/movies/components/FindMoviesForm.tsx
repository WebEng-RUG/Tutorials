import { useContext, useEffect, useState } from "react";

import { MovieSummary } from "./MovieSummary";
import { BackendContext } from "../../BackendContext";
import { getMovies } from "../../../api/movies";
import { PaginationQuery, MovieSummary as MovieSummaryType } from "../../../models";
import { Pagination } from "../../components/Pagination";


/**
 * Fetches the movies from the given backend
 * 
 * @returns the form to find movie * 
 */
function FindMoviesForm() : JSX.Element {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // we need a state to store the results
    // - this is used to pass down to the MovieResults component
    const [results, setResults] = useState([] as MovieSummaryType[]);

    // we need a state to store the loading state, which is an indicator that the data is being fetched
    // - this is used to pass down to the MovieResults component
    const [loading, setLoading] = useState(false);

    // we need a state to store the limit
    const [limit, setLimit] = useState(10);
    // we need a state to store the offset
    const [offset, setOffset] = useState(0);

    // in this case we do need a state to store the form
    // since the user may change some queries needed to fetch the data
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [orderDir, setOrderDir] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');


    /** Promise since the function is async */
    async function handleSubmit (event : React.FormEvent<HTMLFormElement>) : Promise<void> {
        // make sure to prevent the default behavior        
        event.preventDefault();        
        // call the retrieveMovies function
        await retrieveMovies();
    }

    /** Promise since the function is async */
    async function retrieveMovies () : Promise<void> {
        // fetching the data starts from this point
        // so set loading to true
        setLoading(true);

        try {
            const data = await getMovies(backend, {title, year, 'order-by' : orderBy, 'order-dir' : orderDir, offset, limit} as PaginationQuery);
            setResults(data);

            // fetching is done, so set loading to false
            setLoading(false);
        } catch (error : any) {
            let errorMessage = `Error while fetching movies\n`;
            let resMessage = error.data?.response['error-message'];
            if (resMessage) {
                errorMessage += error.data.response['error-message'];
            }
            alert(errorMessage);
            console.error(error);

            // error occurred, so set loading to false
            setLoading(false);
        }
    }

    /**
     * useEffect hook, this will recall retrieveMovies when the backend, limit or offset changes
     * - This makes our frontend reactive to changes
     * Be aware that I made it so that the view gets updated when any value changes
     * you might not want that in your case (the backend will get less calls that way)
     */
    useEffect(() => {
        retrieveMovies();
    }, [backend, limit, title, year, offset, orderDir, orderBy])
    
    
    /**
     * These are the props we pass to the pagination component
     * 
     * Notice that we pass the states and the setters of them. Since the states
     * are in the current component, a change in the state will trigger a re-render
     * So this component will be re-rendered when the states change.
	 * 
	 * Since in our `useEffect` here above watches for changes in any of the states
	 * passed down to the pagination component, it will call the `retrieveActor` function
	 * on every change of the states, which will trigger a re-render of this component
     * 
     */
    const paginationProps = {
        setOffset,
        setLimit,
        setOrderDir,
        setOrderBy,
        limit,
        offset,
        orderByList : ['Title', 'Year', 'Rating'],
    }

    /**
     * We do not need to use the state to store the form data
     * because we can use the FormData object to get the data
     * from the form
     * This way our app is more **reactive**  :) and uses less states
     * 
     */

    return (
        <div>
            <h3>Find Movies</h3>
            <form onSubmit={handleSubmit}>
                {/* we dont want the offset to be big resulting in us not seeing the result
                    so we set it to 0 for both the title and the year */}
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    setOffset(0);
                }}/>

                <label htmlFor="year">Year</label>
                <input type="text" id="year" name="year" onChange={(e) => {
                    setYear(e.currentTarget.value)
                    setOffset(0);
                }}/>

                <Pagination {...paginationProps} />
                
                <button type="submit">Search</button>
            </form>

            <MovieSummary movies={results} loading={loading} />
        </div>
    );
}

export {
    FindMoviesForm
};