// property.component.ts
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PropertyElement } from './property-element';
import { Router, RouterModule } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'fsbo-property',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

   // Inyectamos el Servicio de Assets
  private propertyService = inject(PropertyService);
  public  dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  private router = inject(Router);

  displayedColumns: string[] = ['id', 'alias', 'propertyType', 'builtArea', 'bedrooms', 'exterior', 
                                'country', 'province', 'city', 'district', 'neighborhood', 'actions'];
  data: any[] = [];
  dataSource!: MatTableDataSource<PropertyElement>;
  sub!: Subscription;  // Esto significa que la variable sera definida posteriormente

  // Obtencion de referencia del componente <mat-paginator> del DOM 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  // Obtencion de referencia del componente MatSort del DOM 
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("Starting Property Page ... ");
    this.loadData();
    console.log('Received data from loadData:', this.data);  // ← test this
  }

  // Ejecucion despues del inicio
  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.assets);
    //this.dataSource.paginator = this.paginator;   // paginacion
    //this.dataSource.sort = this.sort;             // ordenacion
  }

  loadData(): void {

    console.log('Property - loadData');

    //this.http
    //  .get<any[]>('http://localhost:7070/api/asset_price_store/asset')
    //  .subscribe((data) => (this.assets = data));

    let propertyObsGetAll : Observable<PropertyElement[]> = this.propertyService.getAllProperties();

    const iObserver: Observer<PropertyElement[]> = {
      next: (data: PropertyElement[]) => {
        this.data = data;
        console.log('Received properties from backend:', this.data);  // ← test this
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;   // paginacion
        this.dataSource.sort = this.sort;             // ordenacion
      },
      error: (err: any) => {
        console.error('Error loading properties:', err);
      },
      complete: () => {
        console.log('Property loading complete');
      }
    };
    
    this.sub = propertyObsGetAll.subscribe(iObserver);

  }

  // Solicitar Valoracion del inmueble
  onValuation(id1: number): void {
    console.log('Request valuation property with ID:', id1);

    // Se abre un Dialog que contiene en su interior el componente ConfirmComponent
    const dialogRef = this.dialog.open(ConfirmComponent, {
     width: '450px',   // ancho de la ventana del dialog
     data: {id: id1, module: "request-valuation-property"}, // se indica la accion a realizar
    });

    // Call API here
    // Logica a ejecutar una vez se haya cerrado la ventana Dialog
    dialogRef.afterClosed().subscribe( (result: any) => {
      console.log('The dialog was closed');
        
      // Controlamos el retorno correcto o error
      if (result == 1) {
        this.openSnackBar("Property valuated", "Exito");
        // Recargamos la tabla de registros
        this.loadData();
      } else if (result == 2) {
        this.openSnackBar("Error valuating the property", "Error");
      }
  
    });

  }

  // Editar registro
  onEdit(id: number): void {
    console.log('Edit property with ID:', id);
    // Navigate or open a form here
    this.router.navigate(['/properties/update', id]);
  }

  // Eliminar registro
  onDelete(id1: number): void {
    console.log('Delete property with ID:', id1);

    // Se abre un Dialog que contiene en su interior el componente ConfirmComponent
    const dialogRef = this.dialog.open(ConfirmComponent, {
     width: '450px',   // ancho de la ventana del dialog
     data: {id: id1, module: "delete-property"}, // se indica el tipo de objeto a eliminar
    });

    // Call API to delete here
    // Logica a ejecutar una vez se haya cerrado la ventana Dialog
    dialogRef.afterClosed().subscribe( (result: any) => {
      console.log('The dialog was closed');
        
      // Controlamos el retorno correcto o error
      if (result == 1) {
        this.openSnackBar("Property deleted", "Exito");
        // Recargamos la tabla de registros
        this.loadData();
      } else if (result == 2) {
        this.openSnackBar("Error deleting the property", "Error");
      }
  
    });

  }

  /**
   * Abrir mensaje en una ventana
   * --- Esto podria estar en el modulo shared --- 
   */
  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {

      return this.snackBar.open(message, action, {duration: 2000});
  
  }

}
