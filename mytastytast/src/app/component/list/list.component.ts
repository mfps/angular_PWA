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

  constructor(private data: DataService) { }

  loadData() {
    this.data.getList(list => this.list = list);
  }

  ngOnInit() {
    this.loadData();
  }

}
