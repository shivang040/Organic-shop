import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartservice:ShoppingCartService) { }

  async placeOrder(order) {
    let result=await this.db.list('/orders').push(order);
    this.shoppingCartservice.clearCart();
    return result;
  }
 getOrders(){
   return this.db.list.apply('/orders');
 }
 getOrdersByUser(userId: string) {
  return this.db.list('/orders', {
    query: {
      orderByChild: 'userId',
      equalTo: userId        
    }
  });
}
}

