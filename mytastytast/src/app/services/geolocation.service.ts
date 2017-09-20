import { Injectable } from '@angular/core';
import { PlaceLocation } from './../logic/PlaceLocation';

@Injectable()
export class GeolocationService {

  constructor() { }

  requestLocation(cb) {
    navigator.geolocation.getCurrentPosition(
      position => cb(position.coords),
      error => cb(error)
    );
  }

  getMapLink(location: PlaceLocation) {
    let query = '';
    if (location.latitude) {
      query = `${location.latitude},${location.longitude}`;
    } else {
      query = `${location.address},${location.city}`;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `maps.apple.com/?q=${query}`;
    } else {
      return `maps.google.com/?q=${query}`;
    }
  }

}
