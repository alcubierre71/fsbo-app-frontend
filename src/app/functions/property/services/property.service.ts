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
   * Valoracion de una propiedad <------------------------ OLD VERSION
   * @param idProperty   Id de la propiedad
   * @returns            Valoracion del inmueble
   */
  // requestValuationProperty_Old (idProperty: any): Observable<ValuationElement> {

  //   let property! : PropertyElement;
  //   let sub!: Subscription;  // Esto significa que la variable sera definida posteriormente

  //   // Invocamos a la API para obtener la Propiedad a partir del Id solicitado
  //   // La propiedad se carga en la variable "property"
  //   let obs1 : Observable<PropertyElement> = this.getPropertyById(idProperty);

  //   const iObserver: Observer<PropertyElement> = {
  //         next: (data: PropertyElement) => {
  //           property = data;
  //           console.log('Received Property from backend:', property);  // ← test this
            
  //         },
  //         error: (err: any) => {
  //           console.error('Error loading property:', err);
  //         },
  //         complete: () => {
  //           console.log('Property loading complete');
  //         }
  //   };
    
  //   sub = obs1.subscribe(iObserver);

  //   // Invocamos a la API para realizar la valoracion de la Propiedad solicitada ---> POST
  //   let url : string = `${this.baseUrl}/valuation`;

  //   let obs2 : Observable<ValuationElement> = this.http.post<ValuationDto>(url, property).pipe(
      
  //     map( (dto: ValuationDto) => ValuationMapper.mapToElement(dto) )
   
  //   );

  //   return obs2;

  // }


  /**
   * Valoracion de una propiedad
   * @param idProperty   Id de la propiedad
   * @returns            Valoracion del inmueble
   */
  requestValuationProperty (idProperty: any): Observable<ValuationElement> {

      // 1. PRIMER OBSERVABLE: Obtener la propiedad por ID
    const propertyObservable$: Observable<PropertyElement> = this.getPropertyById(idProperty);
    
    // 2. SEGUNDO OBSERVABLE (creado dinamicamente): El resultado final
    const valuationObservable$: Observable<ValuationElement> = new Observable<ValuationElement>((observer) => {
      
      // 3. OBSERVER para el primer Observable (obtener propiedad)
      const propertyObserver: Observer<PropertyElement> = {
        next: (property: PropertyElement) => {
          console.log('Received Property from backend:', property);
          
          let propertyDto : PropertyDto = PropertyMapper.mapToDto(property);

          // 4. TERCER OBSERVABLE: Realizar la valoración (HTTP POST)
          const url = `${this.baseUrl}/valuation`;
          const httpPostObservable$: Observable<ValuationDto> = this.http.post<ValuationDto>(url, propertyDto);
          
          // 5. CUARTO OBSERVABLE: Mapear DTO del anterior observable a Element
          const mappedValuationObservable$: Observable<ValuationElement> = httpPostObservable$.pipe(
            map((dto: ValuationDto) => ValuationMapper.mapToElement(dto))
          );
          
          // 6. OBSERVER para el Observable de valoración mapeado
          const valuationObserver: Observer<ValuationElement> = {
            next: (valuationElement: ValuationElement) => {
              // Emitir el resultado final al observer principal
              observer.next(valuationElement);
            },
            error: (error: any) => {
              console.error('Error in valuation HTTP request:', error);
              observer.error(error);
            },
            complete: () => {
              console.log('Valuation HTTP request completed');
              observer.complete();
            }
          };
          
          // 7. Suscribirse al Observable de valoracion
          mappedValuationObservable$.subscribe(valuationObserver);
        },
        
        error: (error: any) => {
          console.error('Error getting property by ID:', error);
          observer.error(error);
        },
        
        complete: () => {
          console.log('Property retrieval completed');
          // Nota: No llamamos observer.complete() aquí porque 
          // el complete final debe venir del segundo observable
        }
      };
      
      // 8. Suscribirse al Observable de propiedad
      propertyObservable$.subscribe(propertyObserver);
      
    });
    
    return valuationObservable$;

  }

    // POST save new property
  saveProperty (data: PropertyElement): Observable<void> {

    let dataDto : PropertyDto = PropertyMapper.mapToDto(data);

    let obs: Observable<void> = this.http.post<void>(`${this.baseUrl}/save`, dataDto);

    return obs;
  }

  // PUT update property
  updateProperty(data: PropertyElement): Observable<PropertyElement> {
    
    let dataDto: PropertyDto = PropertyMapper.mapToDto(data);
    let propertyId: number | undefined = dataDto.propertyId;

    let obs: Observable<PropertyElement> = this.http.put<PropertyDto>(`${this.baseUrl}/update/${propertyId}`, dataDto).pipe(
      map(updatedDto => PropertyMapper.mapToElement(updatedDto))
    );

    return obs;

  }

  deleteProperty(id: any): import("rxjs").Observable<void> {
    throw new Error('Method not implemented.');
  }


}
