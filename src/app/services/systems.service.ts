import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemsJson } from '../models/systems-json';
import { map, Observable } from 'rxjs';
import { FullDescription } from '../models/full-description';
import { SistemasCarga } from '../models/sistemas-carga';

@Injectable({
  providedIn: 'root',
})
export class SystemsService {
  apiUrl: string = 'https://api.saldo.com.ar/v3';

  constructor(private http: HttpClient) {}

  // Cargo las descripciones a un array. Estas incluyen description, pros y cons
  // Notar el tipo string|undefined para el caso de no encontrarse un valor de description
  descriptionsToArray(): Observable<(FullDescription | undefined)[]> {
    return this.http
      .get<SystemsJson>(`${this.apiUrl}/systems?include=system_information`)
      .pipe(
        map((data: SystemsJson) => {
          let descripciones: (FullDescription | undefined)[] = [];
          const cantidadSystems = data.data.length;
          let indexIncluded: number = 0;

          for (let index = 0; index < cantidadSystems; index++) {
            let alternativeNameEnData = data.data[index].attributes.alternative_name.toUpperCase();
            let alternativeNameEnIncluded = data.included[indexIncluded].attributes.alternative_name.toUpperCase();

            let fullDescription: FullDescription = {
              description: '',
              pros: '',
              cons: ''
            }

            if (alternativeNameEnData === alternativeNameEnIncluded) {
              fullDescription.description = data.included[indexIncluded].attributes.description;
              fullDescription.pros = data.included[indexIncluded].attributes.pros;
              fullDescription.cons = data.included[indexIncluded].attributes.cons;
              
              descripciones.push(fullDescription);

              indexIncluded++;
            } else {
              descripciones.push(undefined); // Cambiado a undefined
            }
          }

          return descripciones;
        })
      );
  }



  
  // CARGA DE SISTEMAS

  // cargo los activos
  activos: any = {};
  activosFiltrados: any = {};
  currencies: string[] = [];
  // por default el filtro se establece en Todos (no filtra)
  currencySelected: string= 'Todos'

  cargarSystems(): Observable<any>{

    return this.http
    .get('https://api.saldo.com.ar/v3/systems?include=rates,system_information')
    .pipe(
      map((data: any) =>{   

        //Cargo los activos
        this.activos=data;      

        // A partir de this.activos, extraigo las currencies disponibles para poder armar el filtro
        this.currencies = Array.from(new Set(this.activos.data.map((item: any) => item.attributes.currency)));

        // agrega la opción "Todos" para usar en el filtro
        this.currencies.unshift("Todos")
        
        
        let sistemasCarga: SistemasCarga = {
          currencies: this.currencies,
          activos: this.activos,
          currencySelected: this.currencySelected
        };

        return sistemasCarga;
      })
    )
  }


}
