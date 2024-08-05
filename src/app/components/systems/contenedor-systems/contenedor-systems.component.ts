import { Component, OnInit } from '@angular/core';
import { SystemsComponent } from '../systems.component';
import { SystemsService } from '../../../services/systems.service';
import { FullDescription } from '../../../models/full-description';
import { SistemasCarga } from '../../../models/sistemas-carga';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contenedor-systems',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './contenedor-systems.component.html',
  styleUrl: './contenedor-systems.component.css',
})
export class ContenedorSystemsComponent implements OnInit{

  activos: any = {};
  activosFiltrados: any = {};
  currencies: string[] = [];
  currencySelected: string = 'Todos'; // por default el filtro se establece en Todos (no filtra)
  descripciones: (FullDescription | undefined)[] = []; // Llenado con descriptionsToArray()

  constructor(private systemsService: SystemsService){}

  ngOnInit(): void {
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
        data: this.activos.data.filter(
          (item: any) => item.attributes.currency === this.currencySelected
        ),
      };
    }
  }
}
