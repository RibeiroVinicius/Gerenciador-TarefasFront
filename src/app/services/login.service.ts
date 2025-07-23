import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../interface/IUserLogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5129/api/Login'; // URL da API

  constructor(private http: HttpClient) { }

  login(user: IUserLogin): Observable<any> {
    // Send a POST request to the server with user credentials to obtain an authentication token
    return this.http.post<any>(this.apiUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Specify the content type as JSON
      })
    });
  }
}
