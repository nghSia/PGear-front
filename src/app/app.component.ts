import { Component, OnInit } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';
import { AdminService } from './admin/service/admin.service';
import { category } from './admin/models/category.modele';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PGear-front';

  isCustomer : boolean = UserStorageService.isCustomer();
  isAdmin : boolean = UserStorageService.isAdmin();
  categories: category[] = [];

  constructor(
    private v_router : Router,
    private s_adminService : AdminService,

  ){}

  ngOnInit(): void {
    this.signout();
    this.v_router.events.subscribe(() => {
      this.isCustomer = UserStorageService.isCustomer();
      this.isAdmin = UserStorageService.isAdmin();

      if (this.isCustomer || this.isAdmin) {
        this.getAllCetgories();
      }
    });
  }

  getAllCetgories(){
    this.s_adminService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  signout(){
    UserStorageService.signOut();
    this.v_router.navigateByUrl('login');
  }
  
}
