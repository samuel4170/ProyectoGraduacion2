import { Autocomplete, Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function HorarioForm() {
  const [horario, setHorario] = useState({
    HoraInicio: '',
    HoraFin: '',
    IdDia: '',
    IdMedico: ''
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false)

  const [dias, setDias] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)

    if(editing) {
        await fetch(`http://localhost:8080/api/horarios/${params.IdMedico}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horario),
      });
    } else {
        await fetch("http://localhost:8080/api/horarios",{
        method: "POST",
        body: JSON.stringify(horario),
        headers: { "Content-Type": "application/json"},
      });
    }

    setLoading(false)
    navigate('/ver/horario')
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setHorario({ ...horario, [name]: value });
  };

  const handleHorario = (value) => {
    setHorario((prevhorario) => ({ ...prevhorario, IdDia: value ? value.IdDia : '' }));
  };

  const handleMedico = (value) => {
    setHorario((prevhorario) => ({ ...prevhorario, IdMedico: value ? value.IdMedico : '' }));
  };

  const loadHorario = async (IdHorario) => {
    const res = await fetch (`http://localhost:8080/api/horarios/${IdHorario}`)
    const data = await res.json()
    setHorario(data)
    setEditing(true)
  }
  
  useEffect(() => {
    if (params.IdHorario) {
      loadHorario(params.IdHorario);
    }
  }, [params.IdHorario]);


  useEffect(() => {
    fetch('http://localhost:8080/api/dias')
      .then((response) => response.json())
      .then((data) => {
        setDias(data);
      });

      fetch('http://localhost:8080/api/medicos')
      .then((response) => response.json())
      .then((data) => {
        setMedicos(data);
      });
  }, []);

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
            {editing? "Editar Datos de horario" : "Añadir nuevo horario"}
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
                  <TextField
                  variant='filled'
                  label='Hora de Inicio'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    backgroundColor: 'transparent',
                  }}
                  autoComplete="off"
                  
                  name = "HoraInicio"
                  value={horario.HoraInicio}
                  onChange={handleChange}
                  inputProps={{
                    style: {
                      color: "white",
                      width: '27rem',

                    }
                  }}
                  InputLabelProps={{style: {color: "white"}}}
                />

                  <TextField
                  variant='filled'
                  label='Hora Fin'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    backgroundColor: 'transparent',
                  }}
                  autoComplete="off"
                  name = "HoraFin"
                  value={horario.HoraFin}
                  onChange={handleChange}
                  inputProps={{
                    style: {
                      color: "white",
                      width: '27rem',

                    }
                  }}
                  InputLabelProps={{style: {color: "white"}}}
                />

            <Autocomplete
              options={dias}
              getOptionLabel={(option) => option.NombreDia}
              value={dias.find((option) => option.IdDia === horario.IdDia) || null}
              onChange={(event, value) => handleHorario(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="IdDia"
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="IdDia"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              )}
            />

<Autocomplete
              options={medicos}
              getOptionLabel={(option) => option.Nombre}
              value={medicos.find((option) => option.IdMedico === horario.IdMedico) || null}
              onChange={(event, value) => handleMedico(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="IdMedico"
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="IdMedico"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              )}
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
                disabled={
                  !horario.HoraInicio || 
                  !horario.HoraFin || 
                  !horario.IdDia}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? <CircularProgress color="inherit" size={25} /> : 'Guardar'}
              </Button>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
