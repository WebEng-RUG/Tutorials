export interface FormActor {
  name: string;
}

export default interface FormMovie {
  title: string;
  description: string;
  year: number;
  rating: string;
  languages: string[];
  actors: FormActor[];
  imdb_url: string;
}
