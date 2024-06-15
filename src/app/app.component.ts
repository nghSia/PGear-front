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

  getProductsByCategory(p_nameCategory){
    this.m_listOfproducts = []; 
    console.log(p_nameCategory);
    this.s_sharedService.getProductsByCategory(p_nameCategory).subscribe(res =>{
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    })
  }

  setCategory(category: string) {
    this.v_router.navigate(['/home', { categorie: category }]);
  }

  signout(){
    UserStorageService.signOut();
    this.v_router.navigateByUrl('');
  }

  reload() : void{
    window.location.reload();
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
