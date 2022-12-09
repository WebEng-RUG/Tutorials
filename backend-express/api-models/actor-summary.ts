import { Actor as DbActor } from "models/actor";

export class ActorSummary {
    id: number;
    name: string;

    public static fromDatabase(actor : DbActor): ActorSummary {
        return {
            id: actor.id,
            name: actor.name
        };
    }
}