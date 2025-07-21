
import { ValuationElement } from "../components/valuation/valuation-element";
import { ValuationDto } from "./valuation-dto";

export class ValuationMapper {

    /**
     * Convertir Dto --> Element
     * @param dto 
     * @returns 
     */
    static mapToElement(data: ValuationDto): ValuationElement {
    
        let ret : ValuationElement = {

            id: data.valuationId,
            propertyId : data.propertyId,
            userId : data.userId,
    
            minSalePrice: data.minSalePrice,
            maxSalePrice: data.maxSalePrice,
            minRentalPrice: data.minRentalPrice,
            maxRentalPrice: data.maxRentalPrice,

            valuationDate: data.valuationDate 
            
        };
    
        return ret;
    
    }
    
    /**
     * Convertir Element --> Dto
     * @param element 
     * @returns 
     */
    static mapToDto(data: ValuationElement): ValuationDto {

        let ret : ValuationDto = {

            valuationId: data.id,
            propertyId : data.propertyId,
            userId : data.userId,
    
            minSalePrice: data.minSalePrice,
            maxSalePrice: data.maxSalePrice,
            minRentalPrice: data.minRentalPrice,
            maxRentalPrice: data.maxRentalPrice,

            valuationDate: data.valuationDate  

        };

        return ret;

    }


}
