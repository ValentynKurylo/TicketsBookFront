import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent {
  addForm: FormGroup = new FormGroup({});
  id: any;
  new_section: any;
  new_row: any
  constructor(private fb: FormBuilder, private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.createRegistrationForm();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  createRegistrationForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      rows: ['', [Validators.required]],
      seats: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.addForm.valid) {

      let section1 = {
        "name": this.addForm.value.name,
        "price": this.addForm.value.price,
        "eventId": this.id,
      }
      //console.log(section1)
      const section = await this.eventService.addSection(section1).toPromise();
      //console.log(section);
      this.new_section = section;
      alert(`This section was created`);


      for (let i = 1; i <= Number(this.addForm.value.rows); i++) {
        const row = await this.eventService.addRow({ 'name': i, 'sectionId': this.new_section?.id }).toPromise();
        //console.log(row);
        this.new_row = row;

        for (let j = 1; j <= Number(this.addForm.value.seats); j++) {
          const seat = await this.eventService.addSeat({ 'name': j, 'rowId': this.new_row?.id }).toPromise();
          console.log(seat);
        }
      }
    } else {
      alert("Wrong date")
    }
  }
}
