import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/catergory/category.service';
import { Brands } from '../../../shared/interfaces/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _CategoryService:CategoryService){}

  ngOnInit(){
    if( typeof localStorage !=='undefined'){
      localStorage.setItem('currentPage','/categories')
    }

    this._CategoryService.get_all_catagory().subscribe((res)=>{
      // console.log(res.data);
      this.all_catagory=res.data;
      // console.log(this.all_catagory);
      
      
    })

  }


  all_catagory:Brands[]=[]
  all_sup:any[]=[];
  _CatagoryService=inject(CategoryService)
 
  is_sup:boolean=false;
  text:string='';
  show_sup(id:string,text:string){
    this.is_sup=true
    this.text=text;
    this._CatagoryService.get_sup_on_cat(id).subscribe((res)=>{
      this.all_sup=res.data
      // console.log(res.data);
      
    })

  }

}
