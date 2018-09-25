import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserDialogComponent } from '../../shared/user-dialog/user-dialog.component';
import { MessageDialogComponent } from '../../shared/message-dialog/message-dialog.component';
import { User } from 'src/app/Models/user';
import { Project } from 'src/app/Models/project';
import { UtilityService } from '../../../Services/utility.service'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  editMode: Boolean;
  selectedMgrId: number;
  project: Project;
  searchProps: string[] = ['ProjectName', 'TasksCount', 'StartDate', 'Completed', 'EndDate', 'Priority'];
  projects: Project[] = [
    {
      ProjectId: 1,
      ProjectName: 'Development Project',
      TasksCount: 5,
      Completed: 2,
      StartDate: '09/01/2018',
      EndDate: '10/01/2018',
      Priority: 1,
      ProjectManagerId: 3049571,
      ProjectManagerFullName: 'Uthaya Kumar Ganesan'
    },
    {
      ProjectId: 2,
      ProjectName: 'Testing Project',
      TasksCount: 8,
      Completed: 7,
      StartDate: '09/05/2018',
      EndDate: '10/10/2018',
      Priority: 2,
      ProjectManagerId: 1234567,
      ProjectManagerFullName: 'Mani Krishna'
    },
    {
      ProjectId: 3,
      ProjectName: 'Enhancement Project',
      TasksCount: 18,
      Completed: 9,
      StartDate: '09/01/2017',
      EndDate: '10/01/2017',
      Priority: 3,
      ProjectManagerId: 9003483,
      ProjectManagerFullName: 'Sunil Sinha Venkatesh'
    }
  ]
  userDialogRef: MatDialogRef<UserDialogComponent>;
  msgDialogRef: MatDialogRef<MessageDialogComponent>;

  path: string[] = ['StartDate'];
  order: number = 1; // 1 asc, -1 desc;

  constructor(private formBuilder: FormBuilder
    ,private dialog: MatDialog
    ,private utility: UtilityService
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.selectedMgrId = null;
    this.projectForm = this.formBuilder.group({
      projectName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      dateRequired: new FormControl(false),
      priority: new FormControl(0, Validators.min(1)),
      projectManager: new FormControl('', Validators.required),
      startDate: new FormControl({ value: null, disabled: true }),
      endDate: new FormControl({ value: null, disabled: true })
    });
  }

  get projectName() { return this.projectForm.get('projectName'); }
  get projectManager() { return this.projectForm.get('projectManager'); }
  get startDate() { return this.projectForm.get('startDate'); }
  get endDate() { return this.projectForm.get('endDate'); }
  get dateRequired() { return this.projectForm.get('dateRequired'); }
  get priority() { return this.projectForm.get('priority'); }

  openUserDialog() {
    this.userDialogRef = this.dialog.open(UserDialogComponent);

    this.userDialogRef.afterClosed().subscribe((selectedUser: User) => {
      if (selectedUser) {
        this.projectForm.patchValue({
          projectManager: selectedUser.FirstName + ' ' + selectedUser.LastName
        });
        this.selectedMgrId = selectedUser.EmployeeId;
      }
    });
  }

  toggleDate() {
    let dateRequired = this.projectForm.value.dateRequired;
    if (!dateRequired) {
      let today = new Date();
      let nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      this.projectForm.patchValue({
        startDate: today,
        endDate: nextDay
      });
      this.projectForm.controls['startDate'].enable();
      this.projectForm.controls['endDate'].enable();
    }
    else {
      this.projectForm.patchValue({
        startDate: null,
        endDate: null
      });
      this.projectForm.controls['startDate'].disable();
      this.projectForm.controls['endDate'].disable();
    }
  }

  addProject() {
    if (!this.projectForm.valid) {
      return;
    }

    let projectInput = this.projectForm.value;

    this.project = {
      ProjectName: projectInput.projectName,
      StartDate: this.utility.getStringifiedDate(projectInput.startDate),
      EndDate: this.utility.getStringifiedDate(projectInput.endDate),
      Priority: projectInput.priority,
      ProjectManagerId: this.selectedMgrId,
      ProjectManagerFullName: '',
      Completed: 0,
      ProjectId: 0,
      TasksCount: 0
    }
    if (!this.validate(projectInput.startDate, projectInput.endDate)) {
      this.msgDialogRef = this.dialog.open(MessageDialogComponent, {
        data: { message: 'End date should be greater then Start date' }
      });
      return;
    }
    
  }

  editProject(project: any) {
    this.projectForm.patchValue({
      projectName: project.ProjectName,
      projectManager: project.ProjectManagerFullName, 
      priority: project.Priority,
    });
    // Enable the date fields if date values are present
    if (project.StartDate) {
      this.projectForm.patchValue({
        dateRequired: true,
        startDate: new Date(project.StartDate),
        endDate: new Date(project.EndDate)
      });
      this.projectForm.controls['startDate'].enable();
      this.projectForm.controls['endDate'].enable();
    }
    this.selectedMgrId = project.ProjectManagerId;
    this.editMode = true;
  }

  reset(form: NgForm): void {
    form.resetForm();
    this.ngOnInit();
  }

  sortRecords(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1);
    return false;
  }

  validate(strtDt: string, endDt: string): boolean {
    if (!strtDt || !endDt) {return true;}
    if (new Date(endDt) < new Date(strtDt)) {
      return false;
    }
    return true;
  }
}