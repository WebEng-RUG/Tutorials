import { useContext, useState } from "react";
import { Movie } from "../../../models";
import { MovieResult } from "./MovieResult";
import { getFormValues } from "../../../utils";
import { BackendContext } from "../../BackendContext";
import { MovieForm } from "../../components/MovieForm";
import { updateMovie } from "../../../api";
/**
 * The props for the UpdateMovie component
 * the movie is optional because we might not have it yet (still being fetched) or just not found
 * the id is optional since the path variable is optional
 */
interface UpdateMovieProps {
    movie? : Movie,
    id? : string,
    loading: boolean,
}

function UpdateMovie({movie, id, loading} : UpdateMovieProps) {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // we want to disable the form by default (just show the movie result)
    // but when the user clicks the edit button we want to enable the form
    // so we use a state to keep track of this
    const [formDisabled, setFormDisabled] = useState(true);
    
    /** Promise since the function is async */
    async function handleSubmit (event : React.FormEvent<HTMLFormElement>) : Promise<void>{
        event.preventDefault();
        if (!id || !movie) {
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
        const body : Movie = getFormValues(formData);


        try {
            const res = await updateMovie(backend, id, body);
        } catch (error) {
            alert('Error while updating');
            console.error(error);
        }
    }

    return (
      <div>
        {/* by default do the get request -> show the result */}
        {formDisabled ? 
        // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
            <>
            <MovieResult movie={movie} loading={loading} />
            <button onClick={() => setFormDisabled(false)}>Edit Movie</button>
            </>
        :
            <>
            <MovieForm movie={movie} onSubmit={handleSubmit} />
            <button onClick={() => setFormDisabled(true)}>Cancel</button>
            </>
        }
      </div>
    );
}

export {
    UpdateMovie
}