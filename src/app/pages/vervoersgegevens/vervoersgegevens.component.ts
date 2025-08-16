
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TicketService, VervoersGegevens } from '../../services/ticket.service';


@Component({
  selector: 'app-vervoersgegevens',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './vervoersgegevens.component.html',
  styleUrls: ['./vervoersgegevens.component.scss']
})
export class VervoersgegevensComponent {
  ticketnummer: string = '';
  gegevens: VervoersGegevens | null = null;
  ophalenError: string = '';
  bijwerkenSuccess: boolean = false;
  bijwerkenError: string = '';
  loading: boolean = false;

  constructor(private ticketService: TicketService) {}
//hier haal ik de vervoersgegevens op
  ophalen() {
    this.ophalenError = '';
    this.bijwerkenSuccess = false;
    this.bijwerkenError = '';
    this.loading = true;
    this.ticketService.getVervoersGegevens(this.ticketnummer).subscribe({
      next: (res) => {
        this.gegevens = res.vervoersgegevens;
        this.loading = false;
      },
      error: (err) => {
        this.gegevens = null;
        this.ophalenError = 'Ticketnummer niet gevonden.';
        this.loading = false;
      }
    });
  }
// hier werk ik de gegevens bij
  bijwerken() {
    this.bijwerkenSuccess = false;
    this.bijwerkenError = '';
    if (!this.gegevens) return;
    this.ticketService.updateVervoersGegevens(this.ticketnummer, this.gegevens).subscribe({
      next: () => {
        this.bijwerkenSuccess = true;
      },
      error: () => {
        this.bijwerkenError = 'Bijwerken mislukt.';
      }
    });
  }
}
