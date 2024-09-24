import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}
  
  addProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${Environments.baseUrl}/api/v1/wishlist`,
      {
        productId: productId
      },
    );
  }
  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${Environments.baseUrl}/api/v1/wishlist`);
  }
  // Remove product from wishlist
  removeProductFromWishlist(productId:string):Observable<any> {
    return this._HttpClient.delete(`${Environments.baseUrl}/api/v1/wishlist/${productId}`);
  }
}

