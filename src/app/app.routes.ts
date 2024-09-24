import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';
import { WishListComponent } from './layout/pages/wish-list/wish-list.component';

export const routes: Routes = [
{path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent,canActivate:[authGuard],title:'home'},
    {path:"login",component:LoginComponent,title:'login'},
    {path:"products",component:ProductsComponent,canActivate:[authGuard],title:'product'},
    {path:"cart",component:CartComponent,canActivate:[authGuard],title:'cart'},
    {path:"brands",component:BrandsComponent,canActivate:[authGuard],title:'brands'},
    {path:"categories",component:CategoriesComponent,canActivate:[authGuard],title:'categories'},
    {path:"register",component:RegisterComponent,title:'register '},
    {path:"wishList",component:WishListComponent,title:'wishList'},
    {path:"forgetpassword",component:ForgetpasswordComponent,title:'foregetPassword'},
    {path:'productdetails/:pId',component:ProductDetailsComponent,canActivate:[authGuard],title:'ProductDetails'},
    {path:'checkout/:id',component:CheckoutComponent,canActivate:[authGuard],title:'checkout'},

    {path:"**",component:NotFoundComponent}
];
