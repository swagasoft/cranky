import { EventService } from './../shared/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imo-event',
  templateUrl: './imo-event.page.html',
  styleUrls: ['./imo-event.page.scss'],
})
export class ImoEventPage implements OnInit {
pagents: any;
  constructor(private EventService: EventService) { 
    this.getAll();
  }

  ngOnInit() {
  }

  getAll(){
    this.EventService.getAllpagent().subscribe(
      res => {
        console.log(res);
        this.pagents = res['pagents'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
