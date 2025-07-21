import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Observer, Subscription } from 'rxjs';
import { PropertyElement } from '../components/property/property-element';
import { PropertyDto } from './property-dto';
import { PropertyMapper } from './property-mapper';
import { ValuationElement } from '../../valuation/components/valuation/valuation-element';
import { ValuationDto } from '../../valuation/services/valuation-dto';
import { ValuationMapper } from '../../valuation/services/valuation-mapper';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'http://localhost:8080/fsbo-app-api-property/api/property';

  //private mapper = inject(PropertyMapper);

  constructor(private http: HttpClient) {}

  // GET all assets
  getAllProperties(): Observable<PropertyElement[]> {

    let url : string = `${this.baseUrl}/user/user1/properties`;

    let obs : Observable<PropertyElement[]> = this.http.get<PropertyDto[]>(url).pipe(
      map((propertyDtos: PropertyDto[]) =>
        propertyDtos.map(dto => PropertyMapper.mapToElement(dto))
      )
    );

    return obs;

  }

  getAllPropertiesByUser(userId : number): Observable<PropertyElement[]> {

    let url : string = `${this.baseUrl}/user/${userId}/properties`;

    let obs : Observable<PropertyElement[]> = this.http.get<PropertyDto[]>(url).pipe(
      map((propertyDtos: PropertyDto[]) =>
        propertyDtos.map(dto => PropertyMapper.mapToElement(dto))
      )
    );

    return obs;

  }
 
  /**
   * Obtencion de propiedad a partir de su Id
   * @param propertyId    Id de la propiedad
   * @returns             Propiedad
   */
  getPropertyById(propertyId: number): Observable<PropertyElement> {

    // Invocamos a la API para obtener la Propiedad a partir del Id solicitado
    let url : string = `${this.baseUrl}/id/${propertyId}`;

    let obs : Observable<PropertyElement> = this.http.get<PropertyDto>(url).pipe(

      map( (dto: PropertyDto) => PropertyMapper.mapToElement(dto) )

    )

    return obs;
        
  }

  /**
   * Valoracion de una propiedad
   * @param idProperty   Id de la propiedad
   * @returns            Valoracion del inmueble
   */
  requestValuationProperty (idProperty: any): Observable<ValuationElement> {

    let property! : PropertyElement;
    let sub!: Subscription;  // Esto significa que la variable sera definida posteriormente

    // Invocamos a la API para obtener la Propiedad a partir del Id solicitado
    // La propiedad se carga en la variable "property"
    let obs1 : Observable<PropertyElement> = this.getPropertyById(idProperty);

    const iObserver: Observer<PropertyElement> = {
          next: (data: PropertyElement) => {
            property = data;
            console.log('Received Property from backend:', property);  // ← test this
            
          },
          error: (err: any) => {
            console.error('Error loading property:', err);
          },
          complete: () => {
            console.log('Property loading complete');
          }
    };
    
    sub = obs1.subscribe(iObserver);

    // Invocamos a la API para realizar la valoracion de la Propiedad solicitada ---> POST
    let url : string = `${this.baseUrl}/valuation`;

    let obs : Observable<ValuationElement> = this.http.post<ValuationDto>(url, property).pipe(
      
      map( (dto: ValuationDto) => ValuationMapper.mapToElement(dto) )
   
    );

    return obs;

  }


  deleteProperty(id: any): import("rxjs").Observable<void> {
    throw new Error('Method not implemented.');
  }


}
