import { PropertyElement } from "../components/property/property-element";
import { PropertyDto } from "./property-dto";

export class PropertyMapper {

 /**
   * Convertir Dto --> Element
   * @param dto 
   * @returns 
   */
  static mapToElement(data: PropertyDto): PropertyElement {

    let ret : PropertyElement = {
       id : data.propertyId,
        userId : data.userId,

        alias: data.alias,
        propertyType: data.propertyType, 
        builtArea: data.builtArea,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        floor: data.floor,
        condition: data.condition,
        description: data.description,

        isExterior: data.isExterior,
        hasElevator: data.hasElevator,
        hasParking: data.hasParking,
        hasStorageRoom: data.hasStorageRoom,
        hasAirConditioning: data.hasAirConditioning,
        hasBalconyOrTerrace: data.hasBalconyOrTerrace,
        hasPool: data.hasPool,

        country: data.country,
        region: data.region,
        province: data.province,
        city: data.city,
        district: data.district,
        neighborhood: data.neighborhood
    };

    return ret;

  }

  /**
   * Convertir Element --> Dto
   * @param element 
   * @returns 
   */
  static mapToDto(data: PropertyElement): PropertyDto {

    let ret : PropertyDto = {
        propertyId : data.id,
        userId : data.userId,

        alias: data.alias,
        propertyType: data.propertyType, 
        builtArea: data.builtArea,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        floor: data.floor,
        condition: data.condition,
        description: data.description,

        isExterior: data.isExterior,
        hasElevator: data.hasElevator,
        hasParking: data.hasParking,
        hasStorageRoom: data.hasStorageRoom,
        hasAirConditioning: data.hasAirConditioning,
        hasBalconyOrTerrace: data.hasBalconyOrTerrace,
        hasPool: data.hasPool,

        country: data.country,
        region: data.region,
        province: data.province,
        city: data.city,
        district: data.district,
        neighborhood: data.neighborhood
    };

    return ret;

  }

}
