import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {SectionModel} from "../models/section.model";
import {RowModel} from "../models/row.model";
import {SeatModel} from "../models/seat.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = "http://localhost:3000"

  constructor(private httpClint: HttpClient) { }

  getAll(): Observable<EventModel[]>{
    return this.httpClint.get<EventModel[]>(this.url + '/events')
  }

  getById(id: number): Observable<EventModel>{
    return this.httpClint.get<EventModel>(this.url + '/events/' + id)
  }

  getSectionsByEventId(id: number): Observable<SectionModel[]>{
    return this.httpClint.get<SectionModel[]>(this.url + '/sections/byEventId/' + id)
  }

  getRowsBySectionId(id: number): Observable<RowModel[]>{
    return this.httpClint.get<RowModel[]>(this.url + '/rows/bySectionId/' + id)
  }

  getSeatsByRowId(id: number): Observable<SeatModel[]>{
    return this.httpClint.get<SeatModel[]>(this.url + '/seats/byRowId/' + id)
  }

  bookSeat(id: number, body: any){
    console.log(id)
    console.log(localStorage.getItem('token'))
    return this.httpClint.patch(this.url + '/seats/' + id, {}, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addNewEvent(body: any){
    return this.httpClint.post(this.url + '/events', body, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addSection(body: any){
    return this.httpClint.post(this.url + '/sections', body, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addRow(body: any){
    return this.httpClint.post(this.url + '/rows', body, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addSeat(body: any){
    return this.httpClint.post(this.url + '/seats', body, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  deleteEvent(id: number){
    return this.httpClint.delete(this.url + '/events/' + id,{
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
}
