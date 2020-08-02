import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  nameField = new FormControl();
  nameOptions: string[] = ['Schedule 1', 'Schedule 2', 'Schedule 3'];
  filteredNameOptions: Observable<string[]>;
  description = '';
  notes = '';

  constructor() { }

  ngOnInit(): void {
    this.filteredNameOptions = this.nameField.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  addSchedule(): void {
    console.log(this.nameField.value, this.description, this.notes);
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

}
