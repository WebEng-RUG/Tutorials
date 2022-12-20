// this is the entry point of our actors folder / module
// from here we can export all the components we want to expose to the rest of the app
// this way we can import them from other components like this:
// import { ActorsHome } from 'routes/actors'; instead of specifying the exact path
export * from './ActorList';
export * from './Actor';
// we want to expose our ActorMovies component to the rest of the app
export * from './components/ActorMovies';