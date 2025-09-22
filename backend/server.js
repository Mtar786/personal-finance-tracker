const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Open or create a SQLite database stored in a local file.
const db = new sqlite3.Database('./expenses.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize the expenses table if it does not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    amount REAL,
    category TEXT,
    date TEXT
  )`);
});

// Helper to run queries and return a promise
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        // For insert/update statements, return the last inserted id
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Routes

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const rows = await allQuery('SELECT * FROM expenses ORDER BY date DESC, id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new expense
app.post('/api/expenses', async (req, res) => {
  const { description, amount, category, date } = req.body;
  if (!description || !amount || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await runQuery(
      'INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)',
      [description, amount, category, date]
    );
    res.status(201).json({ id: result.id, description, amount, category, date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing expense
app.put('/api/expenses/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, amount, category, date } = req.body;
  if (!description || !amount || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await runQuery(
      'UPDATE expenses SET description = ?, amount = ?, category = ?, date = ? WHERE id = ?',
      [description, amount, category, date, id]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ id, description, amount, category, date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await runQuery('DELETE FROM expenses WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export expenses as CSV
app.get('/api/expenses/csv', async (req, res) => {
  try {
    const rows = await allQuery('SELECT * FROM expenses ORDER BY date ASC, id ASC');
    // Construct CSV header
    let csv = 'id,description,amount,category,date\n';
    csv += rows
      .map((row) => {
        // Escape double quotes in description and category
        const desc = row.description.replace(/"/g, '""');
        const cat = row.category.replace(/"/g, '""');
        return `${row.id},"${desc}",${row.amount},"${cat}",${row.date}`;
      })
      .join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});