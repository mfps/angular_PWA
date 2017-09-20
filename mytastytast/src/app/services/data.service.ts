import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Tasties } from '../logic/tasties';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class DataService {

  endpoint: string = 'http://localhost:3000';
  constructor(private http: Http) { }

  getList(cb) {
    this.http
      .get(`${this.endpoint}/tasties`)
      .subscribe(response => cb(response.json()));
  }

  get(tastyId: string, cb) {
    this.http
      .get(`${this.endpoint}/tasties/${tastyId}`)
      .subscribe(response => cb(response.json()))
  }

  save(data, cb) {
    if (data._id) {
      this.http
        .put(`${this.endpoint}/tasties/${data._id}`, data)
        .subscribe(response => cb(response.json()));
    } else {
      this.http
        .post(`${this.endpoint}/tasties`, data)
        .subscribe(response => cb(response.json()));
    }
  }
}
