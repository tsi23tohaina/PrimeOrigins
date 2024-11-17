import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FakoService {

  constructor(private http: HttpClient) { }
  
  analyseImage(file: FormData){
    return  this.http.post("http://10.166.2.156:8000/upload", file);
  }
}
