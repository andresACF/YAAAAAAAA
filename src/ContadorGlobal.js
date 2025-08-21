import React, { useEffect, useState } from 'react';

function ContadorGlobal() {
  const [visitas, setVisitas] = useState(0);
  const BACKEND_URL = 'https://mi-contador.onrender.com';

  useEffect(() => {
    fetch(`${BACKEND_URL}/visitas`)
      .then(res => res.json())
      .then(data => setVisitas(data.value))
      .catch(err => console.error('Error al obtener visitas:', err));
  }, []);

  return (
    <div>
      <h1>Visitas: {visitas}</h1>
    </div>
  );
}

export default ContadorGlobal;
