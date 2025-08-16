// Express backend voor ticketsysteem
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const { loadTickets, saveTickets } = require('./tickets-storage');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dummy data voor events (hier staan de events en tickettypes)
let events = [
  {
    id: 'event1',
    name: 'Festival 2025',
    ticketTypes: [
      {
        id: 'day',
        name: 'Ticket Dag',
        startDate: '2025-09-01',
        endDate: '2025-09-01',
        price: 50,
        maxPerOrder: 4
      },
      {
        id: 'combi',
        name: 'Combiticket',
        startDate: '2025-09-01',
        endDate: '2025-09-03',
        price: 120,
        maxPerOrder: 2
      }
    ]
  }
];

// Haal alle events op
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Laad tickets uit bestand zo blijven ze bewaard na restart
let ticketsDB = loadTickets();

// Bestelling plaatsen: tickets opslaan en ordernummer + ticketnummers teruggeven
app.post('/api/orders', (req, res) => {
  const { bestellerEmail, tickets } = req.body;
  if (!bestellerEmail || !Array.isArray(tickets) || tickets.length === 0) {
    return res.status(400).json({ error: 'Ongeldige bestelling' });
  }

  const orderId = uuidv4();
  const ticketsWithIds = tickets.map(ticket => {
    const ticketId = uuidv4();
    const newTicket = {
      ...ticket,
      ticketId,
      vervoersgegevens: {
        vervoerswijze: ticket.vervoerswijze || '',
        woonplaats: ticket.woonplaats || '',
        aankomsttijd: ticket.aankomsttijd || '',
        vertrektijd: ticket.vertrektijd || ''
      }
    };
    ticketsDB.push(newTicket); // Ticket opslaan in array
    saveTickets(ticketsDB);    // Tickets bewaren in bestand
    return newTicket;
  });

  res.json({
    orderId,
    tickets: ticketsWithIds
  });
});

// Ticket opzoeken op ticketnummer
app.get('/api/tickets/:ticketId', (req, res) => {
  let searchId = req.params.ticketId;
  // Haal echte uuid (ticketnummer) uit ticketnummer
  const match = searchId.match(/[a-f0-9\-]{36}/i);
  if (match) {
    searchId = match[0];
  }
  const ticket = ticketsDB.find(t => t.ticketId === searchId);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket niet gevonden' });
  }
  res.json({
    ticketId: ticket.ticketId,
    vervoersgegevens: ticket.vervoersgegevens
  });
  saveTickets(ticketsDB);
});

// Vervoersgegevens van ticket aanpassen
app.put('/api/tickets/:ticketId', (req, res) => {
  let searchId = req.params.ticketId;
  const match = searchId.match(/[a-f0-9\-]{36}/i);
  if (match) {
    searchId = match[0];
  }
  const ticket = ticketsDB.find(t => t.ticketId === searchId);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket niet gevonden' });
  }
  const { vervoerswijze, woonplaats, aankomsttijd, vertrektijd } = req.body;
  ticket.vervoersgegevens = {
    vervoerswijze: vervoerswijze || ticket.vervoersgegevens.vervoerswijze,
    woonplaats: woonplaats || ticket.vervoersgegevens.woonplaats,
    aankomsttijd: aankomsttijd || ticket.vervoersgegevens.aankomsttijd,
    vertrektijd: vertrektijd || ticket.vervoersgegevens.vertrektijd
  };
  res.json({
    ticketId: ticket.ticketId,
    vervoersgegevens: ticket.vervoersgegevens
  });
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});