import { useContext, useState } from "react";

import { Movie } from "../../../models";
import { getFormValues } from "../../../utils";
import { BackendContext } from "../../BackendContext";
import { MovieForm } from "../../components/MovieForm";
import { addMovie } from "../../../api";


/**
 * interface for the response
 * which is just the id of the movie that was created
 * 
 * No where else is this needed so we can just define it here
 */
interface Response {
    id : number;
}

/**
 * Fetches the movies from the given backend
 */
function AddMovieForm() : JSX.Element {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // we make a state here to keep track of the response
    // so when we get the response we can show it
    const [res, setRes] = useState({} as Response);

	// we need a state to store the loading state, which is an indicator
	// that the data is being fetched
    const [loading, setLoading] = useState(false);

    /**
     * handles the submit event of the form
     * 
     * @param event the submit event of the form
     * Promise since the function is async
     */
    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) : Promise<void> {
        // this prevents the default behavior of the form
        // which is to do the request and reload the page in the frontend
        event.preventDefault();

        // this is where we start loading since we are about to do the request
        setLoading(true);

        // we get the form data from the event
        const formData = new FormData(event.currentTarget);
        // we get the values from the form data
        // NOTE the return type of `getFormValues`
        const body : Movie = getFormValues(formData);

        try {
            const data = await addMovie(backend, body);
            // for now just set the id manually
            const normData = {
                id : data
            }
            // set the response to the ID given by the backend
            setRes(normData);
        } catch (error : any) {
            let errorMessage = `Error while fetching movies\n`;
            let resMessage = error.response['error-message'];
            if (resMessage) {
                errorMessage += error.response['error-message'];
            }
            alert(errorMessage);
            console.error(error);
        }
        setLoading(false);
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
            <h3>Add Movie</h3>
            <MovieForm onSubmit={handleSubmit} />

            {/* if loading is true, show "loading" */}
            {loading && <p>Loading...</p> }
            {
            // if the response has an id, show the id
            res.id &&
            // we use a fragment here because we need to return a single element
            // and we have two elements here
            // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
                <>
                    <h3>Movie created successfully </h3>
                    <p>Movie's ID : {res.id}</p>
                </>
            }
        </div>
    );
}

export {
    AddMovieForm
}