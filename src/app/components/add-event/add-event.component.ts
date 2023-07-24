import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  addEventForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required]],
      place: ['', [Validators.required]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.addEventForm.valid) {
      let event = {
        "name": this.addEventForm.value.name,
        "date": this.addEventForm.value.date,
        "place": this.addEventForm.value.place,
        //"description": this.addEventForm.description,
      }
      console.log(this.addEventForm.value)
      this.eventService.addNewEvent(this.addEventForm.value).subscribe(value => {
        alert(`this event was created`)
      })
    } else {
      alert("Wrong date")
    }
  }
}
