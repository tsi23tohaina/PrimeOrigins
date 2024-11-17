import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakoService {

  constructor(private http: HttpClient) { }
  
  analyseImage(file: any){
    return  this.http.post("http://10.166.2.156:8000/upload", file);
  }
}
