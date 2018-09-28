import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from "../Models/user";
import { HttpClientModule } from '@angular/common/http';

describe('userService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  let MockUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    userService = TestBed.get(UserService);

    MockUsers = [
      { FirstName: "Uthaya Kumar", LastName: "Ganesan", EmployeeId: 3049571 },
      { FirstName: "Anil Kumar", LastName: "Gupta", EmployeeId: 1234567 },
      { FirstName: "Mani", LastName: "Krishna", EmployeeId: 8475757 },
      { FirstName: "Anandha", LastName: "Kumar", EmployeeId: 9003483 }
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getUsers ', () => {
    let expectedUsers: User[];

    beforeEach(() => {
      userService = TestBed.get(UserService);
      expectedUsers = MockUsers;
    });

    it('should return expected users (All)', () => {
      userService.getAllUsers().subscribe(
        users => expect(users).toEqual(expectedUsers, 'should return expected users'),
        fail
      );

      const req = httpTestingController.expectOne(userService.getAllUsersUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedUsers);
    });

    it('should be OK returning no users', () => {
      userService.getAllUsers().subscribe(
        users => expect(users.length).toEqual(0, 'should have empty users array'),
        fail
      );

      const req = httpTestingController.expectOne(userService.getAllUsersUrl);
      req.flush([]); 
    });

  });

  describe('#updateUser', () => {
    it('should update a user and return it', () => {

      const user: User = MockUsers[0];

      userService.updateUser(user).subscribe(
        data => expect(data).toEqual(user, 'should return the user'),
        fail
      );

      const req = httpTestingController.expectOne(userService.updateUserUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(user);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: user });
      req.event(expectedResponse);
    });
  });

  describe('#deleteUser', () => {

    it('should delete the user', () => {

      const userId: number = 2;

      const expectedTask: User = MockUsers[2];

      userService.deleteUser(userId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(userService.deleteUserUrl + '/?userId=' + userId);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addUser', () => {
    it('should create a user and return it', () => {

      const user: User = MockUsers[1];

      userService.addUser(user).subscribe(
        data => expect(data).toEqual(user, 'should return the user'),
        fail
      );

      const req = httpTestingController.expectOne(userService.addUserUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: user });
      req.event(expectedResponse);
    });
  });

});