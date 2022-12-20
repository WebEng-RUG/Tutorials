import { Link } from 'react-router-dom';
import { MovieSummary as MovieSummaryType} from '../../../models';

interface Loading {
    loading : boolean
}

interface MoviesResults {
    movies : MovieSummaryType[]
}

// type for the props of the movie results component
//  * this is a combination of the movies and loading props
type MovieResultsProps = MoviesResults  & Loading;

/**
 * The movie results component
 * 
 * @param results the results and loading props
 * @param loading the loading prop (whether or not the results are loading)
 * @returns the movie results component
 */
function MovieSummary({movies, loading}: MovieResultsProps) : JSX.Element {
    return (
        <div>
            {/* if loading show "loading" */}
            {loading ? <p>Loading...</p> : (
            // not loading and no results show "no results"
            movies.length === 0 ? <p>No results</p> :
            // not loading and results show the results
            <ul>
                {movies.map((movie : MovieSummaryType) => (
                    <li key={movie.id}>
                        <p>{movie.title} ({movie.year})</p>
                        <p>Rating: {movie.rating}</p>
                        <Link to={`/movies/${movie.id}`}>More Details</Link>
                        <hr />
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}

export {
    MovieSummary
};
