// Basis Express server voor event ticketing backend
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dummy data voor events
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

// Endpoint: Lijst van alle toekomstige events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Endpoint: Bestelling registreren
app.post('/api/orders', (req, res) => {
  const { bestellerEmail, tickets } = req.body;
  if (!bestellerEmail || !Array.isArray(tickets) || tickets.length === 0) {
    return res.status(400).json({ error: 'Ongeldige bestelling' });
  }

  const orderId = uuidv4();
  const ticketsWithIds = tickets.map(ticket => ({
    ...ticket,
    ticketId: uuidv4()
  }));

  // Hier zou je normaal de bestelling opslaan in een database

  res.json({
    orderId,
    tickets: ticketsWithIds
  });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
