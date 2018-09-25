import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  users: User[] = [
    {
      FirstName: "Uthaya Kumar",
      LastName: "Ganesan",
      EmployeeId: 3049571
    },
    {
      FirstName: "Anil Kumar",
      LastName: "Gupta",
      EmployeeId: 1234567
    },
    {
      FirstName: "Rajiv Tiwary",
      LastName: "Malhotra",
      EmployeeId: 8475757
    },
    {
      FirstName: "Sunil Sinha",
      LastName: "Venkatesh",
      EmployeeId: 3049571
    },
    {
      FirstName: "Mani",
      LastName: "Krishna",
      EmployeeId: 9003483
    }
  ];
  constructor(private dialogRef: MatDialogRef<UserDialogComponent>) { }

  ngOnInit() {
  }

  close(user: User) {
    this.dialogRef.close(user);
  }

}
