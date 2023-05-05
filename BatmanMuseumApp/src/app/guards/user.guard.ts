import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router, private toast: HotToastService) {}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> {
  return this.authService.isUser().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login']).then(() => {
          this.toast.info("Please log in to be able to use this feature.")
      });
        return false;
      }
    })
  );
}

}
  
