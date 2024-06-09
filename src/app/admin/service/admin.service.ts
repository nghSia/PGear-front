import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { category } from '../models/category.modele';
import { product } from '../models/product.modele';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private v_http : HttpClient) { }

  addCategory(p_categoryDTO : any) : Observable<any>{
    console.log("envoie donne");
    return this.v_http.post(BASIC_URL + `category/create`, p_categoryDTO, {
      headers: this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }

  getAllCategories(): Observable<category[]>{
    return this.v_http.get<category[]>(BASIC_URL + `category/get-all`);
  }


  addProduct(p_procuctDTO : any) : Observable<any>{
    console.log("envoie donne");
    return this.v_http.post(BASIC_URL + `product/create`, p_procuctDTO, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllProducts(): Observable<any[]>{
    return this.v_http.get<product[]>(BASIC_URL + `product/get-all`);
  }

  getProductsByName(p_name : any): Observable<any[]>{
    return this.v_http.get<product[]>(BASIC_URL + `product/find/${p_name}`);
  }

  deleteProduct(p_productId : any) : Observable<any>{
    console.log("envoie donne");
    return this.v_http.delete(BASIC_URL + `product/delete/${p_productId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

}
