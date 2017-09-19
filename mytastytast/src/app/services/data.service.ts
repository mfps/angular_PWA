import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  getList(cb) {
    //TODO: Change it with a real Web Service 
    const list = [
      new Tastes('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
      new Tastes('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid')),
      new Tastes('Americano', 'Kaffee Stube', new PlaceLocation('Turmstraße 10', 'Berlin'))
    ];
    cb(list);
  }

  save(data, cb) {
    //TODO: Change it with a real Web Service 
    cb(true);
  }
}
