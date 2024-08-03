import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginDTO } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "https://api.saldo.com.ar/bridge";

  public loginFallido: EventEmitter<boolean> = new EventEmitter<boolean>();



  constructor(private http: HttpClient, private router: Router) { }

  iniciarSesion(loginDto: LoginDTO){
    this.http.post<any>(`${this.apiUrl}/login`, loginDto).subscribe({
      
      next: (data) => {
        // cambia el estado del booleano para mostrar una alerta en el login indicando que se ingreso incorrectamente el email y/o password
        this.loginFallido.emit(false), 
        
        // Redirecciona a navigate una vez que se loguea
        this.router.navigate(['/systems']);
  
        // A falta de token, voy a usar esta respuesta para saber si estoy logueado
        localStorage.setItem('respuestaApi', data.name);
      },
  
      // desactiva el cartel de error al loguear (aunque es innecesario porque no se alcanza a ver por el redireccionamiento)
      error: () => this.loginFallido.emit(true)
    });
  }

  // Verifica que el usuario no este logueado, en caso de que si, es redirijido a /systems
  estaLogueado(){
    if(localStorage.getItem('respuestaApi')){
      this.router.navigate(['/systems']);
    }
  }

}
