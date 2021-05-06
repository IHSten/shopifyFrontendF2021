import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class NominationService {
  private nominees: Movie[];
  // Probably isn't necessary since the nominateFlagObservable can just emit what is passed to setNominationFlag, but it's useful state information
  private canNominateFlag: boolean;
  private nomineesObservable: Subject<Movie[]>;
  private nominateFlagObservable: Subject<boolean>;
  private bannerFlagObservable: Subject<boolean>;

  constructor() {
    this.nominees = [];
    this.canNominateFlag = true;
    this.nomineesObservable = <Subject<Movie[]>>new Subject();
    this.nominateFlagObservable = <Subject<boolean>>new Subject();
    this.bannerFlagObservable = <Subject<boolean>>new Subject();
    this.setNominationFlag(this.canNominateFlag);
  }

  getNominees() {
    if(localStorage.getItem('nominees')) {
      this.nominees = JSON.parse(localStorage.getItem('nominees'));
    }
    return this.nomineesObservable.asObservable();
  }

  addNominee(nominee: Movie) {
    this.nominees.push(nominee);
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  delNominee(nominee: Movie) {
    const index = this.nominees.indexOf(nominee);
    if(index > -1) {
      this.nominees.splice(index, 1);
    }
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  clearNominees() {
    this.nominees = [];
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  triggerNominees() {
    this.nomineesObservable.next(this.nominees);
  }

  setNominationFlag(canNominate: boolean) {
    this.canNominateFlag = canNominate;
    this.nominateFlagObservable.next(this.canNominateFlag);
  }

  triggerNominationFlag() {
    this.nominateFlagObservable.next(this.canNominateFlag);
  }

  getNominationFlag() {
    return this.nominateFlagObservable.asObservable();
  }

  triggerBanner() {
    this.bannerFlagObservable.next(true);
  }

  displayBanner() {
    return this.bannerFlagObservable.asObservable();
  }


}
