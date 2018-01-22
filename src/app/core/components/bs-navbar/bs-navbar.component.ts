import { Observable } from 'rxjs/Observable';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../../../shopping/components/shopping-cart/shopping-cart.component';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService,private ShoppingCartService: ShoppingCartService) { 

  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$= await this.ShoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
