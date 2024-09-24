//import { Category } from './../../../shared/interfaces/cart';

import { CartService } from './../../../shared/services/cart.service';
import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { FilterPipe } from '../../../shared/pips/filter.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Brand, Category } from '../../../shared/interfaces/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ,RouterLink,CurrencyPipe,FilterPipe,FormsModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy{

 

  searchTerm:string=' '
  isLoading:boolean=false
  Category: Category[] = [];
 // categoriesList: WritableSignal<Category[]> = signal([]);
  productSub!:Subscription
  ProductToWishlistSubscription!: Subscription


  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      
    },
  };

  productList:Product[]=[]


  constructor(private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService,private _WishlistService:WishlistService){}
 



  ngOnInit(){


   
      if( typeof localStorage !=='undefined'){
        localStorage.setItem('currentPage','/home')
      }
  
 
    

  this.productSub = this._ProductService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productList=res.data
        

      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    

  }


  addProduct(pID:string){
    this.isLoading=true
    this._CartService.addProductToCart(pID).subscribe({
      next:(res)=>{

        this._CartService.cartNum .next(res.numOfCartItems)
        console.log(res);
        this.isLoading=false
        this.toastr.success(res.message);
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false
        
      }
    })



  }

  addToWishlist(productId: string) {
    this.ProductToWishlistSubscription = this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message)
      }
    })
  }
  toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite
  }



  ngOnDestroy(): void {

  this.productSub?.unsubscribe()
  this.ProductToWishlistSubscription?.unsubscribe()
  }
 

}
