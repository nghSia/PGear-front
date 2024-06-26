import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private v_http : HttpClient) { }


  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    );
  }

  addToCart(p_productId: any): Observable<any>{
    const cart = {
      productId : p_productId,
      userId : UserStorageService.getUserId()
    }
    return this.v_http.post(BASIC_URL + `cart/add`, cart, {
      headers: this.createAuthorizationHeader(),
    })
  }

}
