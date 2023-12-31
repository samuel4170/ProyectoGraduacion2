// import React, { useEffect, useState } from 'react';
// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search'; // Importar el icono de lupa
// import { useNavigate } from 'react-router-dom';

// export default function PacienteList() {
//   const [pacientes, setPacientes] = useState([]);
//   //buscar paciente
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
//   const [selectedPacienteId, setSelectedPacienteId] = useState(null);
//   const [isValidCredentials, setIsValidCredentials] = useState(true); // Nuevo estado

//   const loadPacientes = async () => {
//     const response = await fetch('http://localhost:8080/api/pacientes');
//     const data = await response.json();
//     setPacientes(data);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPacientes = pacientes.filter((paciente) =>
//   paciente.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
// );


//   const handleDelete = async (IdPaciente) => {
//     setSelectedPacienteId(IdPaciente);
//     setDeleteConfirmationOpen(true);
//   };

//   const openDeleteConfirmationDialog = () => {
//     setDeleteConfirmationOpen(true);
//   };

//   const closeDeleteConfirmationDialog = () => {
//     setDeleteConfirmationOpen(false);
//     setCredentials({ Usuario: '', Password: '' });
//     setSelectedPacienteId(null);
//     setIsValidCredentials(true);
//   };

//   const handleCredentialChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prevCredentials) => ({
//       ...prevCredentials,
//       [name]: value,
//     }));
//     setIsValidCredentials(true); // Restaurar el estado de validación
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       // Lógica de validación de las credenciales en la API
//       const response = await fetch('http://localhost:8080/api/recepcionistas');
//       const data = await response.json();
  
//       const validCredentials = data.some(
//         (user) =>
//           user.Usuario === credentials.Usuario &&
//           user.Password === credentials.Password
//       );
  
//       if (validCredentials) {
//         await fetch(`http://localhost:8080/api/pacientes/${selectedPacienteId}`, {
//           method: 'DELETE',
//         });
//         setPacientes(pacientes.filter((paciente) => paciente.IdPaciente !== selectedPacienteId));
//         closeDeleteConfirmationDialog();
//       } else {
//         setIsValidCredentials(false); // Actualizar el estado de validación si las credenciales son incorrectas
//       }
//     } catch (error) {
//       console.error(error);
//       // Mostrar mensaje de error
//     }
//   };
  

//   useEffect(() => {
//     loadPacientes();
//   }, []);

//   return (
//     <>
//       <h1>Lista de Pacientes</h1>

//       <TextField
//           label="Buscar por nombre"
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           fullWidth
//           style={{ marginLeft: 'auto' }} // Mover el campo de búsqueda al lado derecho
//         />

// {filteredPacientes.map((paciente) => (
//       <Card
//         key={paciente.IdPaciente}
//         style={{
//           marginBottom: '.7rem',
//           backgroundColor: '#1e272e',
//         }}
//       >
//       </Card>
//     ))}
        
//       {pacientes.map((paciente) => (
//         <Card
//           key={paciente.IdPaciente}
//           style={{
//             marginBottom: '.7rem',
//             backgroundColor: '#1e272e',
//           }}
//         >
//           <CardContent
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <div style={{ color: 'white' }}>
//               <Typography>{`Nombre: ${paciente.Nombre}`}</Typography>
//               <Typography>{`Dirección: ${paciente.Direccion}`}</Typography>
//               <Typography>{`Teléfono: ${paciente.Telefono}`}</Typography>
//               <Typography>{`DPI: ${paciente.DPI}`}</Typography>
//               <Typography>{`Edad: ${paciente.Edad}`}</Typography>
//               <Typography>{`DPI de Referencia: ${paciente.DPIReferencia}`}</Typography>
//             </div>

//             <div>
//               <Button
//                 variant='contained'
//                 color='inherit'
//                 onClick={() => navigate(`/paciente/${paciente.IdPaciente}/edit`)}
//               >
//                 Editar
//               </Button>

//               <Button
//                 variant='contained'
//                 color='warning'
//                 onClick={() => handleDelete(paciente.IdPaciente)}
//                 style={{ marginLeft: '.5rem' }}
//               >
//                 Eliminar
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Diálogo de confirmación */}
//       <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
//         <DialogTitle>Confirmar Eliminación</DialogTitle>
//         <DialogContent>
//           <TextField
//             label='Usuario'
//             name='Usuario'
//             value={credentials.Usuario}
//             onChange={handleCredentialChange}
//             error={!isValidCredentials && credentials.Usuario !== ''}
//             helperText={!isValidCredentials && credentials.Usuario !== '' ? 'Usuario o password incorrecto' : ''}
//           />
//           <TextField
//             label='Contraseña'
//             name='Password'
//             type='password'
//             value={credentials.Password}
//             onChange={handleCredentialChange}
//             error={!isValidCredentials && credentials.Password !== ''}
//             helperText={!isValidCredentials && credentials.Password !== ''}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDeleteConfirmationDialog} color='primary'>
//             Cancelar
//           </Button>
//           <Button onClick={handleDeleteConfirmation} color='primary'>
//             Confirmar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }


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
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css'; 


export default function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const loadPacientes = async () => {
    const response = await fetch('http://localhost:8080/api/pacientes');
    const data = await response.json();
    setPacientes(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      filterPacientes(); // Filtrar pacientes al presionar "Enter"
    }
  };

  const filterPacientes = () => {
    const filteredPacientes = pacientes.filter((paciente) =>
      paciente.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredPacientes;
  };

  const handleDelete = async (IdPaciente) => {
    setSelectedPacienteId(IdPaciente);
    setDeleteConfirmationOpen(true);
  };

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setCredentials({ Usuario: '', Password: '' });
    setSelectedPacienteId(null);
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
      const response = await fetch('http://localhost:8080/api/recepcionistas');
      const data = await response.json();

      const validCredentials = data.some(
        (user) =>
          user.Usuario === credentials.Usuario &&
          user.Password === credentials.Password
      );

      if (validCredentials) {
        await fetch(`http://localhost:8080/api/pacientes/${selectedPacienteId}`, {
          method: 'DELETE',
        });
        setPacientes(pacientes.filter((paciente) => paciente.IdPaciente !== selectedPacienteId));
        closeDeleteConfirmationDialog();
      } else {
        setIsValidCredentials(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return (
<>
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr', 
  alignItems: 'center',
  }}>
    <div style={{ marginRight: '8px' }}>
      <h1>Lista de Pacientes</h1>
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

      {filterPacientes().map((paciente) => (
        <Card
          key={paciente.IdPaciente}
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
              <Typography>{`Nombre: ${paciente.Nombre}`}</Typography>
              <Typography>{`Dirección: ${paciente.Direccion}`}</Typography>
              <Typography>{`Teléfono: ${paciente.Telefono}`}</Typography>
              <Typography>{`DPI: ${paciente.DPI}`}</Typography>
              <Typography>{`Edad: ${paciente.Edad}`}</Typography>
              <Typography>{`DPI de Referencia: ${paciente.DPIReferencia}`}</Typography>
            </div>

            <div>
              <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/paciente/${paciente.IdPaciente}/edit`)}
              >
                Editar
              </Button>

              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(paciente.IdPaciente)}
                style={{ marginLeft: '.5rem' }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

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
            helperText={!isValidCredentials && credentials.Password !== ''}
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
