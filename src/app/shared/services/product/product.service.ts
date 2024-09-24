import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../../base/Environments';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProduct():Observable<any>{
    return this._HttpClient.get(`  https://ecommerce.routemisr.com/api/v1/products`)

    
  }

  getSpecproduct(productId:string):Observable<any>{
    return this._HttpClient.get(`${Environments.baseUrl}/api/v1/products/${productId}`)

  }
}
