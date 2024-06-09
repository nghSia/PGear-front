import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../../models/category';
import { product } from '../../models/product';


const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private v_http : HttpClient) { }

  getAllCategories(): Observable<category[]>{
    return this.v_http.get<category[]>(BASIC_URL + `category/get-all`);
  }

  getAllProducts(): Observable<any[]>{
    return this.v_http.get<product[]>(BASIC_URL + `product/get-all`);
  }

  getProductsByName(p_name : any): Observable<any[]>{
    return this.v_http.get<product[]>(BASIC_URL + `product/find/${p_name}`);
  }
}
