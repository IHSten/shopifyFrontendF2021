import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../interfaces/movie';
import { NominationService } from '../services/nomination.service';

@Component({
  selector: 'app-nominees',
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.css']
})
export class NomineesComponent implements OnInit {
  nominees: Movie[] = [];
  receiver: Subscription;

  constructor(private nominationService: NominationService) {
    this.receiver = this.nominationService.getNominees().subscribe(nominees => {
      this.nominees = nominees;
      if (this.nominees.length >= 5) {
        this.nominationService.setNominationFlag(false);
        this.nominationService.triggerBanner();
      }
      else {
        this.nominationService.setNominationFlag(true);
      }
    });
  }

  ngOnInit(): void {
    this.nominationService.triggerNominees();
  }

  onRemoveNomination(nominee: Movie): void {
    this.nominationService.delNominee(nominee);
  }

  onClearNominations(): void {
    this.nominationService.clearNominees();
  }
}
