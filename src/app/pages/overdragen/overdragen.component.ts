import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overdragen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overdragen.component.html',
  styleUrls: ['./overdragen.component.scss']
})
export class OverdragenComponent {
  ticketNumber: string = '';
  fromEmail: string = '';
  toEmail: string = '';
  transferSuccess: boolean = false;
  transferError: string = '';

  submitTransfer() {
    this.transferSuccess = false;
    this.transferError = '';
    // Simuleer backend call
    if (!this.ticketNumber || !this.fromEmail || !this.toEmail) {
      this.transferError = 'Vul alle velden correct in.';
      return;
    }
    // Simuleer succesvolle overdracht
    setTimeout(() => {
      if (this.ticketNumber === '12345') {
        this.transferError = 'Dit ticket is al overgedragen of ongeldig.';
      } else {
        this.transferSuccess = true;
        this.transferError = '';
        // Reset form
        this.ticketNumber = '';
        this.fromEmail = '';
        this.toEmail = '';
      }
    }, 800);
  }
}
