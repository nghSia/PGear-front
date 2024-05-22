import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//back end applciation URL
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private http: HttpClient
  ) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL+ "sign-up", signupRequest);
  }
}
