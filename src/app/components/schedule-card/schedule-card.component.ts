import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {
  nameField = new FormControl();
  nameOptions: string[] = ['Schedule 1', 'Schedule 2', 'Schedule 3'];
  filteredNameOptions: Observable<string[]>;
  description = '';
  notes = '';

  constructor(
    public dialogRef: MatDialogRef<ScheduleCardComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { }

  ngOnInit(): void {
    this.filterName();
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterName(): void {
    this.filteredNameOptions = this.nameField.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  addSchedule(): void {
    const newSchedule = new Schedule();

    this.dialogRef.close(newSchedule);
    console.log(this.nameField.value, this.description, this.notes);
  }
}
