const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para cualquier origen
app.use(cors());

// Ruta del archivo de contador
const COUNTER_FILE = path.join(__dirname, 'contador.txt');

// Inicializar archivo si no existe
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, '0', 'utf-8');
}

// Endpoint para obtener y actualizar contador
app.get('/visitas', (req, res) => {
  try {
    let count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf-8'), 10);
    
    // Dividimos entre 2 si quieres compensar el doble conteo
    count = Math.floor((count + 1) / 2);
    
    fs.writeFileSync(COUNTER_FILE, (count * 2).toString(), 'utf-8'); // guardamos el doble para mantener consistencia
    res.json({ value: count });
  } catch (err) {
    res.status(500).json({ error: 'Error leyendo o actualizando el contador' });
  }
});

// Endpoint para solo leer sin incrementar
app.get('/visitas/read', (req, res) => {
  try {
    let count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf-8'), 10);
    count = Math.floor(count / 2);
    res.json({ value: count });
  } catch (err) {
    res.status(500).json({ error: 'Error leyendo el contador' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
