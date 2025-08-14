// Basis Express server voor event ticketing backend
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Event ticketing backend werkt!');
});

// Placeholder voor tickets API
app.get('/api/tickets', (req, res) => {
  res.json({ message: 'Hier komen de tickets.' });
});

// Placeholder voor vervoersgegevens API
app.get('/api/transport', (req, res) => {
  res.json({ message: 'Hier komen de vervoersgegevens.' });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
