import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  myProduct!:Product
  isLoading!: boolean;
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private toastr:ToastrService){}

  ngOnInit():void{

    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/productdetails')
    }

    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      //console.log(res.params.pId);
      this._ProductService.getSpecproduct(res.params.pId).subscribe({
        next:(res)=>{
          console.log(res)
          this.myProduct=res.data

        },
        error:(err)=>{
          console.log(err);
          
        }

      })
      
    })
    //this._ProductService.getSpecproduct()

  }

  pID!:string
  
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

}
