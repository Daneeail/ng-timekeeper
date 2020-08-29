import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  currentTask: Task;
  form: FormGroup = new FormGroup({
    nameField: new FormControl('', [Validators.required]),
    startDtField: new FormControl('', [Validators.required]),
    endDtField: new FormControl('', [Validators.required]),
    descriptionField: new FormControl(''),
    notesField: new FormControl('')
  });
  nameOptions: string[] = ['Task 1', 'Task 2', 'Task 3'];
  filteredNameOptions: Observable<string[]>;
  scheduleId = '';
  minDate = moment().startOf('day');
  maxDate = moment().endOf('day');

  constructor(
    public dialogRef: MatDialogRef<TaskCardComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.scheduleId = data.scheduleId;
    this.currentTask = data.currentTask;
  }

  ngOnInit(): void {
    this.filterName();
    this.setScheduleForm();
  }

  setScheduleForm(): void {
    if (this.currentTask) {
      this.form.setValue({
        nameField: this.currentTask.name ?? '',
        startDtField: this.currentTask.startDt ?? '',
        endDtField: this.currentTask.endDt ?? '',
        descriptionField: this.currentTask.description ?? '',
        notesField: this.currentTask.notes ?? ''
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

  addTask(): void {
    if (!this.form.get('nameField').invalid && !this.form.get('startDtField').invalid && !this.form.get('endDtField').invalid) {
      const newTask: Task = this.createTaskObject(this.form.get('nameField').value, this.form.get('descriptionField').value,
        this.form.get('notesField').value, this.scheduleId, this.form.get('startDtField').value, this.form.get('endDtField').value);
      this.dialogRef.close(newTask);
    } else {
      this.markFieldsAsTouched();
    }
  }

  saveTask(): void {
    if (!this.form.get('nameField').invalid) {
      this.currentTask.name = this.form.get('nameField').value;
      this.currentTask.startDt = this.form.get('startDtField').value;
      this.currentTask.endDt = this.form.get('endDtField').value;
      this.currentTask.description = this.form.get('descriptionField')?.value;
      this.currentTask.notes = this.form.get('formField')?.value;
      this.dialogRef.close();
    } else {
      this.form.get('nameField').markAsTouched();
      this.form.get('startDtField').markAsTouched();
      this.form.get('endDtField').markAsTouched();
    }
  }

  markFieldsAsTouched(): void {
    this.form.get('nameField').markAsTouched();
    this.form.get('startDtField').markAsTouched();
    this.form.get('endDtField').markAsTouched();
  }

  createTaskObject(name: string, description: string, notes: string, scheduleId: string, startDt: Date, endDt: Date): Task {
    const task: Task = {
      id: uuidv4(),
      name,
      description,
      notes,
      scheduleId,
      startDt,
      endDt,
      state: 'closed',
      dayIndex: moment().dayOfYear()
    };

    return task;
  }
}
