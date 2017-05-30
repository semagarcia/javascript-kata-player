import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private authSrv: AuthenticationService) { }

    canActivate(nextRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authSrv.isLoggedIn()) {
            return true;
        } else {
            //this.router.navigate(['/login'], { queryParams: { status: 'expired' }});
            this.router.navigate(['/login']);
            return false;
        }
    }
}
