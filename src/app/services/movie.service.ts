import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import { Movie, MovieResult, SearchResults } from '../interfaces/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private omdbBaseUrl = `https://www.omdbapi.com/`;
  private apiKey = '1b4d75d6';

  constructor(private http: HttpClient) { }

  private formatResults(moviesToFormat: MovieResult[]): Movie[]{
    const formattedMovies: Movie[] = [];
    moviesToFormat.forEach((movie) => {
      formattedMovies.push({
        title: movie.Title,
        releaseYear: parseInt(movie.Year),
        imdb: movie.imdbID
      });
    });

    return formattedMovies;
  }

  private handleError<T>(error: any, operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error ${error} in ${operation}`);

      return of(result as T);
    };
  }

  searchMovies(query: string): Observable<Movie[]> {
    const options = query ? {params: new HttpParams().set('apikey', this.apiKey).set('s', query)} :
                            {params: new HttpParams().set('apikey', this.apiKey)};

    return this.http.get<SearchResults>(this.omdbBaseUrl, options).pipe(
      map(result => {
        if (result.Response === 'False') {
          return [];
        }
        return this.formatResults(result.Search)}),
      catchError(error => this.handleError(error, 'searchMovies', []))
    )
  }

}
