import { Component, inject } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/interfaces/product';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  isLoading!: boolean;
  constructor(private _WishlistService:WishlistService, private _ToastrService: ToastrService,private _CartService :CartService){}
 
  productsWishlist: Product[] = [];
  LoggedWishlistSubscription!:Subscription
  ProductToWishlistSubscription!: Subscription
  removeWishlistSubscription!:Subscription

  ngOnInit(): void {

    
    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/wishList')
    }

    this.LoggedWishlistSubscription = this._WishlistService.getLoggedUserWishlist().subscribe({
      next: res => {
        this.productsWishlist = res.data;
        // console.log(this.productsWishlist);
      }
    });
  }
 

  
  addProduct(pID:string){
    this.isLoading=true
    this._CartService.addProductToCart(pID).subscribe({
      next:(res)=>{

        this._CartService.cartNum .next(res.numOfCartItems)
        console.log(res);
        this.isLoading=false
        this._ToastrService.success(res.message);
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false
        
      }
    })



  }
  removeProductWishlist(productId: string): void {
    this.removeWishlistSubscription = this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        // console.log(res);
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: res => {
            this.productsWishlist = res.data;
          }
        });
      }
    });
  }

  addToWishlist(productId: string) {
    this.ProductToWishlistSubscription = this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message)
      }
    })
  }
  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite
  }
  ngOnDestroy(): void {
    // unsubscribe to prevent memory leak.
    this.LoggedWishlistSubscription?.unsubscribe();
    this.removeWishlistSubscription?.unsubscribe();
    this.ProductToWishlistSubscription?.unsubscribe()
  }
}

