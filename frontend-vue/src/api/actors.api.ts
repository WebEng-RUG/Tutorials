import type ActorSummary from "@/models/actor-summary.model";
import type Actor from "@/models/actor.model";
import axios from "axios";

/**
 * Here I define all of the methods for interacting with the api for the actors.
 * This provides one source of true for interacting with the api from all components.
 */
export interface ActorFilterParams {
  limit: number;
  offset: number;
}

function getActorSearchParams(filterParams: ActorFilterParams) {
  let params = "?" + new URLSearchParams({ limit: filterParams.limit.toString(), offset: filterParams.offset.toString() }).toString();
  return params;
}

/**
 * Gets the list of actors based on the filter parameters.
 *
 * @param baseUrl The base url of the API to get the actor from.
 * @param params Parameters for defining the list that should be fetched from the api.
 * @returns ActorSummary[] List of actors gotten from the api.
 */
export async function getActors(baseUrl: string, params: ActorFilterParams): Promise<ActorSummary[]> {
  try {
    const { data, status } = await axios.get<ActorSummary[]>(baseUrl + "/actors" + getActorSearchParams(params));
    return data;
  } catch (error) {
    throw error;
  }
}
/**
 * Gets a single actor from the backend.
 *
 * @param baseUrl The base url of the API to get the actor from.
 * @param id ID of the actor to get.
 * @returns Actor
 */
export async function getActor(baseUrl: string, id: number): Promise<Actor> {
  try {
    const { data, status } = await axios.get<Actor>(baseUrl + `/actors/${id}/`);
    return data;
  } catch (error) {
    throw error;
  }
}
