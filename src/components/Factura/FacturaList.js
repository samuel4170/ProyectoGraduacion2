import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FacturaList() {
  const [facturas, setFacturas] = useState([]);
  const [allclientes, setAllClientes] = useState([]);
  const [allempleados, setAllEmpleados] = useState([]);
  const [allobservaciones, setAllObservaciones] = useState([]);

  const navigate = useNavigate();

  const loadFactura = async () => {
    const response = await fetch('http://localhost:4000/api/factura');
    const data = await response.json();
    setFacturas(data);
  };

  const loadAllClientes = async () => {
    const response = await fetch('http://localhost:4000/api/cliente');
    const data = await response.json();
    setAllClientes(data);
  };

  const loadAllEmpleados = async () => {
    const response = await fetch('http://localhost:4000/api/empleado');
    const data = await response.json();
    setAllEmpleados(data);
  };

  const loadAllObservaciones = async () => {
    const response = await fetch('http://localhost:4000/api/observacion');
    const data = await response.json();
    setAllObservaciones(data);
  };



  useEffect(() => {
    loadFactura();
    loadAllClientes();
    loadAllEmpleados();
    loadAllObservaciones();
  }, []);

  const getAllCliente = (IdCliente) => {
    const AllCliente = allclientes.find((cliente) => cliente.Id === IdCliente);
    return AllCliente ? AllCliente.Nombre : '';
  };

  const getAllEmpleado = (IdEmpleado) => {
    const tipoMedidor = allempleados.find((empleado) => empleado.Id === IdEmpleado);
    return tipoMedidor ? tipoMedidor.Nombre : '';
  };

  const getAllObservacion = (IdObservacion) => {
    const observacion = allobservaciones.find((obs) => obs.Id === IdObservacion);
    return observacion ? observacion.Descripcion : '';
  };

  return (
    <>
      <h1>Lista de Facturas</h1>
      {facturas.map((factura) => (
        <Card
          key={factura.Id}
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
              <Typography variant="subtitle1" fontWeight="bold">
                Nombre del cliente:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {getAllCliente(factura.IdCliente)}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Nombre del empleado:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {getAllEmpleado(factura.IdEmpleado)}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Lectura actual:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {factura.LecturaActual}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Lectura antigua:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {factura.LecturaAntigua}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Fecha:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {factura.FechaEmision}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Observación:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {getAllObservacion(factura.IdObservacion)}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Consumo:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {factura.Consumo}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Total:
              </Typography>
              <Typography style={{ marginLeft: '1em' }}>
                {factura.Total}
              </Typography>
            </div>

          </CardContent>
        </Card>
      ))}
    </>
  );
}
