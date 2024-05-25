import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { category } from '../models/category.modele';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private v_http : HttpClient) { }

  addCategory(p_categoryDTO : any) : Observable<any>{
    console.log("envoie donne");
    return this.v_http.post(BASIC_URL + "admin/category", p_categoryDTO, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    console.log("createAuthorizationHeader");
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }

  getAllCategories(): Observable<category[]>{
    return this.v_http.get<category[]>(BASIC_URL + "admin", {
      headers: this.createAuthorizationHeader(),
    })
  }
}
