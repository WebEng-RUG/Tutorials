import axios from "axios";
import { Actor, ActorSummary, PaginationQuery } from "../models";
import { constructUrl } from "../utils";

/**
 * Gets an actor by id from the backend
 * 
 * @param backend the backend to request from
 * @param id the id of the actor to get
 * @returns the actor with the given id
 */
async function getActorById(backend : string, id : string) : Promise<ActorSummary>  {
    const response = await axios.get(`${backend}/actors/${id}`);
    return response.data;
}

/**
 * Gets all the actors from the backend
 * 
 * @param url the backend to request from
 * @returns the actors returned from the request
 */
async function getActors(backend : string, props : PaginationQuery) : Promise<Actor[]> {
    backend += `/actors?`;
    const newUrl = constructUrl(backend, props);
    const response = await axios.get(newUrl);
    return response.data;
}

export {
    getActorById,
    getActors
}