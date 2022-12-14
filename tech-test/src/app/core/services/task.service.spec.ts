import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';

import { of } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskGetterState } from '../ngxs/task/task-getter.state';
import { REQUEST_STATES, STATES } from '../ngxs/ngxs-store.module';

import { TaskService } from './task.service';
import { ApiService } from './api.service';

const TASKS_TO_GET: Task[] = [
  {
    id: 1,
    label: 'Kitchen Cleanup',
    description:  'Clean my dirty kitchen',
    category: 'house',
    done: false
  },
  {
    id: 2,
    label: 'Taxes',
    description:  'Start doing my taxes and contact my accountant jhon for advice',
    category: 'bureaucracy',
    done: '22-10-2019'
  }
];

const TASK_TO_BE_CREATED: Task = {
  id: 3,
  label: 'Taxes 2',
  description:  'Start doing my taxes and contact my accountant jhon for advice',
  category: 'bureaucracy',
  done: '22-10-2019'
};

const TASK_TO_BE_UPDATED: Task = {
  id: 1,
  label: 'Kitchen Cleanup',
  description:  'Clean my dirty kitchen',
  category: 'house',
  done: true // differs from original task
};

const TASK_TO_BE_DELETED_ID = 2;

class MockApiService extends ApiService {
  constructor() {
    super(undefined);
  }

  get(url: string) {
    return of(TASKS_TO_GET as any);
  }

  post(url: string, body) {
    return of(TASK_TO_BE_CREATED as any);
  }

  patch(url: string, body) {
    return of(TASK_TO_BE_UPDATED as any);
  }

  delete(url: string) {
    return of(null);
  }
}


describe('Task Service', () => {
  let taskService: TaskService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(STATES),
        NgxsRequestsPluginModule.forRoot(REQUEST_STATES),
        HttpClientModule,
      ],
      providers: [
        {
          provide: ApiService,
          useClass: MockApiService,
        },
      ]
    });

    taskService = TestBed.inject(TaskService);
    store = TestBed.inject(Store);

    store.reset({
      entities: {},
      ids: []
    });
  });

  it('should be created', fakeAsync(() => {
    return expect(taskService).toBeDefined();
  }));

  it('should get tasks', done => {
    taskService.getTasks();
    store
      .selectOnce(TaskGetterState.getAllTasks)
      .subscribe(async (tasks: Task[]) => {
        await expect(tasks).toEqual(TASKS_TO_GET);
        done();
      });
  });

  it('should create task', done => {
    taskService.getTasks();
    store
      .selectOnce(TaskGetterState.getAllTasks)
      .subscribe(async (tasksAfterGet: Task[]) => {
        await expect(tasksAfterGet).toEqual(TASKS_TO_GET);

        taskService.createTask(TASK_TO_BE_CREATED);
        store
          .selectOnce(TaskGetterState.getAllTasks)
          .subscribe(async (tasksAfterCreate: Task[]) => {
            const createdTask = tasksAfterCreate.find(task => task.id === TASK_TO_BE_CREATED.id);

            await expect(createdTask).toEqual(TASK_TO_BE_CREATED); // created task should be in the state
            await expect(tasksAfterCreate).toEqual([...TASKS_TO_GET, TASK_TO_BE_CREATED]);
            done();
          })
      });
  });

  it('should update task', done => {
    taskService.getTasks();
    store
      .selectOnce(TaskGetterState.getAllTasks)
      .subscribe(async (tasksAfterGet: Task[]) => {
        await expect(tasksAfterGet).toEqual(TASKS_TO_GET);

        taskService.updateTask(TASK_TO_BE_UPDATED);
        store
          .selectOnce(TaskGetterState.getAllTasks)
          .subscribe(async (tasksAfterUpdate: Task[]) => {
            const updatedTask = tasksAfterUpdate.find(task => task.id === TASK_TO_BE_UPDATED.id);

            await expect(updatedTask).toEqual(TASK_TO_BE_UPDATED); // updated task should be in the state
            await expect(tasksAfterUpdate).toEqual(
              TASKS_TO_GET.map(task => task.id === TASK_TO_BE_UPDATED.id
                ? TASK_TO_BE_UPDATED
                : task
              )
            );
            done();
          })
      });
  });

  it('should delete task', done => {
    taskService.getTasks();
    store
      .selectOnce(TaskGetterState.getAllTasks)
      .subscribe(async (tasksAfterGet: Task[]) => {
        await expect(tasksAfterGet).toEqual(TASKS_TO_GET);

        taskService.deleteTask(TASK_TO_BE_DELETED_ID);
        store
          .selectOnce(TaskGetterState.getAllTasks)
          .subscribe(async (tasksAfterDelete: Task[]) => {
            const hasDeletedTask = tasksAfterDelete.some(task => task.id === TASK_TO_BE_DELETED_ID);

            await expect(hasDeletedTask).toBeFalse(); // deleted task should not be in the state
            await expect(tasksAfterDelete).toEqual(
              TASKS_TO_GET.filter(task => task.id !== TASK_TO_BE_DELETED_ID)
            ); // state should contain all the tasks except the deleted one
            done();
          })
      });
  });
});
