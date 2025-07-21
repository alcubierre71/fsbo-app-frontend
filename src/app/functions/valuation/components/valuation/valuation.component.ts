import { Component, inject, ViewChild } from '@angular/core';
import { ValuationService } from '../../services/valuation.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ValuationElement } from './valuation-element';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Observer, Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'fsbo-valuation',
  standalone: true,
  imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        HttpClientModule
  ],
  templateUrl: './valuation.component.html',
  styleUrl: './valuation.component.css'
})
export class ValuationComponent {

     // Inyectamos el Servicio de Assets
    private valuationService = inject(ValuationService);
    public  dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);
  
    private router = inject(Router);
  
    displayedColumns: string[] = ['id', 'propertyId', 'minSalePrice', 'maxSalePrice', 'minRentalPrice', 'maxRentalPrice', 
                                  'valuationDate', 'actions'];
    data: any[] = [];
    dataSource!: MatTableDataSource<ValuationElement>;
    sub!: Subscription;  // Esto significa que la variable sera definida posteriormente
  
    // Obtencion de referencia del componente <mat-paginator> del DOM 
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    
    // Obtencion de referencia del componente MatSort del DOM 
    @ViewChild(MatSort)
    sort!: MatSort;
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      console.log("Starting Valuation Page ... ");
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
  
      console.log('Valuation - loadData');
  
      //this.http
      //  .get<any[]>('http://localhost:7070/api/asset_price_store/asset')
      //  .subscribe((data) => (this.assets = data));
  
      let valuationObsGetAll : Observable<ValuationElement[]> = this.valuationService.getAllValuations();
  
      const iObserver: Observer<ValuationElement[]> = {
        next: (data: ValuationElement[]) => {
          this.data = data;
          console.log('Received valuations from backend:', this.data);  // ← test this
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;   // paginacion
          this.dataSource.sort = this.sort;             // ordenacion
        },
        error: (err: any) => {
          console.error('Error loading valuations:', err);
        },
        complete: () => {
          console.log('Valuation loading complete');
        }
      };
      
      this.sub = valuationObsGetAll.subscribe(iObserver);
  
    }
  
    // Editar registro
    onEdit(id: number): void {
      console.log('Edit valuation with ID:', id);
      // Navigate or open a form here
      this.router.navigate(['/valuations/update', id]);
    }
  
    // Eliminar registro
    onDelete(id1: number): void {
      console.log('Delete valuation with ID:', id1);
  
      // Se abre un Dialog que contiene en su interior el componente ConfirmComponent
      const dialogRef = this.dialog.open(ConfirmComponent, {
       width: '450px',   // ancho de la ventana del dialog
       data: {id: id1, module: "delete-valuation"}, // se indica el tipo de objeto a eliminar
      });
  
      // Call API to delete here
      // Logica a ejecutar una vez se haya cerrado la ventana Dialog
      dialogRef.afterClosed().subscribe( (result: any) => {
        console.log('The dialog was closed');
          
        // Controlamos el retorno correcto o error
        if (result == 1) {
          this.openSnackBar("Valuation deleted", "Exito");
          // Recargamos la tabla de registros
          this.loadData();
        } else if (result == 2) {
          this.openSnackBar("Error deleting the valuation", "Error");
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
