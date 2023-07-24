import {Component, OnInit} from '@angular/core';
import {EventModel} from "../../models/event.model";
import {EventService} from "../../services/event.service";
import {EventWithDateModel} from "../../models/eventWithDate";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: EventWithDateModel[] = [];

  constructor(private eventService: EventService) {
  }
  ngOnInit(): void {
    this.eventService.getAll().subscribe(value => {value.map(v => {v.time = this.convertDateTimeToComponents(v.date).time,
      v.date = this.convertDateTimeToComponents(v.date).date
    }), this.events = value})
  }

  convertDateTimeToComponents(input: string) {
    const dateTime = new Date(input);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;

    return { date, time };
  }

}
