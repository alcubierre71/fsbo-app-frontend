// Object Property
export interface PropertyElement {

    id?: number,
    userId: string,

    // Datos de la propiedad
    alias: string,
    propertyType: string,
    builtArea: number,  
    bedrooms: number,
    bathrooms: number,
    floor: number,
    condition: string, 
    description: string, 

    // Caracteristicas extras
    isExterior: boolean,
    hasElevator: boolean,
    hasParking: boolean,
    hasStorageRoom: boolean,
    hasAirConditioning: boolean,
    hasBalconyOrTerrace: boolean,
    hasPool: boolean,

    // Ubicacion
    country: string,
    region: string,
    province: string,
    city: string,
    district: string,
    neighborhood: string 
    
}
