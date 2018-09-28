import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from './task.service';
import { Task } from "../Models/task";
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let taskService: TaskService;
  let MockTasks: Task[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    taskService = TestBed.get(TaskService);

    MockTasks = [
      { TaskId: 1, TaskName: "Task Module Coding", ParentId: 1, ParentName: "Task Module Build", Priority: 2, StartDate: "09/01/2018", EndDate: "09/15/2018", ProjectId: 1, ProjectName: "Development project", UserId: 1234567, UserName: "Uthaya Kumar G", TaskStatus: "A" },
      { TaskId: 2, TaskName: "Task Module Testing", ParentId: 1, ParentName: "Task Module Build", Priority: 3, StartDate: "09/16/2018", EndDate: "09/30/2018", ProjectId: 1, ProjectName: "Development project", UserId: 5674879, UserName: "Pavan Kumar", TaskStatus: "A" },
      { TaskId: 3, TaskName: "Project Module Coding", ParentId: 2, ParentName: "Project Module Build", Priority: 6, StartDate: "10/01/2018", EndDate: "10/15/2018", ProjectId: 1, ProjectName: "Development project", UserId: 8978754, UserName: "Krishna Kumar", TaskStatus: "C" },
      { TaskId: 4, TaskName: "Project Module Testing", ParentId: 2, ParentName: "Project Module Build", Priority: 8, StartDate: "10/16/2018", EndDate: "10/31/2018", ProjectId: 1, ProjectName: "Development project", UserId: 8995455, UserName: "Ravi Kumar", TaskStatus: "A" },
      { TaskId: 5, TaskName: "User Module Coding", ParentId: 3, ParentName: "User Module Build", Priority: 9, StartDate: "11/01/2018", EndDate: "11/30/2018", ProjectId: 2, ProjectName: "Enhancement project", UserId: 5645895, UserName: "Selva Kumar", TaskStatus: "A" }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getTasks ', () => {
    let expectedTasks: Task[];

    beforeEach(() => {
      taskService = TestBed.get(TaskService);
      expectedTasks = MockTasks;
    });

    it('should return expected tasks (All)', () => {

      let projectId = 3;
      taskService.getAllTasks(projectId).subscribe(
        tasks => expect(tasks).toEqual(expectedTasks, 'should return expected tasks'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getAllTasksUrl + '/?projectId=' + projectId);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTasks);
    });

    it('should be OK returning no tasks', () => {
      let projectId = 3;
      taskService.getAllTasks(projectId).subscribe(
        tasks => expect(tasks.length).toEqual(0, 'should have empty tasks array'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getAllTasksUrl + '/?projectId=' + projectId);
      req.flush([]); 
    });

    it('should return the expected task (Single)', () => {
      const taskId: number = 2;
      let expectedTask = MockTasks[taskId - 1];

      taskService.getTaskById(taskId).subscribe(
        task => expect(task).toEqual(expectedTask, 'should return expected task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getTaskByIdUrl + '/?taskId=' + taskId);      
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTask);
    });
  });

  describe('#updateTask', () => {
    it('should update a task and return it', () => {

      const task: Task = MockTasks[0];

      taskService.updateTask(task).subscribe(
        data => expect(data).toEqual(task, 'should return the task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.updateTaskUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });

  describe('#endTask', () => {

    it('should complete the task and return it', () => {

      const taskId: number = 2;

      const expectedTask: Task = MockTasks[2];

      taskService.endTask(taskId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(taskService.endTaskUrl + '/?taskId=' + taskId);
      expect(req.request.method).toEqual('PUT');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addTask', () => {
    it('should create a task and return it', () => {

      const task: Task = MockTasks[1];

      taskService.addTask(task).subscribe(
        data => expect(data).toEqual(task, 'should return the task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.addTaskUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });

});
