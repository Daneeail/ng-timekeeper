import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {
  nameField = new FormControl('', [Validators.required]);
  nameOptions: string[] = ['Schedule 1', 'Schedule 2', 'Schedule 3'];
  filteredNameOptions: Observable<string[]>;
  description = '';
  notes = '';

  constructor(
    public dialogRef: MatDialogRef<ScheduleCardComponent>
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
    if (!this.nameField.invalid) {
      const newSchedule = new Schedule(this.nameField.value, this.description, this.notes);
      this.dialogRef.close(newSchedule);
    } else {
      this.nameField.markAsTouched();
    }
  }
}
