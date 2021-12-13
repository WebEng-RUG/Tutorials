import { Actor } from "./actor";
import { Language } from "./language";
import { Review } from "./review";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: "Movies" })
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    rating?: string;

    @Column()
    year?: number;

    @Column("text")
    description?: string;

    @Column(() => Review, {
        prefix: "Review_"
    })
    review: Review;

    @ManyToMany(_ => Actor, a => a.movies, { eager: true })
    @JoinTable({
        name: "ActorMovie",
        joinColumn: {
            name: "MoviesId"
        },
        inverseJoinColumn: {
            name: "ActorsId"
        }
    })
    actors: Actor[];

    @ManyToMany(_ => Language, l => l.movies, { eager: true })
    @JoinTable({
        name: "LanguageMovie",
        joinColumn: {
            name: "MoviesId"
        },
        inverseJoinColumn: {
            name: "LanguagesId"
        }
    })
    languages: Language[];

    @Column({ name: "IMDbUrl" })
    imdb_url: string;
}