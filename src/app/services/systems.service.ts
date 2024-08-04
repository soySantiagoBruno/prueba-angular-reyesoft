import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemsJson } from '../models/systems-json';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemsService {

  apiUrl: string = 'https://api.saldo.com.ar/v3';

  constructor(private http: HttpClient) { }

  // Cargo las descripciones a un array
  // Notar el tipo string|undefined para el caso de no encontrarse un valor de description
  descriptionsToArray(): Observable<(string|undefined)[]> {
    return this.http.get<SystemsJson>(`${this.apiUrl}/systems?include=system_information`).pipe(
      map((data: SystemsJson) => {
        let descripciones: (string | undefined)[] = [];
        const cantidadSystems = data.data.length;
        let indexIncluded: number = 0;
  
        for (let index = 0; index < cantidadSystems; index++) {
          let alternativeNameEnData = data.data[index].attributes.alternative_name.toUpperCase();
  
          if (indexIncluded < data.included.length) {
            let alternativeNameEnIncluded = data.included[indexIncluded].attributes.alternative_name.toUpperCase();
  
            if (alternativeNameEnData === alternativeNameEnIncluded) {
              descripciones.push(data.included[indexIncluded].attributes.description);
              indexIncluded++;
            } else {
              descripciones.push(undefined); // Cambiado a undefined
            }
          } else {
            descripciones.push(undefined); // Cambiado a undefined
          }
        }
  
        return descripciones;
      })
    );
  }
  

}