import { useState } from "react";
import { Actor } from "../../models";
import { ActorsForm, ActorsToList } from "./components";


/**
 * Actors home component
 * 
 * @returns the actors home component
 */
function ActorList() {
    // we need a state to store the actors
    // - this is used to pass down to the ActorsResult component
    // - this is also used to pass down to the ActorsForm component
    const [actors, setActors] = useState<Actor[]>([]);

    return(
        <div>
            <ActorsForm setActors={setActors} />
            <ActorsToList actors={actors} />
        </div>
    )

}


export {
    ActorList
}