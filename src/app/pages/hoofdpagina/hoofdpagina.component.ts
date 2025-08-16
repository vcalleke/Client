import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//imports en exports zodat de angular goed werkt
@Component({
  selector: 'app-hoofdpagina',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: `hoofdpagina.component.html`,
  
  styleUrls: ['./hoofdpagina.component.scss']
})
export class HoofdpaginaComponent {}
