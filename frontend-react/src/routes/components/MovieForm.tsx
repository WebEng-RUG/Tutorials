import { FormEventHandler } from "react";
import { Movie } from "../../models"
import { objectToList } from "../../utils";

// the props object / interface for the update movie form
// we put this on top of the component so that we can use it in the component
// and export it if necessary
interface UpdateMovieFormProps {
    movie ? : Movie,
    onSubmit: FormEventHandler<HTMLFormElement>
}

/**
 * The update movie form component, if no movie is given it will return an empty fragment
 * 
 * @param movie the movie to update
 * @param handleSubmit the submit handler for the form
 * @returns 
 */
function MovieForm({movie, onSubmit} : UpdateMovieFormProps){
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input defaultValue={movie && movie.title} type="text" name="title" id="title"  />
            
            <label htmlFor="description">Description</label>
            <input defaultValue={movie && movie.description} type="text" name="description" id="description"  />
            
            <label htmlFor="year">Year</label>
            <input defaultValue={movie && movie.year} type="number" name="year" id="year"  />
            
            <label htmlFor="rating">Rating</label>
            <input defaultValue={movie && movie.rating} type="text" name="rating" id="rating"  />
            
            <label htmlFor="review">Review</label>
            
            <label htmlFor="review_user">User</label>
            <input defaultValue={movie && movie.review.user || 0} type="number" name="review_user" id="review_user"  />

            <label htmlFor="review_usercount">User Count</label>
            <input defaultValue={movie && movie.review.usercount || 0} type="number" name="review_usercount" id="review_usercount"  />

            <label htmlFor="review_metascore">Metascore</label>
            <input defaultValue={movie && movie.review.metascore || 1} type="number" name="review_metascore" id="review_metascore"  />

            <br/>

            <label htmlFor="actors">Actors</label>
            <input defaultValue={movie && objectToList(movie.actors, 'name')} type="text" name="actors" id="actors"  />
            {
                movie &&
                // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
                <>
                    <label htmlFor="actors-ids"></label>
                    <input hidden defaultValue={movie && objectToList(movie.actors, 'id')} type="text" name="actors-ids" id="actors-ids"  />
                </>
            }

            <br/>

            <label htmlFor="languages">Languages</label>
            <input defaultValue={movie && movie.languages.join(', ')} type="text" name="languages" id="languages"  />


            <label htmlFor="imdb_url">IMDB URL</label>
            <input defaultValue={movie && movie.imdb_url} type="text" name="imdb_url" id="imdb_url"  />
            <button type="submit">Update Movie</button>
        </form>
    );
}

export {
    MovieForm
}