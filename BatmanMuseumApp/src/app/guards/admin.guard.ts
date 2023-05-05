import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../services/user.service';
import { User } from '../shared/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private toast: HotToastService,
    private userService: UserService) { }
  
    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.isAdmin());
    }

    async isAdmin(): Promise<boolean> { 
      try {
        const user: User = await this.userService.getUserById(await this.authService.getUid());
        if (user.isAdmin) {
          return true;
        } else {
          this.router.navigateByUrl('/dashboard').then(() => {
            this.toast.info("This page is not accessible to you.")
          })
          return false;
        }
      } catch (error) {
        this.router.navigateByUrl('/login').then(() => {
          this.toast.info("This page is not accessible to you.")
        })
        return false
    } 
  }   
}
