import axios from "axios";
import type Movie from "@/models/movie.model";
import type { AxiosResponse } from "axios";
import type { MovieSummary } from "@/models/movie-summary.model";
import type FormMovie from "@/models/movie-from.models";

/**
 * Here I define all of the methods for interacting with the api for the movies.
 * This provides one source of true for interacting with the api from all components.
 */
export interface MovieFilterParams {
  title: string;
  year: number | null;
  limit: number;
  offset: number;
  order_by: "title" | "year" | "rating" | "";
  order_dir: "asc" | "desc";
}

/**
 * Converts the filter params object into a query string for a url.
 *
 * @param fp The filter params which should be put into the url.
 * @returns The query string to be appended to the url of the getMovies request url.
 */
function getMovieSearchParams(fp: MovieFilterParams) {
  let params = "?" + new URLSearchParams({ "order-by": fp.order_by, title: fp.title, year: fp.year ? fp.year.toString() : "", limit: fp.limit.toString(), offset: fp.offset.toString(), "order-dir": "asc" }).toString();
  return params;
}

/**
 * Gets the list of movies from the API.
 *
 * @param baseUrl The url for the api to be used.
 * @param params The url query parameters.
 * @returns List of MovieSummary[]
 */
export async function getMovies(baseUrl: string, params: MovieFilterParams): Promise<MovieSummary[]> {
  try {
    const { data, status } = await axios.get<MovieSummary[]>(baseUrl + "/movies" + getMovieSearchParams(params));
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param baseUrl The url for the api to be used.
 * @param id The id for the movie to be gotten.
 * @returns The movie that was requested.
 */
export async function getMovie(baseUrl: string, id: number): Promise<Movie> {
  try {
    const { data, status } = await axios.get<Movie>(baseUrl + `/movies/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createMovie(baseUrl: string, formData: FormMovie): Promise<Movie> {
  try {
    const { data, status } = await axios.post<Movie>(baseUrl + `/movies/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes a movie based on the specified id.
 *
 * @param baseUrl The url for the api to be used.
 * @param id The id for the movie to be deleted.
 * @returns THe axios response.
 */
export async function deleteMovie(baseUrl: string, id: number): Promise<boolean> {
  try {
    const { data, status } = await axios.delete(baseUrl + `/movies/${id}`);
    // If status code 204 (No content) is returned, then the movie was deleted successfully.
    return status === 204;
  } catch (error) {
    throw error;
  }
}
