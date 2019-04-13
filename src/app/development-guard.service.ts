import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../environments/environment';

// Solution from https://stackoverflow.com/questions/51056704/configure-angular-routes-in-environment

@Injectable({
  providedIn: 'root'
})
export class DevelopmentGuard implements CanActivate {
  canActivate() {
    return !environment.production;
  }
}
