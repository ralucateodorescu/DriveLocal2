const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./driveLocal.db');

db.run(`CREATE TABLE IF NOT EXISTS mesaje (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT,
  email TEXT,
  mesaj TEXT
)`);

const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/contact', (req, res) => {
    const { nume, email, mesaj } = req.body;
    db.run(`INSERT INTO mesaje (nume, email, mesaj) VALUES (?, ?, ?)`,
      [nume, email, mesaj],
      (err) => {
        if (err) {
          console.error(err.message);
          res.send("A apărut o eroare. Încearcă din nou.");
        } else {
          res.send("<h2>Mulțumim pentru mesaj! Te vom contacta în curând.</h2><a href='/'>Înapoi la pagină</a>");
        }
      });
  });
  
app.listen(PORT, () => {
    console.log(`DriveLocal rulează la http://localhost:${PORT}`);
});
