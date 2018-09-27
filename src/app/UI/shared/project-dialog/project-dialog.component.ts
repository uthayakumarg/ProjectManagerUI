import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  projects: Project[];
  srchTerm: string = undefined;
  
  searchProps: string[] = ['ProjectName','StartDate', 'EndDate', 'Priority','ProjectManagerFullName'];
  
  constructor(private dialogRef: MatDialogRef<ProjectDialogComponent>
    , private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects()
      .subscribe(
      project => {
        this.projects = project;
      },
      error => {
        alert('An error occurred while retrieving projects.');
      });
  }

  close(project: Project) {
    this.dialogRef.close(project);
  }

}
