import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  
  loginFallido: boolean = false;

  constructor(private http: HttpClient, private router: Router){}
  
  ngOnInit(): void {
    
    // Si se vuelve a cargar este componente y el usuario ya esta logueado, redirijo a systems
    if(localStorage.getItem('respuestaApi')){
      this.router.navigate(['/systems']);
    }

  }

  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  
  
  onSubmit() {
    // armo los datos de login en un objeto para mayor claridad al momento de pasarlo en el body de la request
    let login = {
      "email": this.formularioLogin.value.email,
      "password": this.formularioLogin.value.password
    };

    this.http.post<any>("https://api.saldo.com.ar/bridge/login", login).subscribe({
      
      next: (data) => {
        // cambia el estado del booleano para mostrar una alerta en el login indicando que se ingreso incorrectamente el email y/o password
        this.loginFallido = false, 
        
        // Redirecciona a navigate una vez que se loguea
        this.router.navigate(['/systems'])

        // A falta de token, voy a usar esta respuesta para saber si estoy logueado
        localStorage.setItem('respuestaApi', data.name);
      },
      error: () => this.loginFallido = true,
    });
  }

}
