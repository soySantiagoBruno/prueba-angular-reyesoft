import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from '../../models/login';
import { UserService } from '../../services/user.service';
import { LoginFormService } from '../../forms/login-form.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  
  loginFallido: boolean = false;
  formularioLogin: FormGroup;


  constructor(private userService: UserService, private loginFormService: LoginFormService){
    // Creo el formulario a usar para el login
    this.formularioLogin = loginFormService.createLoginForm();
  }

  
  ngOnInit(): void {
    this.userService.estaLogueado();

    // cambia el estado del booleano para mostrar una alerta en el login indicando que se ingreso incorrectamente el email y/o password
    this.userService.loginFallido.subscribe((status: boolean) => this.loginFallido = status)
  }

  onSubmit() {
    // armo los datos de login en un objeto para pasarlo en el body de la request
    const loginDto: LoginDTO = {
      email: this.formularioLogin.value.email || '',
      password: this.formularioLogin.value.password || ''
    };
    
    this.userService.iniciarSesion(loginDto);
  }

}
