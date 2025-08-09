
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface MyEvent {
  id: number;
  name: string;
  ticketTypes: TicketType[];
}

interface TicketType {
  id: number;
  name: string;
  max: number;
}

interface Ticket {
  ticketTypeId: number;
  ticketTypeName: string;
  holder: TicketHolder;
}

interface TicketHolder {
  email: string;
  vervoerswijze: string;
  woonplaats: string;
  aankomsttijd: string;
  vertrektijd: string;
  drankbonnen: number;
  maaltijdvouchers: number;
}

@Component({
  selector: 'app-bestellen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.scss']
})
export class BestellenComponent {
  events: MyEvent[] = [
    {
      id: 1,
      name: 'Festival A',
      ticketTypes: [
        { id: 1, name: 'Standaard', max: 3 },
        { id: 2, name: 'VIP', max: 2 }
      ]
    },
    {
      id: 2,
      name: 'Festival B',
      ticketTypes: [
        { id: 3, name: 'Regular', max: 4 },
        { id: 4, name: 'Premium', max: 1 }
      ]
    }
  ];

  selectedEvent: MyEvent | null = null;
  tickets: Ticket[] = [];

  selectEvent(eventId: number) {
    this.selectedEvent = this.events.find(e => e.id === +eventId) || null;
    this.tickets = [];
  }

  getTicketCount(ticketTypeId: number): number {
    return this.tickets.filter(t => t.ticketTypeId === ticketTypeId).length;
  }

  canAddTicket(ticketType: TicketType): boolean {
    return this.getTicketCount(ticketType.id) < ticketType.max;
  }

  addTicket(ticketType: TicketType) {
    if (!this.canAddTicket(ticketType)) return;
    this.tickets.push({
      ticketTypeId: ticketType.id,
      ticketTypeName: ticketType.name,
      holder: {
        email: '',
        vervoerswijze: '',
        woonplaats: '', 
        aankomsttijd: '',
        vertrektijd: '',
        drankbonnen: 0,
        maaltijdvouchers: 0
      }
    });
  }

  removeTicket(index: number) {
    this.tickets.splice(index, 1);
  }

  isEmailUnique(email: string, index: number): boolean {
    return this.tickets.filter((t, i) => t.holder.email === email && i !== index).length === 0;
  }
}
