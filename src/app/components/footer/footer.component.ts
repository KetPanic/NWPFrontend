import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  time = new Date();
  rxTime = new Date();
  intervalId;
  subscription: Subscription | undefined;
  today: number = Date.now();

  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.today = Date.now();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
