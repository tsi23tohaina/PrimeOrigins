import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakoService {

  constructor(private http: HttpClient) { }
  
  analyseImage(file: FormData){
    return  this.http.post("127.0.0.1:5000/upload", file);
  }
}
