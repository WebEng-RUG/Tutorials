// this is the entry point of our components folder / module
// from here we can export all the components / types we want to expose to the rest of the app
// this way we can import them like this:
// import { ActorResult, MovieResult } from 'components'; instead of specifying the exact path to every file
export * from './ActorsToList';
export * from './ActorsForm';
export * from './ActorMovies';