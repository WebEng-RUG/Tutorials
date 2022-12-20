import axios from "axios";
import { PaginationQuery, MovieSummary } from "../models";
import { Movie } from "../models";
import { constructUrl } from "../utils";


/**
 * The function that gets all the movies from the backend
 * 
 * @param backend the backend to send the request to
 * @param props the properties to send to the backend
 * @returns the data returned by the backend
 */
async function getMovies(backend : string, props : PaginationQuery) : Promise<MovieSummary[]> {
    backend += `/movies?`
    const url = constructUrl(backend, props);
    const res = await axios.get(url);
    const data = res.data;
    return data;
}

/**
 * This function gets all the movies from the backend
 * 
 * @param backend the backend to send the request to
 * @param props the properties to send to the backend
 * @returns the data returned by the backend
 */
async function getActorMovies(backend : string, id : string | undefined, props : PaginationQuery) : Promise<MovieSummary[]> {
    if (id === undefined) {
        return [];
    }
    backend += `/actors/${id}?`
    let url = constructUrl(backend, props);
    const res = await axios.get(url);
    const data = res.data;
    return data.movies;
}

/**
 * The function to get a single movie from the backend
 * 
 * @param backend the backend to send the request to
 * @param id the id of the movie to get
 * @returns the data returned by the backend
 */
async function getOneMovie(backend : string, id : string) : Promise<Movie> {
    const res = await axios.get(`${backend}/movies/${id}`);
    return res.data;
}


/**
 * Adds a movie to the backend 
 * 
 * @param backend the backend to send the request to
 * @param movie the movie to add
 * @returns the data returned by the backend
 */
async function addMovie(backend : string, movie : Movie) : Promise<number> {
    const res = await axios.post(`${backend}/movies`,  movie);
    const data : number = res.data;
    return data;
}

async function updateMovie(backend : string, id : string, movie : Movie) {
    const res = await axios.put(`${backend}/movies/${id}`, movie);
    return res.data;
}

/**
 * Deletes a movie from the backend
 * 
 * @param backend the backend to send the request to
 * @param id the id of the movie to delete
 * @returns the data returned by the backend
 */
async function deleteMovie(backend : string, id : string) {
    const res = await axios.delete(`${backend}/movies/${id}`);
    return res.data;
}

export {
    getMovies,
    deleteMovie,
    getActorMovies,
    addMovie,
    getOneMovie,
    updateMovie
}