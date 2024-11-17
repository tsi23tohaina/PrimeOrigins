import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  private apiUrl = 'http://127.0.0.1:5000/'; // URL de votre backend Python

  constructor(private http: HttpClient) {}

  // Fonction pour envoyer des données au backend Python
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Fonction pour récupérer des données depuis le backend Python
  getRegistryData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
