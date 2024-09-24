import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  myCart!:Cart
  constructor(private _CartService:CartService,private toastr: ToastrService){}

  ngOnInit(){
    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/cart')
    }

    this._CartService.getCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart=res
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  updateQuantity(pId:string,pCount:number){
    this._CartService.updateProductQuantity(pId,pCount.toString()).subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart=res
        this.toastr.success(" Cart updated");
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  removeItem(Id:string){
    this._CartService.removeSpecItem(Id).subscribe({
      next:(res)=>{
        console.log(res);
        this.myCart=res
        this.toastr.error("Item Deleted")
        this._CartService.cartNum.next(res.numOfCartItems)
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  

  clearCart(){
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message=='success'){
          this.myCart={} as Cart
          this._CartService.cartNum.next(0)
        }
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
