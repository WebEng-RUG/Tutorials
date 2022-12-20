import { useContext } from "react";
import { deleteMovie } from "../../../api";
import { BackendContext } from "../../BackendContext";

/**
 * This is the props interface for the DeleteMovie component
 * the id is optional since the path variable is optional
 */
interface DeleteMovieProps {
    id? : string
}

/**
 * The DeleteMovie component
 * 
 * @param id the id of the movie to delete
 * @returns the delete button which when clicked will delete the movie via an API call
 */
function DeleteMovie({id} : DeleteMovieProps) : JSX.Element {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    /** Promise since the function is async */
    async function handleDelete() : Promise<void> {
        if (!id) {
            alert("No movie id provided");
            return;
        } 

        try {
            const data = await deleteMovie(backend, id);
            alert("Movie deleted");
        } catch (error) {
            alert("Error when deleting the movie");
            console.error(error);
        }

    }

    return (
        <button onClick={handleDelete}>Delete Movie</button>
    )
}

export {
    DeleteMovie
}