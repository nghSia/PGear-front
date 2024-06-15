import { Component, OnInit } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';
import { category } from './admin/models/category.modele';
import { SharedService } from './shared/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PGear-front';

  isCustomer : boolean = UserStorageService.isCustomer();
  isAdmin : boolean = UserStorageService.isAdmin();
  m_listOfcategories: category[] = [];


  constructor(
    private v_router : Router,
    private s_sharedService : SharedService,
  ){}

  ngOnInit(): void {
    this.v_router.events.subscribe(() => {
      this.isCustomer = UserStorageService.isCustomer();
      this.isAdmin = UserStorageService.isAdmin();
      this.getAllCetgories();
    });
  }

  getAllCetgories(){
    this.s_sharedService.getAllCategories().subscribe(res => {
      this.m_listOfcategories = res;
    });
  }

  signout(){
    UserStorageService.signOut();
    this.v_router.navigateByUrl('');
  }

  reload() : void{
    window.location.reload();
  }
}
