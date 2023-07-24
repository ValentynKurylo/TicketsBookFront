import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../models/event.model";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../services/event.service";
import {SectionModel} from "../../models/section.model";
import {RowModel} from "../../models/row.model";
import {SeatModel} from "../../models/seat.model";
import {TokenService} from "../../services/token.service";


@Component({
  selector: 'app-full-event',
  templateUrl: './full-event.component.html',
  styleUrls: ['./full-event.component.css']
})
export class FullEventComponent  implements OnInit{

  fullEvent: any;
  showFreeSeats = false;
  showRows = false;
  showSeat = false;
  booking = false;
  sections: SectionModel[] = [];
  rows: RowModel[] = [];
  seats: SeatModel[] = [];
  activeSection: any;
  activePrice: any;
  activeNameSection: any;
  activeRow: any;
  rowIndex: any;
  activeSeat: any;
  seatIndex: any;
  isAdmin = localStorage.getItem('user')

  constructor(private activateRoute: ActivatedRoute, private eventService: EventService) {
    this.activateRoute.params.subscribe(value => {
      this.eventService.getById(value['id']).subscribe(res => { res.time = this.convertDateTimeToComponents(res.date).time,
        res.date = this.convertDateTimeToComponents(res.date).date,
        this.fullEvent = res,
        console.log(this.fullEvent)
      })
    })
  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(value => {
      this.eventService.getSectionsByEventId(value['id']).subscribe(res =>{
        this.sections = res
      })
    })
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

  toggleFreeSeats() {
    this.showFreeSeats = !this.showFreeSeats;
    if(!this.showFreeSeats){
      this.showRows = false;
      this.showSeat = false;
      this.booking = false;
    }
  }

  toggleShowRows(){
    this.showRows = !this.showRows
  }

  handleSectionClick(id: number, price: number, name: string) {
    this.eventService.getRowsBySectionId(id).subscribe(value => {
      this.rows = value.sort((a, b) => (a.name - b.name))
    })
    this.activeSection = id;
    this.activePrice = price;
    this.activeNameSection = name;
    this.showRows = true
  }

  handleRowClick(id: number, i: number) {
    this.eventService.getSeatsByRowId(id).subscribe(value => {
      this.seats = value.sort((a, b) => (a.name - b.name))
    })
    this.rowIndex = i;
    this.activeRow = id;
    this.showSeat = true;
  }

  bookSeat(id: number, isActive: boolean, i: number) {
    if (localStorage.getItem('access') !== '1') {
      alert("You must login to book seat")
    }
    else if(!isActive){
      alert("This seat are booked")
    }
    else {
      this.seatIndex = i;
      this.activeSeat = id;
      this.booking = true;
    }
  }

  bookSeatDB() {
   let b =  confirm('Are you sure')
    if(b){
      this.eventService.bookSeat(this.activeSeat, b).subscribe(value => {
        console.log(value)
      })
      alert("Your seat was booked")
    }
  }

  deleteEvent(id: number) {
    let del = confirm('Are you sure')
    if(del){
      this.eventService.deleteEvent(id).subscribe(value => {
        alert('This event was deleted')
      })
    }
  }
}
