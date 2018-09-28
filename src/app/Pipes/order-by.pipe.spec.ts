import { OrderByPipe } from './order-by.pipe';
import { Project } from 'src/app/Models/project';

describe('OrderByPipe', () => {
  let orderByPipe = new OrderByPipe(); 
  let projects: Project[] = [
    { ProjectId: 1, ProjectName: 'Development Project',TasksCount: 5,Completed: 2,StartDate: '09/01/2018',EndDate: '10/01/2018',Priority: 1,ProjectManagerId: 3049571,ProjectManagerFullName: 'Uthaya Kumar Ganesan'},
    { ProjectId: 2, ProjectName: 'Testing Project',TasksCount: 8,Completed: 7,StartDate: '09/05/2018',EndDate: '10/10/2018',Priority: 2,ProjectManagerId: 1234567,ProjectManagerFullName: 'Mani Krishna' },
    { ProjectId: 3, ProjectName: 'Enhancement Project', TasksCount: 18,Completed: 9,StartDate: '09/01/2017',EndDate: '10/01/2017',Priority: 3,ProjectManagerId: 9003483,ProjectManagerFullName: 'Sunil Sinha Venkatesh' }
  ];

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort based on project name descending', () => {
    let result = orderByPipe.transform(projects, ['ProjectName'], -1);
    expect(result[0].ProjectName).toEqual('Testing Project');
  });

  it('should sort based on End Date ascending', () => {
    let result = orderByPipe.transform(projects, ['EndDate'], 1);
    expect(result[0].EndDate).toEqual('10/01/2017');
  });

});
