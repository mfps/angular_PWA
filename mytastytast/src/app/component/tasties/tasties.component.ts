import { TastingRating } from './../../logic/TastingRating';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tasties } from './../../logic/tasties';
import { GeolocationService } from './../../services/geolocation.service';

@Component({
  selector: 'app-tasties',
  templateUrl: './tasties.component.html',
  styleUrls: ['./tasties.component.css']
})
export class TastiesComponent implements OnInit {

  routingSubscription: any;
  tasty: Tasties;
  types: string[] = ['Döner', 'Pizza'];

  constructor(private route: ActivatedRoute, private geolocation: GeolocationService) { }

  getGeolocation() {
    this.geolocation.requestLocation(location => {
      if (location) {
        this.tasty.location.latitude = location.latitude;
        this.tasty.location.longitude = location.longitude;
      }
    });
  }

  tastingsRatingChecked(checked: boolean) {
    if (checked) {
      this.tasty.tastingRating = new TastingRating();
    } else {
      this.tasty.tastingRating = null;
    }
  }

  cancel() { }

  save() { }

  ngOnInit() {
    this.tasty = new Tasties();
    this.routingSubscription = this.route.params.subscribe(params => console.log(params.id));

    this.getGeolocation();
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }
}
