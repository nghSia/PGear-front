import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

//back end applciation URL
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private v_http: HttpClient, private v_userStorageService : UserStorageService) { }

  register(p_signupRequest:any): Observable<any> {
    return this.v_http.post(BASIC_URL+ "sign-up", p_signupRequest);
  }

  login(email: string, password: string) : any{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {email, password};
    console.log("headears : " + JSON.stringify(headers) + " body: " + JSON.stringify(body));
    return this.v_http.post(BASIC_URL + 'login', body, { headers, observe: 'response'}).pipe(
      map((res) =>{
        console.log("rights exists");
        const token = res.headers.get('authorization')?.substring(7);
        const user = res.body;
        console.log("token : " + token + " user : " + user);

        if(token && user){
          this.v_userStorageService.saveToken(token);
          this.v_userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }
}
