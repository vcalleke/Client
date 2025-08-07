import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hoofdpagina',
  standalone: true,
  imports: [RouterModule],
  template: `
  <header class="app-header">
    <h1>Hoofdpagina</h1>
  </header>
    <div class="page-container">
      <div class="section">
       
        <p>Kies een actie om verder te gaan:</p>
        <div class="button-group">
          <button class="btn btn-primary" routerLink="/bestellen">Bestellen</button>
          <button class="btn btn-primary" routerLink="/overdragen">Overdragen</button>
          <button class="btn btn-primary" routerLink="/vervoersgegevens">Vervoersgegevens</button>
        </div>
      </div>
    </div>
  `
})
export class HoofdpaginaComponent {}
