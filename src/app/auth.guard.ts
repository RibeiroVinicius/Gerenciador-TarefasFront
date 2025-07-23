import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.router.navigate(['/login']); // Se não estiver autenticado, redireciona para login
      return false;
    }
    return true; // Se o token existir, permite acesso
  }
}
