import { Component, inject, OnInit } from '@angular/core';
import { PropertyElement } from '../property/property-element';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParsedPropertyType } from '@angular/compiler';
import { MatToolbar } from "@angular/material/toolbar";
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { Observable, Observer } from 'rxjs';
import { PropertyDto } from '../../services/property-dto';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'fsbo-new-property',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatButtonModule,
    RouterModule
],
  templateUrl: './new-property.component.html',
  styleUrl: './new-property.component.css'
})
export class NewPropertyComponent implements OnInit {

  // Atributo para indicar si el Dialog va a ser Crear Activo o Actualizar Activo
  estadoFormulario: string = "";

  properties: PropertyElement[] = [];
  propertyId!: string;
  userId!: string;
  
  selectedFile: any;
  nombreImg: string = "";
  errorMessage: string = "";
  
  // Objeto para trabajar con el Formulario de la ventana
  // ---> se utiliza en el form del html 
  public registrationForm!: FormGroup;
  
  // Inyeccion de dependencias
  private fb = inject(FormBuilder);
  //private mercadoService = inject(MercadoService);
  private propertyService = inject(PropertyService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  //private dialogRef = inject(MatDialogRef);
  //public data = inject(MAT_DIALOG_DATA);   // token que permite acceder a los datos del Dialog

  ngOnInit(): void {
  
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.userId = 'user1';
    
    console.log("NewPropertyComponent - ngOnInit");
    //console.log("data: ", this.data);
    console.log("clave: ", this.propertyId);
  
    // Construccion del formulario con la estructura indicada
    // Inicialmente, al crear mostramos el formulario con los campos vacios 
    this.registrationForm = this.fb.group({
      alias: ['piloto pinar chamartin', Validators.required],          // valor por defecto y validacion requerida
      propertyType: ['piso', Validators.required],
      builtArea: ['100', Validators.required],
      bedrooms: ['3', Validators.required],
      bathrooms: ['2', Validators.required],
      floor: ['3', Validators.required],
      condition: ['new', Validators.required],
      description: ['piso piloto pinar chamartin', Validators.required],
      //
      isExterior: ['true', Validators.required],
      hasElevator: ['true', Validators.required],
      hasParking: ['true', Validators.required],
      hasStorageRoom: ['false', Validators.required],
      hasAirConditioning: ['true', Validators.required],
      hasBalconyOrTerrace: ['false', Validators.required],
      hasPool: ['true', Validators.required],
      //
      country: ['españa', Validators.required],
      region: ['madrid', Validators.required],
      province: ['madrid', Validators.required], 
      city: ['madrid', Validators.required], 
      district: ['ciudad lineal', Validators.required], 
      neighborhood: ['costillares', Validators.required], 
    });
  
    //console.log("empresaForm: ", this.empresaForm);
  
    // Obtenemos todas los mercados disponibles para el combo de Mercados del formulario de Nueva Empresa
    //this.obtenerMercados();
  
    this.estadoFormulario = "Create";
  
    // Si el Dialog viene con datos, es que hemos entrado en la ventana Modificar y no en la ventana Crear
    // Los datos que vienen corresponden a la info actual que tiene el registro
    // Por tanto, la ventana Dialog se abrira mostrando en el formulario los datos actuales
    //if (this.data.clave != null) {
    //  console.log(" *** Funcionalidad Modificar *** ");
      //this.estadoFormulario = "Actualizar";
    //} else {
      //console.log(" *** Funcionalidad Agregar *** ");
    //}
  
    //this.assetId = this.route.snapshot.paramMap.get('id')!;

    if (this.propertyId != null) {
      console.log(" *** Funcionalidad Modificar *** ");
      //this.updateForm(this.propertyId);
      this.estadoFormulario = "Update";
    } else {
      console.log(" *** Funcionalidad Agregar *** ");
    }

  }

  /**
   * Edicion de la nueva Propiedad
   */
  onSubmit(): void {

    if (this.propertyId != null) {
      // Funcionalidad Actualizar 
      let propertyId : any = this.propertyId;
      let userId: any = this.userId;

      let propertyElement: PropertyElement = this.registrationForm.value;
      propertyElement.id = propertyId;
      propertyElement.userId = userId;

      let assetObs : Observable<PropertyDto> = this.propertyService.updateProperty(propertyElement);

      let iObserver : Observer<PropertyDto> = {
        next: () => this.router.navigate(['/properties']),
        error: (err) => console.error('Error saving property', err),
        complete: function (): void {
          console.log("Function not implemented.");
        }     
      }

      assetObs.subscribe(iObserver);

    } else {
      // Funcionalidad Crear 
      let userId: any = this.userId;
      if (this.registrationForm.valid) {

        let propertyElement : PropertyElement = this.registrationForm.value;
        propertyElement.userId = userId;

        this.propertyService.saveProperty(propertyElement).subscribe({
          next: () => this.router.navigate(['/properties']),
          error: (err) => console.error('Error saving property', err)
        });
      }
    }
  }

}
