import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasties } from './../../logic/tasties';
import { TastingRating } from './../../logic/TastingRating';
import { GeolocationService } from './../../services/geolocation.service';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-tasties',
  templateUrl: './tasties.component.html',
  styleUrls: ['./tasties.component.css']
})
export class TastiesComponent implements OnInit {

  routingSubscription: any;
  tasty: Tasties;
  tastingEnabled: boolean = false;
  types: string[] = ['Döner', 'Pizza'];

  constructor(private route: ActivatedRoute, private router: Router, private geolocation: GeolocationService, private data: DataService) { }

  getGeolocation() {
    this.geolocation.requestLocation(location => {
      console.log(location);
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

  cancel() {
    this.router.navigate(['/']);
  }

  save() {
    this.data.save(this.tasty, result => {
      if (result) {
        this.router.navigate([`/tasty/${result._id}`])
      }
    })
  }

  ngOnInit() {
    this.tasty = new Tasties();
    this.routingSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.data.get(params.id, response => {
          this.tasty = response;
          if (this.tasty.tastingRating) {
            this.tastingEnabled = true;
          }
        });
      }
    });

    this.getGeolocation();
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }
}
