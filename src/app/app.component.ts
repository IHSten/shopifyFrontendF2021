import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NominationService } from './services/nomination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ian Steneker\'s Shopify Frontend Challenge Fall 2021';
  receiver: Subscription;
  displayBanner = false;

  constructor(private nominationervice: NominationService) {
    this.receiver = this.nominationervice.displayBanner().subscribe(() => {
      this.displayBanner = true;
    });
  }

  onCloseBanner(): void {
    this.displayBanner = false;
  }
}
