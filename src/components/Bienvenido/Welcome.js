import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

export default function WelcomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy");

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        ¡Bienvenido!
      </Typography>
      <Typography variant="h6">
        Hoy es {formattedDate}
      </Typography>
    </div>
  );
}
