
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
  bestellerEmail: string = '';
  orderSuccess: boolean = false;
  orderNummer: string = '';
  bevestigdeTickets: { ticketNummer: string, type: string, email: string }[] = [];

  selectEvent(event: Event) {
    const eventId = (event.target as HTMLSelectElement).value;
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

  getTotaalPrijs(): number {
    // Voorbeeldprijzen per type, pas aan naar wens
    const prijzen: { [key: number]: number } = {
      1: 50, // Standaard
      2: 120, // VIP
      3: 60, // Regular
      4: 150 // Premium
    };
    return this.tickets.reduce((sum, t) => sum + (prijzen[t.ticketTypeId] || 0), 0);
  }

  isOrderValid(): boolean {
    // Alle e-mails moeten uniek en ingevuld zijn
    return this.tickets.every((t, i) => t.holder.email && this.isEmailUnique(t.holder.email, i));
  }

  bestel() {
    // Simuleer backend call en unieke nummers
    this.orderNummer = 'ORD-' + Math.floor(Math.random() * 1000000);
    this.bevestigdeTickets = this.tickets.map((t, i) => ({
      ticketNummer: 'TCK-' + Math.floor(Math.random() * 1000000) + '-' + i,
      type: t.ticketTypeName,
      email: t.holder.email
    }));
    this.orderSuccess = true;
  }
}
