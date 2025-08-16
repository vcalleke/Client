import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//dit wordt gebruikt om de vervoers gegevens via een API call aan te passen
export interface VervoersGegevens {
  vervoerswijze: string;
  woonplaats: string;
  aankomsttijd: string;
  vertrektijd: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost:3001/api/tickets';

  constructor(private http: HttpClient) {}

  getVervoersGegevens(ticketId: string): Observable<{ ticketId: string; vervoersgegevens: VervoersGegevens }> {
    return this.http.get<{ ticketId: string; vervoersgegevens: VervoersGegevens }>(`${this.apiUrl}/${ticketId}`);
  }

  updateVervoersGegevens(ticketId: string, gegevens: VervoersGegevens): Observable<any> {
    return this.http.put(`${this.apiUrl}/${ticketId}`, gegevens);
  }
}
