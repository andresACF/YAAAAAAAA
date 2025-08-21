const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para tu frontend
app.use(cors({
  origin: '*' // Para producción, reemplaza '*' con la URL de tu frontend, ej: 'https://yaaaaaaaa-1.onrender.com'
}));

app.use(express.json());

// API de visitas
app.get('/visitas', (req, res) => {
  const visitasFile = path.join(__dirname, 'visitas.txt');

  fs.readFile(visitasFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo el archivo' });

    let visitas = parseInt(data) || 0;
    visitas++;

    fs.writeFile(visitasFile, visitas.toString(), (err) => {
      if (err) console.log('Error escribiendo visitas:', err);
    });

    res.json({ visitas }); // Siempre devuelve JSON
  });
});

// Servir React desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Cualquier otra ruta, servir index.html (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
