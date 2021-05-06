import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../interfaces/movie';
import { NominationService } from '../services/nomination.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() movie?: Movie;
  canNominate = true;
  nomineeReceiver: Subscription;
  movieReceiver: Subscription;

  constructor(private nominationService: NominationService) {
    this.nomineeReceiver = this.nominationService.getNominationFlag().subscribe((nominationFlag) => {
      this.canNominate = nominationFlag;
    });

    this.movieReceiver = this.nominationService.getNominees().subscribe((nominees) => {
      if (nominees.some(el => el.imdb === this.movie?.imdb)) {
        this.canNominate = false;
      }
    });
   }

  ngOnInit(): void {
    // This causes each movie-details component to update their view after being constructed
    // This is a little heavy on the service calls, but NominationService doesn't make any network calls, so it should be fine
    this.nominationService.triggerNominationFlag();
    this.nominationService.triggerNominees();
  }

  ngOnDestroy(): void {
    this.nomineeReceiver.unsubscribe();
    this.movieReceiver.unsubscribe();
  }

  onNominate(nominee: Movie): void {
    this.nominationService.addNominee(nominee);
  }

}
