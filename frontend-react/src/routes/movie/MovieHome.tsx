import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";

import {Movie as MovieDB} from "../../models";

import {DeleteMovie, UpdateMovie} from "./components";

import {BackendContext} from "../BackendContext";
import {getOneMovie} from "../../api";

/**
 * The type of the path variable
 * in here we add the name of the path variable and the type of the variable
 * We put this on top of the component so that we can use it in the component
 * and even export it if necessary
 */
type PathVariables = {
    id: string;
}

function Movie() : JSX.Element {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // this will get us the id from the path
    // the field id is the name of the path variable, so it has to be the same
    // as the name of the path variable in the router
    const { id } = useParams<PathVariables>();

    // we need to store the movie in the state
    // so that we can pass it down to the child components that 
    // are going to use it to render the movie
    const [movie, setMovie] = useState<MovieDB>();

    // we need a state to store the loading state, which is an indicator
	// that the data is being fetched
    const [loading, setLoading] = useState(false);

    // this hook ensures that the movie is retrieved when the backend changes
    // so once the backend changes, the function `retrieveMovie` is called
    // which forces the component to re-render
    useEffect(() => {
        retrieveMovie();
    }, [backend]);

    // this function is going to retrieve the movie from the backend
    // and store it in the state 
    /** Promise since the function is async */
    async function retrieveMovie () : Promise<void> {
        if (id === undefined) { // no id for whatever reason so we return
            return;
        }
        // we are loading the movie, so we set the loading state to true
        setLoading(true);

        try {
            const data : MovieDB = await getOneMovie(backend, id);
            // store the movie in the state, this will cause the component to re-render
            setMovie(data);
        } catch (error) {
            console.error(error);
        }

        // done loading the movie, so we set the loading state to false
        setLoading(false);
    }


    return (
        <div>
            {
                movie ? // if the movie is not null
                // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
                <>
                    {/* deal with the update of the movie request */}
                    <UpdateMovie movie={movie} id={id} loading={loading}/>
                    {/* deal with the deletion of the movie request */}
                    <DeleteMovie id={id} />
                </>
                :
                // if the movie is null then we are loading or the movie was not found
                loading ? <p>Loading...</p> : <p>Movie not found</p>
            }

        </div>
    )

}

export {
    Movie
};