import { ITimeUnit } from './time-unit';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';

export class Schedule implements ITimeUnit{
  id: string;
  name: string;
  description: string;
  notes: string;
  userId: string;
  tasks: Task[];

  constructor(name: string, description: string, notes: string) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.notes = notes;
    this.userId = 'TODO';
    this.tasks = [];
  }
}
