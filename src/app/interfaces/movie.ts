export interface Movie {
    title: string;
    releaseYear: number;
    imdb: string;
}

export interface SearchResults {
    Search: MovieResult[];
    Response: string;
}

export interface MovieResult {
    Title: string;
    Year: string;
    imdbID: string;
}
