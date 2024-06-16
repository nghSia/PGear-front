import { Injectable } from '@angular/core';

const v_TOKEN = 'pgear-token';
const v_USER = 'pgear-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(p_token: string) : void {
    window.localStorage.removeItem(v_TOKEN);
    window.localStorage.setItem(v_TOKEN, p_token);
  }

  public saveUser(p_user : any) :void{
    window.localStorage.removeItem(v_USER);
    window.localStorage.setItem(v_USER, JSON.stringify(p_user));
  }
  
  static getUser(): any{
    const c_locals = localStorage.getItem(v_USER);
    if(c_locals !== null) {
      return JSON.parse(c_locals);
    }
    return '';
  }


  static getToken(): any{
    return localStorage.getItem(v_TOKEN);
  }

  static getUserId(): string{
    const c_user = this.getUser();
    console.log("getUserId" + c_user);
    return c_user? c_user.userid : '';
  }

  static getUserRole(): string {
    const c_role = this.getUser();
    return c_role? c_role.role : '';
  }

  static isAdmin(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const c_role: string = this.getUserRole();
    return c_role ==  'ADMIN';
  }

  static isCustomer(): boolean {
    if(this.getToken() === null){
      return false;
    }
    const c_role: string = this.getUserRole();
    return c_role ==  'CUSTOMER';
  }


  static signOut(): void {
    window.localStorage.removeItem(v_TOKEN);
    window.localStorage.removeItem(v_USER);
  }

}
