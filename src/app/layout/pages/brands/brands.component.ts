import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private _FlowbiteService:FlowbiteService) {}

  ngOnInit(){
    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/brands')
    }

    this._FlowbiteService.loadFlowbite(()=>{})
    
    this._BrandsService.get_all_brands().subscribe((res)=>{
 
      this.all_brands=res.data;
      
    })
  }
  all_brands:Brands[]=[];
 
  _BrandsService=inject(BrandsService)

  src:string='';
  name:string=''
show_brands(src:string,name:string)
{
  this.src=src;
  this.name=name

}

  }


