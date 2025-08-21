const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API de visitas
app.get('/visitas', (req, res) => {
  fs.readFile('visitas.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo el archivo');
    let visitas = parseInt(data) || 0;
    visitas++;
    fs.writeFile('visitas.txt', visitas.toString(), (err) => {
      if (err) console.log(err);
    });
    res.json({ visitas });
  });
});

// Servir React
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
