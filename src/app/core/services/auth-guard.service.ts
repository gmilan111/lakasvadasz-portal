import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
