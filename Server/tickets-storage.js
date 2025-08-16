// dit is het systeem dat de tickets opslaacht in tickets.json
const fs = require('fs');
const path = require('path');

const TICKETS_FILE = path.join(__dirname, 'tickets.json');

function loadTickets() {
  if (fs.existsSync(TICKETS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TICKETS_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveTickets(tickets) {
  fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2), 'utf8');
}

module.exports = { loadTickets, saveTickets };
