import { Component, HostListener, OnInit } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';
import { category } from './admin/models/category.modele';
import { SharedService } from './shared/service/shared.service';
import { product } from './shared/models/product';

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
  m_listOfproducts: product[] = [];
  isMobile: boolean = false;
  sidenavOpened: boolean = false;

  constructor(
    private v_router : Router,
    private s_sharedService : SharedService
  ){}

  ngOnInit(): void {
    this.v_router.events.subscribe(() => {
      this.isCustomer = UserStorageService.isCustomer();
      this.isAdmin = UserStorageService.isAdmin();
      this.getAllCetgories();
    });
    this.checkScreenWidth();
  }

  getAllCetgories(){
    this.s_sharedService.getAllCategories().subscribe(res => {
      this.m_listOfcategories = res;
    });
  }

  setCategory(category: string) {
    this.v_router.navigate(['/home/categorie', { categorie: category }]);
  }

  setCategoryAdmin(category: string) {
    this.v_router.navigate(['/admin/categorie', { categorie: category }]);
  }

  setCategoryCustomer(category: string) {
    this.v_router.navigate(['/customer/categorie', { categorie: category }]);
  }

  signout(){
    UserStorageService.signOut();
    this.v_router.navigateByUrl('');
  }

  reloadHomePage() : void{
    window.location.href = '/';
  } 
  
  reloadAdminAccueil() : void {
    window.location.href = "/admin/accueil";
  }

  reloadCustomerAccueil() : void {
    window.location.href = "/customer/accueil";
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
