import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class NominationService {
  private nominees: Movie[];
  // Probably isn't necessary since the nominateFlagObservable can just emit what
  // is passed to setNominationFlag, but it's useful state information
  private canNominateFlag: boolean;
  private nomineesObservable: Subject<Movie[]>;
  private nominateFlagObservable: Subject<boolean>;
  private bannerFlagObservable: Subject<boolean>;

  constructor() {
    this.nominees = [];
    this.canNominateFlag = true;
    this.nomineesObservable = new Subject() as Subject<Movie[]>;
    this.nominateFlagObservable = new Subject() as Subject<boolean>;
    this.bannerFlagObservable = new Subject() as Subject<boolean>;
    this.setNominationFlag(this.canNominateFlag);
  }

  getNominees(): Observable<Movie[]> {
    if (localStorage.getItem('nominees')) {
      this.nominees = JSON.parse(localStorage.getItem('nominees') || '{}');
    }
    return this.nomineesObservable.asObservable();
  }

  addNominee(nominee: Movie): void {
    this.nominees.push(nominee);
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  delNominee(nominee: Movie): void {
    const index = this.nominees.indexOf(nominee);
    if (index > -1) {
      this.nominees.splice(index, 1);
    }
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  clearNominees(): void {
    this.nominees = [];
    localStorage.removeItem('nominees');
    localStorage.setItem('nominees', JSON.stringify(this.nominees));
    this.nomineesObservable.next(this.nominees);
  }

  triggerNominees(): void {
    this.nomineesObservable.next(this.nominees);
  }

  setNominationFlag(canNominate: boolean): void {
    this.canNominateFlag = canNominate;
    this.nominateFlagObservable.next(this.canNominateFlag);
  }

  triggerNominationFlag(): void {
    this.nominateFlagObservable.next(this.canNominateFlag);
  }

  getNominationFlag(): Observable<boolean> {
    return this.nominateFlagObservable.asObservable();
  }

  triggerBanner(): void {
    this.bannerFlagObservable.next(true);
  }

  displayBanner(): Observable<boolean> {
    return this.bannerFlagObservable.asObservable();
  }


}
