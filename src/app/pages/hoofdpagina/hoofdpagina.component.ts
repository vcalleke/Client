import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hoofdpagina',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Hoofdpagina</h1>
    <button routerLink="/bestellen">Bestellen</button>
    <button routerLink="/overdragen">Overdragen</button>
    <button routerLink="/vervoersgegevens">Vervoersgegevens</button>
  `
})
export class HoofdpaginaComponent {}
