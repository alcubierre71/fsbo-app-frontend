// Object Valuation Dto
export interface ValuationDto {

    valuationId?: number,
    propertyId: number,
    userId: string,

    // Precios de la valoracion
    minSalePrice: number,
    maxSalePrice: number,
    minRentalPrice: number,
    maxRentalPrice: number,

    valuationDate: Date 

}
