import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { SystemsService } from '../../services/systems.service';
import { UserService } from '../../services/user.service';
import { SystemsJson } from '../../models/systems-json';
import { FullDescription } from '../../models/full-description';
import { SistemasCarga } from '../../models/sistemas-carga';

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.css'
})
export class SystemsComponent implements OnInit{


  nombreUsuario: string = localStorage.getItem('respuestaApi') || '';
  
  activos: any = {};
  activosFiltrados: any = {};
  currencies: string[] = [];
  currencySelected: string= 'Todos'; // por default el filtro se establece en Todos (no filtra)
  descripciones: (FullDescription|undefined) [] = []; // Llenado con descriptionsToArray()



  constructor(private systemsService: SystemsService, private userService: UserService, private http: HttpClient, private router: Router){}


  ngOnInit(): void {
    
    // Verifica que el usuario este logueado
    this.userService.estaLogueado()
    

    // carga los sistemas a ser mostrados
    this.systemsService.cargarSystems().subscribe((data: SistemasCarga) => {
      this.currencies = data.currencies;
      this.activos = data.activos;
      this.currencySelected = data.currencySelected;

      // Se invoca al principio para mostrar todos los activos
      this.filterActivos();
    })


    // carga las descripciones de los sistemas
    this.systemsService.descriptionsToArray().subscribe((descripciones: (FullDescription|undefined)[]) => {
      this.descripciones = descripciones;
    });
    

  }


  cerrarSesion(){
    this.userService.cerrarSesion();
  }

  // Muestra animación de carga para las imágenes de los activos
  loading = true;
  loadedImages: number = 0;
  onImageLoad(): void {
    this.loadedImages++;
    if (this.loadedImages === this.activosFiltrados.data.length) {
      this.loading = false;
    }
  }  


  //cambia el valor de activosFiltrados dependiendo de currencySelected
  filterActivos(): void {
    if (this.currencySelected === 'Todos') {
      this.activosFiltrados = this.activos;
    } else {
      this.activosFiltrados = {
        ...this.activos,
        data: this.activos.data.filter((item: any) => item.attributes.currency === this.currencySelected)
      };
    }
  }


}