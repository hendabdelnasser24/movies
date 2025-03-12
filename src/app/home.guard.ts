import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
   const router = inject(Router);
   if (auth.userData.getValue() == null) {
     return true;
   }
   else {
     router.navigate(['home']);
     return false;
   }
};
