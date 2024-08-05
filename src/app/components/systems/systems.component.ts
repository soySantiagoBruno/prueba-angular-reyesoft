import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemsService } from '../../services/systems.service';
import { UserService } from '../../services/user.service';
import { FullDescription } from '../../models/full-description';
import { SistemasCarga } from '../../models/sistemas-carga';
import { ContenedorSystemsComponent } from './contenedor-systems/contenedor-systems.component';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [NgFor, NgIf, ContenedorSystemsComponent, HeaderComponent],
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.css'
})
export class SystemsComponent implements OnInit{

  constructor(private systemsService: SystemsService, private userService: UserService, private http: HttpClient, private router: Router){}


  ngOnInit(): void {
    // Verifica que el usuario este logueado
    this.userService.estaLogueado()
  }


}