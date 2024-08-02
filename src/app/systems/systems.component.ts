import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.css'
})
export class SystemsComponent implements OnInit{

  nombreUsuario: string = localStorage.getItem('respuestaApi') || '';
  
  // cargo los activos
  
  activos: any = {};
  activosFiltrados: any = {};

  currencies: string[] = [];
  // por default el filtro se establece en Todos (no filtra)
  currencySelected: string= 'Todos'


  
  // esto es para la pantalla de carga
  loading = true;
  loadedImages: number = 0;

  constructor(private router: Router, private http: HttpClient){
  }




  ngOnInit(): void {
    // Si ingreso a este componente sin estar logueado, redirijo a login. Para ello verifico que tenga el nombre guardado en el local storage
    if(!localStorage.getItem('respuestaApi')){
      this.router.navigate(['/login'])
    }

    // Cargo los activos en la variable para poder ser usado en la plantilla con ngFor
    this.http.get('https://api.saldo.com.ar/v3/systems').subscribe(data =>{
      this.activos=data;      
      
      // Extraigo las currencies disponibles para poder armar el filtro
      this.currencies = Array.from(new Set(this.activos.data.map((item: any) => item.attributes.currency)));

      // agrega la opción "Todos" para usar en el filtro
      this.currencies.unshift("Todos")

      // Inicialmente, muestra todos los activos
      this.filterActivos();
    });
    
  }

  cerrarSesion(){
    localStorage.clear()  
    this.router.navigate(['/login'])
  }

  // Utilizada para mostrar animación de carga para las imágenes de los activos
  onImageLoad(): void {
    this.loadedImages++;
    if (this.loadedImages === this.activos.data.length) {
      this.loading = false;
    }
  }  

  // cambia el valor de activosFiltrados dependiendo de currencySelected
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
