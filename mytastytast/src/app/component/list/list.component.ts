import { GeolocationService } from './../../services/geolocation.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tasties } from './../../logic/tasties';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: [Tasties];

  constructor(private data: DataService, private geolocation: GeolocationService, private router: Router) { }

  loadData() {
    this.data.getList(list => this.list = list);
  }

  gotoMap(tasty) {
    const mapURL = this.geolocation.getMapLink(tasty.location);
    location.href = mapURL;
  }

  share(tasty) {
    const shareText = `I had this coffee at ${tasty.place} and for me it's a ${tasty.rating} star coffee`;

    if ('share' in navigator) {
      (navigator as any).share({
        title: tasty.name,
        text: shareText,
        url: window.location.href
      }).then(() => console.log('shared')).catch((error) => console.log('SHARE: ', error))
    } else {
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }

  showDetails(tasty) {
    this.router.navigate(['/tasty', tasty._id])
  }

  ngOnInit() {
    this.loadData();
  }

}
