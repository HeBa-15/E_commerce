import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Injectable } from '@angular/core';  
import { BehaviorSubject, Observable } from 'rxjs';  
import { Environments } from '../../base/Environments';  
import { WishlistService } from './wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
 
@Injectable({  
  providedIn: 'root'  
})  
export class CartService {  

  
  cartNum:BehaviorSubject<number>=new  BehaviorSubject(0)





 
 
  constructor(private _HttpClient: HttpClient,private _WishlistService :WishlistService, private _ToastService:ToastrService) {  

  }  
 
  addProductToCart(productId: string): Observable<any> {  
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/cart`, {  
      "productId": productId  
    });  
  }  
  
  updateProductQuantity(productId: string, pCount: string): Observable<any> {  
    return this._HttpClient.put(`${Environments.baseUrl}/api/v1/cart/${productId}`, {  
      "count": pCount  
    });  
  }  
  
  getCart(): Observable<any> {  
    return this._HttpClient.get(`${Environments.baseUrl}/api/v1/cart`);  
  }  
  
  removeSpecItem(pId: string): Observable<any> {  
    return this._HttpClient.delete(`${Environments.baseUrl}/api/v1/cart/${pId}` );  
  }  
  
  clearCart(): Observable<any> {  
    return this._HttpClient.delete(`${Environments.baseUrl}/api/v1/cart`);  
  } 
  
  addProductToWishlist(productId:string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this._ToastService.success(res.message);
      }
    });
  }
}