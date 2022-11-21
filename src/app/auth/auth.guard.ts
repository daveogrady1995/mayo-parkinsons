import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState.pipe(map((authState) => {
      if (authState != null && authState.uid == "FVKNk5g8hEaPfuENEionngGPVXh1") {
        return true;
      } else {
        this.toastr.warning('Warning', 'You need to login before you can perform this action');
        this.router.navigate(['/login']);
        return false
      }

    }))
  }
}
