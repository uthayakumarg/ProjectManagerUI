import { FilterPipe } from './filter.pipe';
import { Project } from 'src/app/Models/project';

describe('FilterPipe', () => {
  let testPipe = new FilterPipe(); 
  let searchProps: string[] = ['ProjectName', 'TasksCount', 'StartDate', 'Completed', 'EndDate', 'Priority'];
  let projects: Project[] = [
    { ProjectId: 1, ProjectName: 'Development Project',TasksCount: 5,Completed: 2,StartDate: '09/01/2018',EndDate: '10/01/2018',Priority: 1,ProjectManagerId: 3049571,ProjectManagerFullName: 'Uthaya Kumar Ganesan'},
    { ProjectId: 2, ProjectName: 'Testing Project',TasksCount: 8,Completed: 7,StartDate: '09/05/2018',EndDate: '10/10/2018',Priority: 2,ProjectManagerId: 1234567,ProjectManagerFullName: 'Mani Krishna' },
    { ProjectId: 3, ProjectName: 'Enhancement Project', TasksCount: 18,Completed: 9,StartDate: '09/01/2017',EndDate: '10/01/2017',Priority: 3,ProjectManagerId: 9003483,ProjectManagerFullName: 'Sunil Sinha Venkatesh' }
  ];

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter based on project name', () => {
    let filter: any = 'Enhancement Project'
    let expectedResult: any[] = [
      { ProjectId: 3, ProjectName: 'Enhancement Project', TasksCount: 18,Completed: 9,StartDate: '09/01/2017',EndDate: '10/01/2017',Priority: 3,ProjectManagerId: 9003483,ProjectManagerFullName: 'Sunil Sinha Venkatesh' }
    ];
    expect(testPipe.transform(projects, filter, searchProps)).toEqual(expectedResult);
  });

  it('should filter based on date', () => {
    let filter: any = '09/01'
    let expectedResult: any[] = [
      { ProjectId: 1, ProjectName: 'Development Project',TasksCount: 5,Completed: 2,StartDate: '09/01/2018',EndDate: '10/01/2018',Priority: 1,ProjectManagerId: 3049571,ProjectManagerFullName: 'Uthaya Kumar Ganesan'},
      { ProjectId: 3, ProjectName: 'Enhancement Project', TasksCount: 18,Completed: 9,StartDate: '09/01/2017',EndDate: '10/01/2017',Priority: 3,ProjectManagerId: 9003483,ProjectManagerFullName: 'Sunil Sinha Venkatesh' }
    ];
    expect(testPipe.transform(projects, filter, searchProps)).toEqual(expectedResult);
  });

  it('should not filter based on project manager name', () => {
    let filter: any = 'Sunil Sinha Venkatesh'
    let expectedResult: any[] = [];
    expect(testPipe.transform(projects, filter, searchProps)).toEqual(expectedResult);
  });

});
