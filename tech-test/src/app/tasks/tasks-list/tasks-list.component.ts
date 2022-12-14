import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasksTableDataSource$: Observable<MatTableDataSource<Task>>;

  displayedColumns: Array<keyof Task> = ['label', 'description', 'category', 'done'];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tasksTableDataSource$ = this.taskService.allTasks$.pipe(
      map(tasks => new MatTableDataSource(tasks))
    )
  }
}
