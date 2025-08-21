import React, { useEffect, useState } from 'react';

function ContadorGlobal() {
  const [visitas, setVisitas] = useState(0);

  useEffect(() => {
    fetch('/visitas')
      .then(res => res.json())
      .then(data => setVisitas(data.visitas))
      .catch(err => console.error('Error al obtener visitas:', err));
  }, []);

  return (
    <div>
      <h1>Visitas: {visitas}</h1>
    </div>
  );
}

export default ContadorGlobal;
