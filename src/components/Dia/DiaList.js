import React, { useEffect, useState } from 'react';
import {
  Divider,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function DiaList() {
  const [dias, setDias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
  const [selectedDiaId, setSelectedDiaId] = useState(null);
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const loadDias = async () => {
    const response = await fetch('http://localhost:8080/api/dias');
    const data = await response.json();
    setDias(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      filterDias(); // Filtrar días al presionar "Enter"
    }
  };

  const filterDias = () => {
    const filteredDias = dias.filter((dia) =>
      dia.NombreDia.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredDias;
  };

  const handleDelete = async (IdDia) => {
    setSelectedDiaId(IdDia);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setCredentials({ Usuario: '', Password: '' });
    setSelectedDiaId(null);
    setIsValidCredentials(true);
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setIsValidCredentials(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Lógica de validación de las credenciales en la API
      const response = await fetch('http://localhost:8080/api/recepcionistas');
      const data = await response.json();

      const validCredentials = data.some(
        (user) =>
          user.Usuario === credentials.Usuario &&
          user.Password === credentials.Password
      );

      if (validCredentials) {
        await fetch(`http://localhost:8080/api/dias/${selectedDiaId}`, {
          method: 'DELETE',
        });
        setDias(dias.filter((dia) => dia.IdDia !== selectedDiaId));
        closeDeleteConfirmationDialog();
      } else {
        setIsValidCredentials(false);
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error
    }
  };

  useEffect(() => {
    loadDias();
  }, []);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
        <div style={{ marginRight: '8px' }}>
          <h1>Lista de Días</h1>
        </div>
        <TextField
          label="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleEnterKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      <Divider sx={{ marginY: '0.5rem' }} />

      {filterDias().map((dia) => (
        <Card
          key={dia.IdDia}
          style={{
            marginBottom: '.7rem',
            backgroundColor: '#1e272e',
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: 'white' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {dia.NombreDia}
              </Typography>
            </div>

            <div>
              <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/dia/${dia.IdDia}/edit`)}
              >
                Editar
              </Button>

              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(dia.IdDia)}
                style={{ marginLeft: '.5rem' }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Diálogo de confirmación */}
      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <TextField
            label='Usuario'
            name='Usuario'
            value={credentials.Usuario}
            onChange={handleCredentialChange}
            error={!isValidCredentials && credentials.Usuario !== ''}
            helperText={!isValidCredentials && credentials.Usuario !== '' ? 'Usuario o password incorrecto' : ''}
          />
          <TextField
            label='Contraseña'
            name='Password'
            type='password'
            value={credentials.Password}
            onChange={handleCredentialChange}
            error={!isValidCredentials && credentials.Password !== ''}
            helperText={!isValidCredentials && credentials.Password !== '' ? 'Usuario o password incorrecto' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmationDialog} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmation} color='primary'>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
