const express = require('express');
const cors = require('cors'); // <- asegurate de instalar cors
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS desde cualquier origen (más simple)
app.use(cors());

// O permitir solo tu frontend específico
// app.use(cors({ origin: 'https://yaaaaaaaa-1.onrender.com' }));

app.get('/visitas', (req, res) => {
  const filePath = './contador.txt';
  
  // Leer el contador
  let contador = 0;
  if (fs.existsSync(filePath)) {
    contador = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
  }

  // Aumentar y guardar
  contador++;
  fs.writeFileSync(filePath, contador.toString());

  // Devolver valor
  res.json({ visitas: contador });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
