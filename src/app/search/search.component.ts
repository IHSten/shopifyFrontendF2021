import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { MovieService } from '../services/movie.service';
import { Movie } from '../interfaces/movie'
import { NominationService } from '../services/nomination.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);
  nominees$: Observable<Movie[]> = of([]);
  canNominate: boolean = true;
  private queryTerms = new Subject<string>();

  constructor(private movieService: MovieService, private nominationService: NominationService) { }

  search(query: string): void {
    this.queryTerms.next(query);
  }

  ngOnInit(): void {
    this.movies$ = this.queryTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.movieService.searchMovies(query)),
    );
  }

}
