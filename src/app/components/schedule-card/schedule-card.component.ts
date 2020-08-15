import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {
  currentSchedule: Schedule;
  form: FormGroup = new FormGroup({
    nameField: new FormControl('', [Validators.required]),
    descriptionField: new FormControl(''),
    notesField: new FormControl('')
  });
  nameOptions: string[] = ['Schedule 1', 'Schedule 2', 'Schedule 3'];
  filteredNameOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<ScheduleCardComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.currentSchedule = data?.currentSchedule;
  }

  ngOnInit(): void {
    this.filterName();
    this.setScheduleForm();
  }

  setScheduleForm(): void {
    if (this.currentSchedule) {
      this.form.setValue({
        nameField: this.currentSchedule.name ?? '',
        descriptionField: this.currentSchedule.description ?? '',
        notesField: this.currentSchedule.notes ?? ''
      });
    }
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterName(): void {
    this.filteredNameOptions = this.form.get('nameField').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  addSchedule(): void {
    if (!this.form.get('nameField').invalid) {
      const newSchedule = new Schedule(this.form.get('nameField').value,
        this.form.get('descriptionField').value, this.form.get('notesField').value);
      this.dialogRef.close(newSchedule);
    } else {
      this.form.get('nameField').markAsTouched();
    }
  }

  saveSchedule(): void {
    if (!this.form.get('nameField').invalid) {
      this.currentSchedule.name = this.form.get('nameField').value;
      this.currentSchedule.description = this.form.get('descriptionField')?.value;
      this.currentSchedule.notes = this.form.get('formField')?.value;
      this.dialogRef.close();
    } else {
      this.form.get('nameField').markAsTouched();
    }
  }
}
