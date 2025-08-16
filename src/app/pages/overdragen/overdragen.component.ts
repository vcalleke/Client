import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//hier wijzig ik de eigenaar van ticketen bij de overdragen van eigenaars
@Component({
  selector: 'app-overdragen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './overdragen.component.html',
  styleUrls: ['./overdragen.component.scss']
})
export class OverdragenComponent {
  ticketNumber: string = '';
  fromEmail: string = '';
  toEmail: string = '';
  transferSuccess: boolean = false;
  transferError: string = '';

  constructor(private http: HttpClient) {}

  submitTransfer() {
    this.transferSuccess = false;
    this.transferError = '';
    if (!this.ticketNumber || !this.fromEmail || !this.toEmail) {
      this.transferError = 'Vul alle velden correct in.';
      return;
    }
//geeft aan wanneer de overdracht succesvol is of niet
    this.http.post('/api/tickets/transfer', {
      ticketNumber: this.ticketNumber,
      fromEmail: this.fromEmail,
      toEmail: this.toEmail
    }).subscribe({
      next: () => {
        this.transferSuccess = true;
        this.transferError = '';
        // Reset form
        this.ticketNumber = '';
        this.fromEmail = '';
        this.toEmail = '';
      },
      error: (err) => {
        this.transferError = err.error?.error || 'Overdracht mislukt. Probeer opnieuw.';
      }
    });
  }
}
