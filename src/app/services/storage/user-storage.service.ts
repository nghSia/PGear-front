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

  public saveUser(p_user : string) :void{
    window.localStorage.removeItem(v_USER);
    window.localStorage.setItem(v_TOKEN, JSON.stringify(p_user));
  }
}
