/**
 * The entry point of our movies folder / module
 * from here we can export all the components we want to expose to the rest of the app
 * this way we can import them from other components like this:
 * import { FormSelection } from 'movies/components'; instead of specifying the exact path
 */
export * from './FormSelection';
export * from './MovieSummary';
export * from '../../actors/components/ActorMovies'