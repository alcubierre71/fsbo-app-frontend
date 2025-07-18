import { Routes } from '@angular/router';
import { HomeComponent } from './functions/dashboard/components/home/home.component';
import { PropertyComponent } from './functions/property/components/property/property.component';
import { ValuationComponent } from './functions/valuation/components/valuation/valuation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'properties', component: PropertyComponent },
  //{ path: 'properties/create', component: NewAssetComponent},
  //{ path: 'properties/update/:id', component: NewAssetComponent},
  { path: 'valuations', component: ValuationComponent }
];
