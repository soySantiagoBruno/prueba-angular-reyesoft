import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemsJson } from '../models/systems-json';
import { map, Observable } from 'rxjs';
import { FullDescription } from '../models/full-description';

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
}
