import { Link } from "react-router-dom"
import { Actors } from "../../../models"

interface ActorsResultProps {
    actors : Actors
}

/**
 * Actors result component
 * 
 * @param actors the actors prop which is passed down from the parent to build the list
 * @returns the list of actors
 */
function ActorsToList({actors}: ActorsResultProps) {
    function formActors() {
        return actors.map((actor) => {
            return (
                <li key={actor.id}>
                    <p>Name {actor.name}</p>
                    <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                </li>
            )
        })
    }

    return (
        <div>
            {/* if the length is 0 then add paragraph with some text */}
            {actors.length === 0 ? <p>No actors found</p> : <ul>{formActors()}</ul> }
        </div>
    )
}

export {
    ActorsToList
}