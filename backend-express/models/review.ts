import { Column } from "typeorm";

export class Review {
    @Column()
    userCount: number = 0;

    @Column("decimal")
    userScore?: number;

    @Column()
    metaScore?: number;
}