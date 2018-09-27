import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, 
  MatSliderModule, MatDialogModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AddUserComponent } from './UI/user/add-user/add-user.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddProjectComponent } from './UI/project/add-project/add-project.component';
import { AddTaskComponent } from './UI/task/add-task/add-task.component';
import { ViewTaskComponent } from './UI/task/view-task/view-task.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { OrderByPipe } from './Pipes/order-by.pipe';
import { UserDialogComponent } from './UI/shared/user-dialog/user-dialog.component';
import { MessageDialogComponent } from './UI/shared/message-dialog/message-dialog.component';
import { ProjectDialogComponent } from './UI/shared/project-dialog/project-dialog.component';
import { TaskDialogComponent } from './UI/shared/task-dialog/task-dialog.component';
import { EditTaskComponent } from './UI/task/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent,
    FilterPipe,
    OrderByPipe,
    UserDialogComponent,
    MessageDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserDialogComponent, MessageDialogComponent, ProjectDialogComponent, TaskDialogComponent]
})
export class AppModule { }
