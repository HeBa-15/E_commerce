import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

 let _Router= inject(Router)
  const _PLATFORM_ID= inject(PLATFORM_ID)

  if(isPlatformBrowser(_PLATFORM_ID)){
 
  if(localStorage.getItem('userToken')!==null){
    return true
  }
  else{
   //console.log(state.url);
   // localStorage.getItem('nvigateTo', state.url)
    
    return _Router.navigate(['/login'])
  }
}
else{
  return false;
}


};


