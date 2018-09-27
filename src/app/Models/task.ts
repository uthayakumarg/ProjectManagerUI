export class Task {
    TaskId: number;
    TaskName: string;
    ParentId: number;
    ParentName: string;
    Priority: number;
    StartDate: string;
    EndDate: string;
    ProjectId: number;
    ProjectName: string;
    UserId: number;
    UserName: string;
    TaskStatus: string;
}

// tasks: ParentTask[] = [
//     {
//       TaskId: 1,
//       TaskName: 'Tasks Module'
//     },
//     {
//       TaskId: 2,
//       TaskName: 'Users Module'
//     },
//     {
//       TaskId: 3,
//       TaskName: 'Projects Module'
//     }
//   ]
