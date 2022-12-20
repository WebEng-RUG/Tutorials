/**
 * Represents one single actor
 * @key id? - the id of the actor (optional, for outgoing requests) 
 * @key name - the name of the actor
 */
interface Actor {
    id? : number,
    name: string;
}

/**
 * The type Actors which represents a list of actor
 */
type Actors =  Actor[]

/**
 * Represents a function that sets the actors
 * 
 * @key setActors - the function that sets the actors
 */
interface SetActors {
    setActors: (actors: Actors) => void;
}

export type {
    Actor,
    Actors,
    SetActors
}