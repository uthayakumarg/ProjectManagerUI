import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AddUserComponent } from './UI/user/add-user/add-user.component';
import { UserListComponent } from './UI/user/user-list/user-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddProjectComponent } from './UI/project/add-project/add-project.component';
import { ProjectsListComponent } from './UI/project/projects-list/projects-list.component';
import { AddTaskComponent } from './UI/task/add-task/add-task.component';
import { ViewTaskComponent } from './UI/task/view-task/view-task.component';
import { TasksListComponent } from './UI/task/tasks-list/tasks-list.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { OrderByPipe } from './Pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListComponent,
    AddProjectComponent,
    ProjectsListComponent,
    AddTaskComponent,
    ViewTaskComponent,
    TasksListComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
