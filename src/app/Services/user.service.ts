import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getAllUsersUrl: string = `${environment.apiBaseUrl}/user/getallusers`;
  addUserUrl: string = `${environment.apiBaseUrl}/user/create`;
  updateUserUrl: string = `${environment.apiBaseUrl}/user/update`;
  deleteUserUrl: string = `${environment.apiBaseUrl}/user/delete`;

  constructor(private http: HttpClient) { }

  getAllUsers():  Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.addUserUrl, user)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.updateUserUrl, user)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  deleteUser(id: number): Observable<User> {
    let url = `${this.deleteUserUrl}/?userId=${id}`;
    return this.http.delete<User>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }
}
