// this is the entry point of our models folder / module
// from here we can export all the interfaces / types we want to expose to the rest of the app
// this way we can import them like this:
// import { Actor, Movie } from 'models'; instead of specifying the exact path to every file

export * from './movie.model';
export * from './backend.model';
export * from './actor.model';


export * from './movie-query.model';
export * from './actor-summary.model';
export * from './movie-summary.model';