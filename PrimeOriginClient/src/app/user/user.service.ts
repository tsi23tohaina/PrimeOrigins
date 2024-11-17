import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  addUser(user: UserModel){
    return this.http.post(`${this.apiUrl}/registry`, user)
  }
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    return this.http.post(`${this.apiUrl}/login`, {}, { headers });
  }
}
