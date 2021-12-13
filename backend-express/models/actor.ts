import { Movie } from "./movie";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity({ name: "Actors" })
export class Actor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(_ => Movie, m => m.actors)
    movies: Movie[];
}