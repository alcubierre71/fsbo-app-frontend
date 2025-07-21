import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContainer, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { PropertyService } from '../../../property/services/property.service';
import { ValuationDto } from '../../../valuation/services/valuation-dto';

@Component({
  selector: 'fsbo-confirm',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  
  // Inyecciones
  public dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);   // token que permite acceder a los datos del Dialog 
  public propertyService = inject(PropertyService);
  //public valuationService = inject(ValuationService); 

  /**
   * Cancelar Accion
   */
  onNotClick(): void {
    // Cerramos ventana
    this.dialogRef.close();
  }

  /**
   * Confirmar Accion Eliminar
   * --> Permite eliminar cualquier tipo de objeto de la aplicacion
   * --> Mercado, Empresa
   */
  onConfirm() {
    console.log("ConfirmComponent - onDelete - data: ", this.data);

    // Si en el Dialog hemos recibido algun id de objeto
    if (this.data != null) {

      // Tratamiento para borrado de objeto Mercado
      if (this.data.module == "delete-property") {
        console.log("Tratamiento para borrado de objeto Property");

        let obsPropertyDelete: Observable<void> = this.propertyService.deleteProperty(this.data.id);

        obsPropertyDelete.subscribe({
           next: (item:any) => {
             this.dialogRef.close(1);   // retorno correcto "1"
           }
           ,
           error: (error:any) => {
             this.dialogRef.close(2);   // retorno error "2"
           }

        });

      } else if (this.data.module == "delete-valuation") {
          // Tratamiento para borrado de objeto Empresa
          console.log("Tratamiento para borrado de objeto Valuation");

          //let obsValuationDelete: Observable<void> = this.valuationService.deleteValuation(this.data.id);
          let obsValuationDelete: Observable<void> = this.propertyService.deleteProperty(this.data.id);

          obsValuationDelete.subscribe({
            next: (item:any) => {
              this.dialogRef.close(1);   // retorno correcto "1"
            }
            ,
            error: (error:any) => {
              this.dialogRef.close(2);   // retorno error "2"
            }
  
          });

      } else if (this.data.module == "request-valuation-property") {
          // Tratamiento para peticion de valoracion de inmueble
          console.log("Tratamiento para peticion de valoracion de inmueble");

          let obsValuationProperty: Observable<ValuationDto> = this.propertyService.requestValuationProperty(this.data.id);

          obsValuationProperty.subscribe({ 
            next: (item:any) => {
              this.dialogRef.close(1);   // retorno correcto "1"
            }
            ,
            error: (error:any) => {
              this.dialogRef.close(2);   // retorno error "2"
            }
  
          });

      }

    } else {
      // No hemos recibido id en el Dialog 
      // cerramos y devolvemos retorno "2"
      this.dialogRef.close(2);
    }
  }

}
