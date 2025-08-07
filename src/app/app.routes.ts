import { Routes } from '@angular/router';
import { HoofdpaginaComponent } from './pages/hoofdpagina/hoofdpagina.component';
import { BestellenComponent } from './pages/bestellen/bestellen.component';
import { OverdragenComponent } from './pages/overdragen/overdragen.component';
import { VervoersgegevensComponent } from './pages/vervoersgegevens/vervoersgegevens.component';

export const appRoutes: Routes = [
  { path: '', component: HoofdpaginaComponent },
  { path: 'bestellen', component: BestellenComponent },
  { path: 'overdragen', component: OverdragenComponent },
  { path: 'vervoersgegevens', component: VervoersgegevensComponent },
];
