import { Actor } from './actor.model';
/**
 * Interfaces of the movies model in the backend.
 * 
 * - Why use interfaces ? 
 * - Interfaces are basically a way to describe data shapes, for example, an object.
 * 
 * This way our models are unified between the backend and the frontend
 * and we know exactly what to expect when communicating with the backend
 * 
 */

/**
 * Here we use a type to describe our `Language` type, which is just an
 * alias of a string. Since our Language is not an object and does not 
 * have fields but is just a string.
 * 
 * So types are used to define a type of data, for example, a union,
 * primitive, intersection, tuple, or any other type.
 */

type Language = string;

/**
 * Same thing applies when describing what `Languages` are
 * that is just an alias of an array of languages
 */
type Languages = Language[];


type Review = {
    user: number,
    usercount: number,
    metascore: number
}

/**
 * Here we describe our `Movie` object / type.
 */
interface Movie {
    id? : number,
    title: string,
    description: string,
    year: number,
    rating: string,
    review: Review,
    languages: Languages,
    actors: Actor[]
    imdb_url: string
}



/**
 * Now we export the interfaces / types needed by other parts of the code
 */
export type {
    Movie,
    Languages,
    Language,
    Review
}