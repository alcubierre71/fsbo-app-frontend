import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PropertyElement } from '../components/property/property-element';
import { PropertyDto } from './property-dto';
import { PropertyMapper } from './property-mapper';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'http://localhost:8080/fsbo-app-api-property/api/property/user';

  //private mapper = inject(PropertyMapper);

  constructor(private http: HttpClient) {}

  // GET all assets
  getAllProperties(): Observable<PropertyElement[]> {

    let url : string = `${this.baseUrl}/user1/properties`;

    let obs : Observable<PropertyElement[]> = this.http.get<PropertyDto[]>(url).pipe(
      map((propertyDtos: PropertyDto[]) =>
        propertyDtos.map(dto => PropertyMapper.mapToElement(dto))
      )
    );

    return obs;

  }


  getAllPropertiesByUser(userId : number): Observable<PropertyElement[]> {

    let url : string = `${this.baseUrl}/${userId}/properties`;

    let obs : Observable<PropertyElement[]> = this.http.get<PropertyDto[]>(url).pipe(
      map((propertyDtos: PropertyDto[]) =>
        propertyDtos.map(dto => PropertyMapper.mapToElement(dto))
      )
    );

    return obs;

  }
  
  deleteProperty(id: any): import("rxjs").Observable<void> {
    throw new Error('Method not implemented.');
  }

  //  /**
  //  * Convertir Dto --> Element
  //  * @param dto 
  //  * @returns 
  //  */
  // public mapToElement(data: PropertyDto): PropertyElement {

  //   let ret : PropertyElement = {
  //      id : data.propertyId,
  //       userId : data.userId,

  //       alias: data.alias,
  //       propertyType: data.propertyType, 
  //       builtArea: data.builtArea,
  //       bedrooms: data.bedrooms,
  //       bathrooms: data.bathrooms,
  //       floor: data.floor,
  //       condition: data.condition,
  //       description: data.description,

  //       isExterior: data.isExterior,
  //       hasElevator: data.hasElevator,
  //       hasParking: data.hasParking,
  //       hasStorageRoom: data.hasStorageRoom,
  //       hasAirConditioning: data.hasAirConditioning,
  //       hasBalconyOrTerrace: data.hasBalconyOrTerrace,
  //       hasPool: data.hasPool,

  //       country: data.country,
  //       region: data.region,
  //       province: data.province,
  //       city: data.city,
  //       district: data.district,
  //       neighborhood: data.neighborhood
  //   };

  //   return ret;

  // }

  //   /**
  //  * Convertir Element --> Dto
  //  * @param element 
  //  * @returns 
  //  */
  // public mapToDto(data: PropertyElement): PropertyDto {

  //   let ret : PropertyDto = {
  //       propertyId : data.id,
  //       userId : data.userId,

  //       alias: data.alias,
  //       propertyType: data.propertyType, 
  //       builtArea: data.builtArea,
  //       bedrooms: data.bedrooms,
  //       bathrooms: data.bathrooms,
  //       floor: data.floor,
  //       condition: data.condition,
  //       description: data.description,

  //       isExterior: data.isExterior,
  //       hasElevator: data.hasElevator,
  //       hasParking: data.hasParking,
  //       hasStorageRoom: data.hasStorageRoom,
  //       hasAirConditioning: data.hasAirConditioning,
  //       hasBalconyOrTerrace: data.hasBalconyOrTerrace,
  //       hasPool: data.hasPool,

  //       country: data.country,
  //       region: data.region,
  //       province: data.province,
  //       city: data.city,
  //       district: data.district,
  //       neighborhood: data.neighborhood
  //   };

  //   return ret;

  // }

}
