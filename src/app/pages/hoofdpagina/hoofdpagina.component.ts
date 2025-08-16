import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hoofdpagina',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: `hoofdpagina.component.html`,
  
  styleUrls: ['./hoofdpagina.component.scss']
})
export class HoofdpaginaComponent {}
