import { Injectable } from '@angular/core';
import { ValuationElement } from '../components/valuation/valuation-element';
import { map, Observable } from 'rxjs';
import { ValuationDto } from './valuation-dto';
import { ValuationMapper } from './valuation-mapper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {

    private baseUrl = 'http://localhost:8080/fsbo-app-api-property/api/property/user';
  
    //private mapper = inject(ValuationPropertyMapper);
  
    constructor(private http: HttpClient) {}
  
    // Obtener todos los registros
    getAllValuations(): Observable<ValuationElement[]> {
  
      let url : string = `${this.baseUrl}/user1/valuations`;
  
      let obs : Observable<ValuationElement[]> = this.http.get<ValuationDto[]>(url).pipe(
        map((valuationDtos: ValuationDto[]) =>
          valuationDtos.map(dto => ValuationMapper.mapToElement(dto))
        )
      );
  
      return obs;
  
    }
  
    // Obtener registros de un usuario concreto
    getAllValuationsByUser(userId : number): Observable<ValuationElement[]> {
  
      let url : string = `${this.baseUrl}/${userId}/properties`;
  
      let obs : Observable<ValuationElement[]> = this.http.get<ValuationDto[]>(url).pipe(
        map((valuationDtos: ValuationDto[]) =>
          valuationDtos.map(dto => ValuationMapper.mapToElement(dto))
        )
      );
  
      return obs;
  
    }
    
    // Eliminar registro
    deleteValuation(id: any): import("rxjs").Observable<void> {
      throw new Error('Method not implemented.');
    }

}
