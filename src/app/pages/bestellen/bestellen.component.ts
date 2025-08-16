/*
dit is de typescript van het bestellen hierin maak ik al de variable aan die gebruikt worden bij het aanmaken 
*/
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/*
onderdelen van een event
*/ 
interface MyEvent {
  id: number;
  name: string;
  ticketTypes: TicketType[];
}
/*
onderdelen van de tickettypes
*/ 
interface TicketType {
  id: number;
  name: string;
  max: number;
}
// onderdelen van een ticket
interface Ticket {
  ticketTypeId: number;
  ticketTypeName: string;
  holder: TicketHolder;
}
// onderdelen van de tickethouders
interface TicketHolder {
  email: string;
  vervoerswijze: string;
  woonplaats: string;
  aankomsttijd: string;
  vertrektijd: string;
  drankbonnen: number;
  maaltijdvouchers: number;
}
//hier import en export ik alles zodat de angular componenten kunnen communiceren
@Component({
  selector: 'app-bestellen',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './bestellen.component.html',
  styleUrls: ['./bestellen.component.scss']
})
export class BestellenComponent {
  //dit is soort van een setter die alle onderdelen aanmaakt voor gebruik 
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
  errorMsg: string = '';

  constructor(private http: HttpClient) {}
//selecteerd het event en en maakt de tickets-array leeg wanneer een event wordt gekozen
  selectEvent(event: Event) {
  const eventId = (event.target as HTMLSelectElement).value;
  this.selectedEvent = this.events.find(e => e.id === +eventId) || null;
  this.tickets = [];
  }
// toont het aantaal tickets dat beschikbaar is per type
  getTicketCount(ticketTypeId: number): number {
    return this.tickets.filter(t => t.ticketTypeId === ticketTypeId).length;
  }
//checkt of er nog tickets toegevoegd kunnen worden
  canAddTicket(ticketType: TicketType): boolean {
    return this.getTicketCount(ticketType.id) < ticketType.max;
  }
// controleerd of er nog een ticket toegevoegd mag worden en voegt deze toe met nu nog lege gegevens
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
//verwijderd tickets
  removeTicket(index: number) {
    this.tickets.splice(index, 1);
  }
//checkt of de email uniek is
  isEmailUnique(email: string, index: number): boolean {
    return this.tickets.filter((t, i) => t.holder.email === email && i !== index).length === 0;
  }
//checkt de prijzen
  getTotaalPrijs(): number {
    
    const prijzen: { [key: number]: number } = {
      1: 50, // Standaard
      2: 120, // VIP
      3: 60, // Regular
      4: 150 // Premium
    };
    return this.tickets.reduce((sum, t) => sum + (prijzen[t.ticketTypeId] || 0), 0);
  }
// checkt of een order valid is
  isOrderValid(): boolean {
    // Alle e-mails moeten uniek en ingevuld zijn
    return this.tickets.every((t, i) => t.holder.email && this.isEmailUnique(t.holder.email, i));
  }
// doet de bestelling via je backend en geeft een nummer een type en een email terug of error als het niet lukt
  bestel() {
    this.errorMsg = '';
    const payload = {
      bestellerEmail: this.bestellerEmail,
      tickets: this.tickets.map(t => ({
        ticketTypeId: t.ticketTypeId,
        ticketTypeName: t.ticketTypeName,
        ...t.holder
      }))
    };
    this.http.post<any>('http://localhost:3001/api/orders', payload).subscribe({
      next: (res) => {
        this.orderNummer = res.orderId;
        this.bevestigdeTickets = res.tickets.map((t: any) => ({
          ticketNummer: t.ticketId,
          type: t.ticketTypeName || t.ticketTypeId,
          email: t.email || t.holder?.email || ''
        }));
        this.orderSuccess = true;
      },
      error: (err) => {
        this.errorMsg = 'Bestelling mislukt. Probeer opnieuw.';
      }
    });
  }
}
