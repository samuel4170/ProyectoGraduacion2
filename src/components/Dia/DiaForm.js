import React, { useState, useEffect } from 'react';
import { Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function DiaForm() {
  const [dia, setDia] = useState({
    NombreDia: '',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (editing) {
      await fetch(`http://localhost:8080/api/dias/${params.IdDia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dia),
      });
    } else {
      await fetch('http://localhost:8080/api/dias', {
        method: 'POST',
        body: JSON.stringify(dia),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setLoading(false);
    navigate('/ver/dia');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDia((prevDia) => ({ ...prevDia, [name]: value }));
  };

  const loadDia = async (IdDia) => {
    const res = await fetch(`http://localhost:8080/api/dias/${IdDia}`);
    const data = await res.json();
    setDia(data);
    setEditing(true);
  };

  useEffect(() => {
    if (params.IdDia) {
      loadDia(params.IdDia);
    }
  }, [params.IdDia]);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={8}>
        <Card
          sx={{ mt: 8 }}
          style={{
            backgroundColor: '#1e272e',
            padding: '4rem',
            width: '30rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '28px',
              marginBottom: '2rem',
            }}
          >
            <Typography variant="5" textAlign="center" color="white">
              {editing ? 'Editar Datos de Día' : 'Añadir Nuevo Día'}
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>

            <TextField
              variant="filled"
              label="Nombre del Día"
              sx={{
                display: 'block',
                margin: '.5rem 0',
                backgroundColor: 'transparent',
              }}
              autoComplete="off"
              name="NombreDia"
              value={dia.NombreDia}
              onChange={handleChange}
              inputProps={{
                style: {
                  color: 'white',
                  width: '27rem',
                },
              }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!dia.NombreDia}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : editing ? (
                  'Guardar Cambios'
                ) : (
                  'Guardar'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
