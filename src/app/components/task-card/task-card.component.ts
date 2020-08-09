import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @ViewChild('startPicker') startPicker: any;
  @ViewChild('endPicker') endPicker: any;

  nameField = new FormControl('', [Validators.required]);
  startDtField = new FormControl('', [Validators.required]);
  endDtField = new FormControl('', [Validators.required]);
  nameOptions: string[] = ['Task 1', 'Task 2', 'Task 3'];
  filteredNameOptions: Observable<string[]>;
  description = '';
  notes = '';
  minDate = moment().startOf('day');
  maxDate = moment().endOf('day');

  constructor(
    public dialogRef: MatDialogRef<TaskCardComponent>
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

  addTask(): void {
    if (!this.nameField.invalid && !this.startDtField.invalid && !this.endDtField.invalid) {
      let newTask: Task;
      this.dialogRef.close(newTask);
    } else {
      this.nameField.markAsTouched();
    }
  }

  createTaskObject(name: string, description: string, notes: string, scheduleId: string, startDt: Date, endDt: Date): Task {
    const task: Task = {
      id: uuidv4(),
      name,
      description,
      notes,
      scheduleId,
      startDt,
      endDt
    };

    return task;
  }

}
