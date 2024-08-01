import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [],
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.css'
})
export class SystemsComponent implements OnInit{

  constructor(private router: Router){}
  
  ngOnInit(): void {
    // Si ingreso a este componente sin estar logueado, redirijo a login para ello verifico que tenga el nombre guardado en el local storage
    if(!localStorage.getItem('respuestaApi')){
      this.router.navigate(['/login'])
    }

  }

  cerrarSesion(){
    localStorage.clear()  
    this.router.navigate(['/login'])
  }

}
