// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// import MedicoForm from './components/Medico/MedicoForm';
// import MedicoList from './components/Medico/MedicoList';
// import PacienteForm from './components/Paciente/PacienteForm';
// import PacienteList from './components/Paciente/PacienteList';
// import SignInForm from './components/InicioSesion/SignInForm';
// import ClientForm from './components/Cita/CitaForm';
// import ClientList from './components/Cita/CitaList';
// import EspecialidadForm from './components/Especialidad/EspecialidadForm';
// import EspecialidadList from './components/Especialidad/EspecialidadList';

// import HorarioForm from './components/Horario/horarioForm.js';
// import HorarioList from './components/Horario/HorarioList';

// import DiaForm from './components/Dia/DiaForm';
// import DiaList from './components/Dia/DiaList';

// import FacturaForm from './components/Factura/FacturaForm';
// import FacturaList from './components/Factura/FacturaList';
// import Navbar from './components/Navbar';

// export default function App() {
//   const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
//   const initialUserName = localStorage.getItem('userName') || '';

//   const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
//   const [userName, setUserName] = useState(initialUserName);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [shouldShowDialog, setShouldShowDialog] = useState(false);
//   const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);


//   const handleLogin = (name) => {
//     setIsLoggedIn(true);
//     setUserName(name);
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userName', name);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserName('');
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('userName');
//   };

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   useEffect(() => {
//     const handleWindowPopstate = () => {
//       if (isLoggedIn && window.location.pathname === "/ver/paciente") {
//         setShouldShowDialog(true);
//       }
//     };

//     window.addEventListener("popstate", handleWindowPopstate);

//     return () => {
//       window.removeEventListener("popstate", handleWindowPopstate);
//     };
//   }, [isLoggedIn]);

//   const handleDialogYesClick = () => {
//     setShouldShowDialog(false);
//     handleLogout();
//     setShouldRedirectToLogin(true);
//   };

//   const handleDialogNoClick = () => {
//     setShouldShowDialog(false);
//   };

//   return (
//     <BrowserRouter>
//       <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
//       <Container>
//       <Routes>
//           <Route path="/" element={isLoggedIn ? <Navigate to="/ver/paciente" /> : <Navigate to="/iniciosesion/new" />
//           }
//           />
//           <Route
//             path="/iniciosesion/new"
//             element={isLoggedIn ? <Navigate to="/" /> : <SignInForm onLogin={handleLogin} />}
//           />
//           {isLoggedIn ? (
//             <>
//                 <Route path="/ver/paciente" element={<PacienteList />} />
//                 <Route path="/paciente/new" element={<PacienteForm />} />
//                 <Route path="/paciente/:IdPaciente/edit" element={<PacienteForm />} />

//                 <Route path="/ver/cita" element={<ClientList />} />
//                 <Route path="/cita/new" element={<ClientForm />} />
//                 <Route path="/cita/:IdCita/edit" element={<ClientForm />} />

//                 <Route path="/ver/medico" element={<MedicoList />} />
//                 <Route path="/medico/new" element={<MedicoForm />} />
//                 <Route path="/medico/:IdMedico/edit" element={<MedicoForm />} />

//                 <Route path="/ver/especialidad" element={<EspecialidadList />} />
//                 <Route path="/especialidad/new" element={<EspecialidadForm />} />
//                 <Route path="/especialidad/:IdEspecialidad/edit" element={<EspecialidadForm />} />

//                 <Route path="/ver/horario" element={<HorarioList />} />
//                 <Route path="/horario/new" element={<HorarioForm />} />
//                 <Route path="/horario/:IdHorario/edit" element={<HorarioForm />} />

//                 <Route path="/ver/dia" element={<DiaList />} />
//                 <Route path="/dia/new" element={<DiaForm />} />
//                 <Route path="/dia/:IdDia/edit" element={<DiaForm />} />

//                 <Route path="/ver/Factura" element={<FacturaList />} />
//                 <Route path="/Factura/new" element={<FacturaForm />} />
//                 <Route path="/Factura/:Id/edit" element={<FacturaForm />} />
//             </>
//           ) : null}
//         </Routes>
//       </Container>
//       <Dialog open={shouldShowDialog} onClose={handleDialogNoClick}>
//       <DialogTitle>Confirmar salida</DialogTitle>
//       <DialogContent>
//         <DialogContentText>¿Desea salir del sistema?</DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleDialogNoClick} color="primary">
//           No
//         </Button>
//         <Button onClick={handleDialogYesClick} color="primary">
//           Sí
//         </Button>
//       </DialogActions>
//     </Dialog>
//     {shouldRedirectToLogin && <Navigate to="/iniciosesion/new" />}
//     </BrowserRouter>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// import MedicoForm from './components/Medico/MedicoForm';
// import MedicoList from './components/Medico/MedicoList';
// import PacienteForm from './components/Paciente/PacienteForm';
// import PacienteList from './components/Paciente/PacienteList';
// import SignInForm from './components/InicioSesion/SignInForm';
// import ClientForm from './components/Cita/CitaForm';
// import ClientList from './components/Cita/CitaList';
// import EspecialidadForm from './components/Especialidad/EspecialidadForm';
// import EspecialidadList from './components/Especialidad/EspecialidadList';

// import HorarioForm from './components/Horario/horarioForm.js';
// import HorarioList from './components/Horario/HorarioList';

// import DiaForm from './components/Dia/DiaForm';
// import DiaList from './components/Dia/DiaList';

// import FacturaForm from './components/Factura/FacturaForm';
// import FacturaList from './components/Factura/FacturaList';
// import Navbar from './components/Navbar';

// import Welcome from './components/Bienvenido/Welcome';


// export default function App() {
//   const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
//   const initialUserName = localStorage.getItem('userName') || '';

//   const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
//   const [userName, setUserName] = useState(initialUserName);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [shouldShowDialog, setShouldShowDialog] = useState(false);

//   const handleLogin = (name) => {
//     setIsLoggedIn(true);
//     setUserName(name);
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userName', name);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserName('');
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('userName');
//   };

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   useEffect(() => {
//     const handleWindowPopstate = () => {
//       if (isLoggedIn && window.location.pathname === "/ver/paciente") {
//         setShouldShowDialog(true);
//       }
//     };

//     window.addEventListener("popstate", handleWindowPopstate);

//     return () => {
//       window.removeEventListener("popstate", handleWindowPopstate);
//     };
//   }, [isLoggedIn]);

//   const handleDialogYesClick = () => {
//     setShouldShowDialog(false);
//     handleLogout();
//   };

//   const handleDialogNoClick = () => {
//     setShouldShowDialog(false);
//   };

//   return (
//     <BrowserRouter>
//       <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
//       <Container>
//       <Routes>
//           <Route path="/" element={isLoggedIn ? <Navigate to="/ver/paciente" /> : <Navigate to="/iniciosesion/new" />
//           }
//           />
//           <Route
//             path="/iniciosesion/new"
//             element={isLoggedIn ? <Navigate to="/" /> : <SignInForm onLogin={handleLogin} />}
//           />
//           {isLoggedIn ? (
//             <>
//                 <Route path="/ver/paciente" element={<PacienteList />} />
//                 <Route path="/paciente/new" element={<PacienteForm />} />
//                 <Route path="/paciente/:IdPaciente/edit" element={<PacienteForm />} />

//                 <Route path="/ver/cita" element={<ClientList />} />
//                 <Route path="/cita/new" element={<ClientForm />} />
//                 <Route path="/cita/:IdCita/edit" element={<ClientForm />} />

//                 <Route path="/ver/medico" element={<MedicoList />} />
//                 <Route path="/medico/new" element={<MedicoForm />} />
//                 <Route path="/medico/:IdMedico/edit" element={<MedicoForm />} />

//                 <Route path="/ver/especialidad" element={<EspecialidadList />} />
//                 <Route path="/especialidad/new" element={<EspecialidadForm />} />
//                 <Route path="/especialidad/:IdEspecialidad/edit" element={<EspecialidadForm />} />

//                 <Route path="/ver/horario" element={<HorarioList />} />
//                 <Route path="/horario/new" element={<HorarioForm />} />
//                 <Route path="/horario/:IdHorario/edit" element={<HorarioForm />} />

//                 <Route path="/ver/dia" element={<DiaList />} />
//                 <Route path="/dia/new" element={<DiaForm />} />
//                 <Route path="/dia/:IdDia/edit" element={<DiaForm />} />

//                 <Route path="/ver/Factura" element={<FacturaList />} />
//                 <Route path="/Factura/new" element={<FacturaForm />} />
//                 <Route path="/Factura/:Id/edit" element={<FacturaForm />} />
//             </>
//           ) : null}
//         </Routes>
//       </Container>
//       <Dialog open={shouldShowDialog} onClose={handleDialogNoClick}>
//       <DialogTitle>Confirmar salida</DialogTitle>
//       <DialogContent>
//         <DialogContentText>¿Desea salir del sistema?</DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleDialogNoClick} color="primary">
//           No
//         </Button>
//         <Button onClick={handleDialogYesClick} color="primary">
//           Sí
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </BrowserRouter>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

// import MedicoForm from './components/Medico/MedicoForm';
// import MedicoList from './components/Medico/MedicoList';
// import PacienteForm from './components/Paciente/PacienteForm';
// import PacienteList from './components/Paciente/PacienteList';
// import SignInForm from './components/InicioSesion/SignInForm';
// import ClientForm from './components/Cita/CitaForm';
// import ClientList from './components/Cita/CitaList';
// import EspecialidadForm from './components/Especialidad/EspecialidadForm';
// import EspecialidadList from './components/Especialidad/EspecialidadList';

// import HorarioForm from './components/Horario/horarioForm.js';
// import HorarioList from './components/Horario/HorarioList';

// import DiaForm from './components/Dia/DiaForm';
// import DiaList from './components/Dia/DiaList';

// import FacturaForm from './components/Factura/FacturaForm';
// import FacturaList from './components/Factura/FacturaList';
// import Navbar from './components/Navbar';

// export default function App() {
//   const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
//   const initialUserName = localStorage.getItem('userName') || '';

//   const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
//   const [userName, setUserName] = useState(initialUserName);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [shouldShowDialog, setShouldShowDialog] = useState(false);
//   const navigate = useNavigate();


//   const handleLogin = (name) => {
//     setIsLoggedIn(true);
//     setUserName(name);
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('userName', name);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserName('');
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('userName');
//   };

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   useEffect(() => {
//     const handleWindowPopstate = () => {
//       if (isLoggedIn && window.location.pathname === "/ver/paciente") {
//         setShouldShowDialog(true);
//       }
//     };
  
//     window.addEventListener("popstate", handleWindowPopstate);
  
//     return () => {
//       window.removeEventListener("popstate", handleWindowPopstate);
//     };
//   }, [isLoggedIn, navigate]); // Add 'navigate' to the dependency array  

//   const handleDialogYesClick = () => {
//     setShouldShowDialog(false);
//     handleLogout();
//     navigate('/iniciosesion/new');
//   };

//   const handleDialogNoClick = () => {
//     setShouldShowDialog(false);
//   };

//   return (
//     <BrowserRouter>
//       <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
//       <Container>
//       <Routes>
//           <Route path="/" element={isLoggedIn ? <Navigate to="/ver/paciente" /> : <Navigate to="/iniciosesion/new" />
//           }
//           />
//           <Route
//             path="/iniciosesion/new"
//             element={isLoggedIn ? <Navigate to="/" /> : <SignInForm onLogin={handleLogin} />}
//           />
//           {isLoggedIn ? (
//             <>
//                 <Route path="/ver/paciente" element={<PacienteList />} />
//                 <Route path="/paciente/new" element={<PacienteForm />} />
//                 <Route path="/paciente/:IdPaciente/edit" element={<PacienteForm />} />

//                 <Route path="/ver/cita" element={<ClientList />} />
//                 <Route path="/cita/new" element={<ClientForm />} />
//                 <Route path="/cita/:IdCita/edit" element={<ClientForm />} />

//                 <Route path="/ver/medico" element={<MedicoList />} />
//                 <Route path="/medico/new" element={<MedicoForm />} />
//                 <Route path="/medico/:IdMedico/edit" element={<MedicoForm />} />

//                 <Route path="/ver/especialidad" element={<EspecialidadList />} />
//                 <Route path="/especialidad/new" element={<EspecialidadForm />} />
//                 <Route path="/especialidad/:IdEspecialidad/edit" element={<EspecialidadForm />} />

//                 <Route path="/ver/horario" element={<HorarioList />} />
//                 <Route path="/horario/new" element={<HorarioForm />} />
//                 <Route path="/horario/:IdHorario/edit" element={<HorarioForm />} />

//                 <Route path="/ver/dia" element={<DiaList />} />
//                 <Route path="/dia/new" element={<DiaForm />} />
//                 <Route path="/dia/:IdDia/edit" element={<DiaForm />} />

//                 <Route path="/ver/Factura" element={<FacturaList />} />
//                 <Route path="/Factura/new" element={<FacturaForm />} />
//                 <Route path="/Factura/:Id/edit" element={<FacturaForm />} />
//             </>
//           ) : null}
//         </Routes>
//       </Container>
//       <Dialog open={shouldShowDialog} onClose={handleDialogNoClick}>
//       <DialogTitle>Confirmar salida</DialogTitle>
//       <DialogContent>
//         <DialogContentText>¿Desea salir del sistema?</DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleDialogNoClick} color="primary">
//           No
//         </Button>
//         <Button onClick={handleDialogYesClick} color="primary">
//           Sí
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </BrowserRouter>
//   );
// }




import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import MedicoForm from './components/Medico/MedicoForm';
import MedicoList from './components/Medico/MedicoList';
import PacienteForm from './components/Paciente/PacienteForm';
import PacienteList from './components/Paciente/PacienteList';
import SignInForm from './components/InicioSesion/SignInForm';
import ClientForm from './components/Cita/CitaForm';
import ClientList from './components/Cita/CitaList';
import EspecialidadForm from './components/Especialidad/EspecialidadForm';
import EspecialidadList from './components/Especialidad/EspecialidadList';

import HorarioForm from './components/Horario/horarioForm.js';
import HorarioList from './components/Horario/HorarioList';

import DiaForm from './components/Dia/DiaForm';
import DiaList from './components/Dia/DiaList';

import FacturaForm from './components/Factura/FacturaForm';
import FacturaList from './components/Factura/FacturaList';
import Navbar from './components/Navbar';

export default function App() {
  const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
  const initialUserName = localStorage.getItem('userName') || '';

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);
  const [userName, setUserName] = useState(initialUserName);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const handleWindowPopstate = () => {
      if (isLoggedIn && window.location.pathname === "/ver/paciente") {
        setShouldShowDialog(true);
      }
    };
  
    window.addEventListener("popstate", handleWindowPopstate);
  
    return () => {
      window.removeEventListener("popstate", handleWindowPopstate);
    };
  }, [isLoggedIn]);

  const handleDialogYesClick = () => {
    setShouldShowDialog(false);
    handleLogout();
  };

  const handleDialogNoClick = () => {
    setShouldShowDialog(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={userName} />
      <Container>
      <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/ver/paciente" /> : <Navigate to="/iniciosesion/new" />
          }
          />
          <Route
            path="/iniciosesion/new"
            element={isLoggedIn ? <Navigate to="/" /> : <SignInForm onLogin={handleLogin} />}
          />
          {isLoggedIn ? (
            <>
                <Route path="/ver/paciente" element={<PacienteList />} />
                <Route path="/paciente/new" element={<PacienteForm />} />
                <Route path="/paciente/:IdPaciente/edit" element={<PacienteForm />} />

                <Route path="/ver/cita" element={<ClientList />} />
                <Route path="/cita/new" element={<ClientForm />} />
                <Route path="/cita/:IdCita/edit" element={<ClientForm />} />

                <Route path="/ver/medico" element={<MedicoList />} />
                <Route path="/medico/new" element={<MedicoForm />} />
                <Route path="/medico/:IdMedico/edit" element={<MedicoForm />} />

                <Route path="/ver/especialidad" element={<EspecialidadList />} />
                <Route path="/especialidad/new" element={<EspecialidadForm />} />
                <Route path="/especialidad/:IdEspecialidad/edit" element={<EspecialidadForm />} />

                <Route path="/ver/horario" element={<HorarioList />} />
                <Route path="/horario/new" element={<HorarioForm />} />
                <Route path="/horario/:IdHorario/edit" element={<HorarioForm />} />

                <Route path="/ver/dia" element={<DiaList />} />
                <Route path="/dia/new" element={<DiaForm />} />
                <Route path="/dia/:IdDia/edit" element={<DiaForm />} />

                <Route path="/ver/Factura" element={<FacturaList />} />
                <Route path="/Factura/new" element={<FacturaForm />} />
                <Route path="/Factura/:Id/edit" element={<FacturaForm />} />
            </>
          ) : null}
        </Routes>
      </Container>
      <Dialog open={shouldShowDialog} onClose={handleDialogNoClick}>
      <DialogTitle>Confirmar salida</DialogTitle>
      <DialogContent>
        <DialogContentText>¿Desea salir del sistema?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogNoClick} color="primary">
          No
        </Button>
        <Button onClick={handleDialogYesClick} color="primary">
          Sí
        </Button>
      </DialogActions>
    </Dialog>
    </BrowserRouter>
  );
}

