import { Component, OnInit } from '@angular/core';
import { SystemsComponent } from '../systems.component';
import { SystemsService } from '../../../services/systems.service';
import { FullDescription } from '../../../models/full-description';
import { SistemasCarga } from '../../../models/sistemas-carga';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contenedor-systems',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './contenedor-systems.component.html',
  styleUrl: './contenedor-systems.component.css',
})
export class ContenedorSystemsComponent implements OnInit{
  dineroEnviado: any;

  activos: any = {};
  activosFiltrados: any = {};
  currencies: string[] = [];
  currencySelected: string = 'Todos'; // por default el filtro se establece en Todos (no filtra)
  descripciones: (FullDescription | undefined)[] = []; // Llenado con descriptionsToArray()

  selectedItemImageUrl?: string = `https://api.saldo.com.ar/img/sistemas2/banco.big.png`; // Imagen por defecto (puede ser una imagen genérica o vacía)
  currencyRecibida: any = "";
  idCurrencyRecibida: any;


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

    // Cargo imagen por defecto a mostrar en el intercambio
    this.selectedItemImageUrl = "assets/default.png";
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


  selectItem(item: any) {
    this.selectedItemImageUrl = `https://api.saldo.com.ar/img/sistemas2/${item.id}.big.png`;
    // Aquí puedes agregar lógica para actualizar el formulario con el valor del ítem seleccionado
  }

  setCurrencyRecibida(currencyRecibida: any){
    this.currencyRecibida = currencyRecibida.attributes.currency;
    this.idCurrencyRecibida = currencyRecibida.id
  }

  // Sea a: dinero enviado, b: dinero recibido convertido (ejemplo: envío 1 DAI -> recibo 1385,57 ARS)
  convertirMoneda(cantidadAConvertir: number, sistemaA: string, sistemaB: string): number | undefined | string{
    // Encuentra el objeto correspondiente en el array 'included'
    const rateObject = this.activos.included.find((item: any) => item.id === `${sistemaA}_${sistemaB}`);

    if (rateObject && rateObject.attributes && rateObject.attributes.price) {
      const price = rateObject.attributes.price;
      // Realiza la conversión de la moneda usando el precio encontrado
      const valorConvertido = cantidadAConvertir / price;
      return valorConvertido.toFixed(2);
    } else {
      // Si no se encuentra el objeto o no tiene el precio, devuelve undefined
      return "Introduce un sistema válido";
    }
  }



}
