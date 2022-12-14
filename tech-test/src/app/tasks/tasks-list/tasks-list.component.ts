import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { isArray as _isArray, isNumber as _isNumber } from 'lodash';
import { BehaviorSubject, combineLatest, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, scan, switchMap } from 'rxjs/operators';

import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

interface TableRow extends Task {
  isEditing?: boolean;
}

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  tasksTableDataSource$: Observable<MatTableDataSource<TableRow>>;

  setTaskEditMode$: BehaviorSubject<TableRow> = new BehaviorSubject(null);
  addTask$: Subject<TableRow> = new Subject();
  saveTask$: Subject<void> = new Subject();
  deleteTask$: Subject<number> = new Subject();

  setFormValueSubscription: Subscription;
  resetFormValueSubscription: Subscription;
  saveTaskSubscription: Subscription;
  deleteTaskSubscription: Subscription;

  taskColumns: Array<keyof Task> = ['label', 'description', 'category', 'done'];
  actionColumns: string[] = ['actions'];
  displayedColumns = [...this.taskColumns, ...this.actionColumns];

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    done: new FormControl(null),
  });

  get labelControl(): FormControl {
    return this.taskForm.get('label') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.taskForm.get('category') as FormControl;
  }

  get doneControl(): FormControl {
    return this.taskForm.get('done') as FormControl;
  }

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    const tasksSource$: Observable<TableRow[]> = merge(
      this.taskService.allTasks$,
      this.addTask$,
    ).pipe(
      scan((acc: Task[], input: Task[] | TableRow) => {
        if (_isArray(input)) {
          return input as Task[];
        } else {
          return [
            ...acc,
            input,
          ] as Task[]
        }
      }, []),
    );

    this.tasksTableDataSource$ = combineLatest(
      tasksSource$,
      this.setTaskEditMode$,
    ).pipe(
      map(([tasks, editingTask]: [TableRow[], Task]) => {
        let modifiedRows: TableRow[] = tasks;
        if (editingTask) {
          modifiedRows = modifiedRows.map(task => ({ ...task, isEditing: task.id === editingTask.id }));
        }

        return new MatTableDataSource(modifiedRows);
      })
    );

    this.setFormValueSubscription = this.setTaskEditMode$.pipe(
      filter(task => !!task)
    ).subscribe(({ isEditing, ...task }) => {
      this.taskForm.setValue(task);
    });

    this.resetFormValueSubscription = this.setTaskEditMode$.pipe(
      filter(task => !task)
    ).subscribe(() => {
      this.taskForm.reset();
    });

    this.saveTaskSubscription = this.saveTask$.pipe(
      switchMap(() => {
        const task = this.taskForm.value;
        if (_isNumber(task.id)) {
          return this.taskService.updateTask(task);
        } else {
          return this.taskService.createTask(task);
        }
      })
    ).subscribe(() => {
      // disable editing mode
      this.setTaskEditMode$.next(null);
    });

    this.deleteTaskSubscription = this.deleteTask$.pipe(
      filter(taskId => _isNumber(taskId))
    ).subscribe(taskId => {
      this.taskService.deleteTask(taskId);
    });
  }

  ngOnDestroy(): void {
    this.setFormValueSubscription.unsubscribe();
    this.resetFormValueSubscription.unsubscribe();
    this.saveTaskSubscription.unsubscribe();
    this.deleteTaskSubscription.unsubscribe();
  }

  addTask() {
    this.addTask$.next({ isEditing: true } as TableRow)
  }

  editTask(task: TableRow) {
    this.setTaskEditMode$.next(task);
  }

  saveTask() {
    this.saveTask$.next();
  }

  deleteTask(task: TableRow) {
    this.deleteTask$.next(task.id);
  }
}
