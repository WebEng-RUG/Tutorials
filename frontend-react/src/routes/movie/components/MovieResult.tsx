import { Language, Languages, Movie, Review } from "../../../models";
import {ActorsToList} from "../../actors/components";

/**
 * The props object for the movie result component
 * the movie prop is optional because it might not be loaded yet or not found
 * 
 * formDisabled is a boolean that indicates whether the form is disabled
 * handleSubmit is the function that handles the submit event of the form
 * loading is a boolean that indicates whether the movie is loading
 */
interface MovieResProps {
    movie? : Movie,
    loading: boolean
}

/**
 * The movie result component
 * 
 * @param movie the movie received from the api
 * @param loading the loading prop (whether or not the movie is loading, being fetched)
 * @returns the movie result component
 */
function MovieResult ({movie, loading} : MovieResProps) {
    // JSX.Element[] since we are returning an array of JSX elements (the list of Languages)
    function fromLanguages(languages : Languages) : JSX.Element[] {
        return (
            languages.map((language : Language, index : number) => {
                return <li key={language + index}>{language}</li>
            })
        )
    }


    /**
     * Converts the review to a list of items
     * 
     * @returns a list of items that describe the review
     */
    function formToList(review : Review) : JSX.Element {
        return (
            <ul>
                <li>User : {review.user}</li>
                <li>User Count: {review.usercount || 0}</li>
                <li>Meta Score : {review.metascore || 0}</li>
            </ul>
        );
    }

    function fromMovie() : JSX.Element {
        if (!movie) {
            return <h1>No Movie Found</h1>;
        }
        
        return (
            <div>
                <h1>Title : {movie.title}</h1>
                <p>Description : {movie.description}</p>
                <p>Year : {movie.year}</p>
                <p>Rating : {movie.rating}</p>

                <p>Actors: </p>
                <ActorsToList actors={movie.actors}/>

                <p>IMDB link : <a href={movie.imdb_url}>{movie.imdb_url}</a></p>

                <p>Reviews: </p>
                {formToList(movie.review)}

                <p>Languages :</p>
                {fromLanguages(movie.languages)}
            </div>
        );
    }

    return (
        <div>
            {/* if loading, show loading else make the movie */}
            {loading ? <p>Loading...</p> : fromMovie()}
        </div>
    )
}


export {
    MovieResult
}
