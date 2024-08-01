import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [NgFor],
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.css'
})
export class SystemsComponent implements OnInit{

  nombreUsuario: string = localStorage.getItem('respuestaApi') || '';
  
  // cargo los activos
  activos: any = {};

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
    });

    
  }

  cerrarSesion(){
    localStorage.clear()  
    this.router.navigate(['/login'])
  }

}
