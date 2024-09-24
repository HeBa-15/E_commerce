import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environments } from '../../../base/Environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 

  constructor( private _HttpClient:HttpClient) { }
  get_all_catagory():Observable<any>{
   return this._HttpClient.get(`${Environments.baseUrl}/api/v1/categories`)
  }
  get_specfic_cat(id:string):Observable<any>{
   return this._HttpClient.get(`${Environments.baseUrl}/api/v1/categories/${id}`)
  }
  get_sup_on_cat(cat_id:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${cat_id}/subcategories`)
  }
}
