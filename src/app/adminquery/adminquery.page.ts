import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminquery',
  templateUrl: './adminquery.page.html',
  styleUrls: ['./adminquery.page.scss'],
})
export class AdminqueryPage implements OnInit {
loading: boolean = false;
  constructor() { }

  model = {
    query:''
  }
  ngOnInit() {
  }

  queryUser(){
    console.log(this.model.query);
  }

}
