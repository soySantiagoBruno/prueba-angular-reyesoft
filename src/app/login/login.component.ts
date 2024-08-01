import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  loginFallido: boolean = false;

  constructor(private http: HttpClient, private router: Router){}

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
      // Esto cambia el estado del booleano para mostrar una alerta en el login indicando que se ingreso incorrectamente el email y/o password
      next: () => {this.loginFallido = false, this.router.navigate(['/systems'])},
      error: () => this.loginFallido = true
    });
  }

}
