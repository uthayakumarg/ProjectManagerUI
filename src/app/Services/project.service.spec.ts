import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Project } from "../Models/project";
import { HttpClientModule } from '@angular/common/http';

describe('projectService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let projectService: ProjectService;
  let MockProjects: Project[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    projectService = TestBed.get(ProjectService);

    MockProjects = [
      { ProjectId: 1, ProjectName: 'Development Project', TasksCount: 5, Completed: 2, StartDate: '09/01/2018', EndDate: '10/01/2018', Priority: 1, ProjectManagerId: 3049571, ProjectManagerFullName: 'Uthaya Kumar Ganesan' },
      { ProjectId: 2, ProjectName: 'Testing Project', TasksCount: 8, Completed: 7, StartDate: '09/05/2018', EndDate: '10/10/2018', Priority: 2, ProjectManagerId: 1234567, ProjectManagerFullName: 'Mani Krishna' },
      { ProjectId: 3, ProjectName: 'Enhancement Project', TasksCount: 18, Completed: 9, StartDate: '09/01/2017', EndDate: '10/01/2017', Priority: 3, ProjectManagerId: 9003483, ProjectManagerFullName: 'Sunil Sinha Venkatesh' }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getProjects ', () => {
    let expectedProjects: Project[];

    beforeEach(() => {
      projectService = TestBed.get(ProjectService);
      expectedProjects = MockProjects;
    });

    it('should return expected projects (All)', () => {
      projectService.getAllProjects().subscribe(
        projects => expect(projects).toEqual(expectedProjects, 'should return expected projects'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.getAllProjectsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedProjects);
    });

    it('should be OK returning no projects', () => {
      projectService.getAllProjects().subscribe(
        projects => expect(projects.length).toEqual(0, 'should have empty projects array'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.getAllProjectsUrl);
      req.flush([]);
    });

  });

  describe('#updateProject', () => {
    it('should update a project and return it', () => {

      const project: Project = MockProjects[0];

      projectService.updateProject(project).subscribe(
        data => expect(data).toEqual(project, 'should return the project'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.updateProjectUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(project);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: project });
      req.event(expectedResponse);
    });
  });

  describe('#suspendProject', () => {

    it('should delete the project', () => {

      const projectId: number = 2;

      projectService.deleteProject(projectId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(projectService.deleteProjectUrl + '/?projectId=' + projectId);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addProject', () => {
    it('should create a project and return it', () => {

      const project: Project = MockProjects[1];

      projectService.addProject(project).subscribe(
        data => expect(data).toEqual(project, 'should return the project'),
        fail
      );

      const req = httpTestingController.expectOne(projectService.addProjectUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(project);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: project });
      req.event(expectedResponse);
    });
  });

});