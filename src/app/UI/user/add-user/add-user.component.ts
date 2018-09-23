import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
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

  path: string[] = ['EmployeeId'];
  order: number = 1; // 1 asc, -1 desc;


  constructor(private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl('', Validators.required),
      employeeId: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(7), Validators.maxLength(7)]
      })
    });
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get employeeId() { return this.userForm.get('employeeId'); }

  sortRecords(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1);
    return false;
  }

  addUser() {
    if (!this.userForm.valid) { return; }
    alert('add user called');
  }

  reset(form: NgForm): void {
    form.resetForm();
  }

  editUser(user: User) {
    this.userForm.patchValue({
      firstName: user.FirstName,
      lastName: user.LastName,
      employeeId: user.EmployeeId
    });
  }
}