import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Movie } from "./movie";

@Entity({ name: "Languages" })
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(_ => Movie, m => m.languages)
    movies: Movie[];
}