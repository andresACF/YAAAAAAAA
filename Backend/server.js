const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS desde cualquier origen
app.use(cors());

// Si quieres restringir a tu frontend específico:
// app.use(cors({ origin: 'https://yaaaaaaaa-1.onrender.com' }));

app.get('/visitas', (req, res) => {
    let visitas = 0;
    try {
        visitas = parseInt(fs.readFileSync('visitas.txt', 'utf8')) || 0;
        visitas = Math.ceil(visitas / 2); // tu ajuste para doble conteo
        fs.writeFileSync('visitas.txt', (visitas * 2).toString());
    } catch (err) {
        console.error(err);
    }
    res.json({ visitas });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
