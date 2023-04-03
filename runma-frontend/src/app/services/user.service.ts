import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }
  
  createUser(user: User): Observable<object>{
    console.log("created new User" + user);
    return this.httpClient.post(`${this.baseURL}/` , user);
  }
  getUserById(id: number):Observable<User>{
    console.log("this is from server ; id is "+id)
    return this.httpClient.get<User>(this.baseURL+'/'+id)
  }

  updateUser(id: number, user: User): Observable<Object>{
    console.log("updated user" + user)
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }
}