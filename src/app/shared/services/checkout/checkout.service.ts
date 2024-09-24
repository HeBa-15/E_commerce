import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../../base/Environments';
  
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  myToken:any={"token":localStorage.getItem("userToken")}
  constructor(private _HttpClient:HttpClient) { }

  checkOut(cartId:string ,userData:any):Observable<any>{
    return this._HttpClient.post(`${Environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      "shippingAddress":userData
    },
    {
      headers:this.myToken
    }
  


   // https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c91634ed0dc0016c217bb3?url=http://localhost:3000
  
  )

  }

}

//${Environments.baseUrl}api/v1/orders/checkout-session/${cartId}?url=${Environments.localUrl}