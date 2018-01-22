import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services/auth.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart:ShoppingCart;
  shipping = {}; 
  userId:string;
  userSubscription:Subscription;

  constructor(private router:Router, private authService:AuthService, private orderService:OrderService){}

  ngOnInit() {
    this.userSubscription=this.authService.user$.subscribe(user=>this.userId=user.uid);

  }
  ngOnDestroy(){
        this.userSubscription.unsubscribe();
  } 

  async placeOrder() {
    let order= new Order(this.userId,this.shipping,this.cart);
    let result=await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }    
}
