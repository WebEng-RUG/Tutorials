import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorById } from "../../api";
import { ActorSummary } from "../../models";
import { BackendContext } from "../BackendContext";
import { ActorMovies } from "./components/ActorMovies";

type ActorId = string;

interface ActorProps {
    actor? : ActorSummary, // optional since it can be undefined
}

/**
 * Actors result component
 * 
 * @param actor the actors prop which is passed down from the parent to build the list
 * @returns the list of actors
 */
function Actor() {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // get the id from the url aka the path variable
    // the field id is the name of the path variable, so it has to be the same
    // as the name of the path variable in the router
    // See App.tsx `<Route path="/actors/:id/movies" element={<ActorMovies />} />`
    const { id } = useParams<ActorId>();

    // state to store the actor we are looking for
    const [actor, setActor] = useState<ActorSummary>();


    /** Promise since the function is async */
    async function retrieveActor() : Promise<void> {
        if (!id) {
            alert('No id was provided')
            return;
        }

        try {
            const data : ActorSummary = await getActorById(backend, id);
            setActor(data);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * This hook ensures that the actor is retrieved when the backend changes
     *  - we need to add the backend to the dependency array so that the hook
     *   is called when the backend changes, in this case we only want to call
     *   the `retrieveActor` function when the backend changes
     */
    useEffect(() => {
        retrieveActor();
    }, [backend])
        
    return (
        <div>
            {!actor ? <p>No actor found</p> : (
                // the <> </> is a fragment, it is used to wrap multiple elements without adding a div to the DOM
                <>
                <h3>{actor.name}</h3>
                <ActorMovies />
                </>
            )}
        </div>
    );
}

export {
    Actor
}

export type {
    ActorId,
    ActorProps
}