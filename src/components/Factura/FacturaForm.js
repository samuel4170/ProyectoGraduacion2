import { Autocomplete, Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


          import pdfMake from 'pdfmake/build/pdfmake';
          import pdfFonts from 'pdfmake/build/vfs_fonts';

          // Configurar las fuentes de pdfmake
          pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function FacturaForm() {
  const [factura, setFactura] = useState({
    IdCliente: '',
    IdEmpleado: '',
    LecturaActual: '',
    LecturaAntigua: '',
    FechaEmision: new Date().toISOString().slice(0, 10),
    IdObservacion: '',
    Consumo: '',
    Total: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [cliente, setCliente] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [observacion, setObservacion] = useState([]);
  const [TipoTarifa, setTipoTarifa] = useState('');
  const [precio, setPrecio] = useState('');
  
  



  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    if (editing) {
      await fetch(`http://localhost:4000/api/factura/${params.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });
    } else {
      await fetch('http://localhost:4000/api/factura', {
        method: 'POST',
        body: JSON.stringify(factura),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    setLoading(false);
    navigate('/ver/factura');
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'LecturaActual' || name === 'LecturaAntigua') {
      const lecturaActual = name === 'LecturaActual' ? parseInt(value) : parseInt(factura.LecturaActual);
      const lecturaAntigua = name === 'LecturaAntigua' ? parseInt(value) : parseInt(factura.LecturaAntigua);
      const consumo = Math.abs(lecturaActual - lecturaAntigua);

      setFactura((prevFactura) => ({
        ...prevFactura,
        [name]: value,
        Consumo: consumo.toString(), // Convertir el consumo calculado a string
      }));
    } else {
      setFactura((prevFactura) => ({ ...prevFactura, [name]: value }));
    }
  };

  const handleClienteChange = (event, value) => {
    setFactura((prevFactura) => ({ ...prevFactura, IdCliente: value ? value.Id : '' }));
  };

  const handleEmpleadoChange = (event, value) => {
    setFactura((prevFactura) => ({ ...prevFactura, IdEmpleado: value ? value.Id : '' }));
  };

  const handleObservacionChange = (event, value) => {
    setFactura((prevFactura) => ({ ...prevFactura, IdObservacion: value ? value.Id : '' }));
  };

  const loadFactura = async (id) => {
    const res = await fetch(`http://localhost:4000/api/factura/${id}`);
    const data = await res.json();
    setFactura(data);
    setEditing(true);
  };

  useEffect(() => {
    if (params.Id) {
      loadFactura(params.Id);
    }
  }, [params.Id]);

  useEffect(() => {
    // Cargar los datos de los clientes desde la API
    fetch('http://localhost:4000/api/cliente')
      .then((response) => response.json())
      .then((data) => {
        setCliente(data);
      });

    // Cargar los datos de los empleados desde la API
    fetch('http://localhost:4000/api/empleado')
      .then((response) => response.json())
      .then((data) => {
        setEmpleado(data);
      });

    // Cargar los datos de las observaciones desde la API
    fetch('http://localhost:4000/api/observacion')
      .then((response) => response.json())
      .then((data) => {
        setObservacion(data);
      });
  }, []);

  useEffect(() => {
    if (factura.IdCliente) {
      // Obtener el cliente seleccionado
      const selectedCliente = cliente.find((c) => c.Id === factura.IdCliente);
  
      // Obtener el precio del tipo de cliente seleccionado
      if (selectedCliente) {
        fetch(`http://localhost:4000/api/tipocliente/${selectedCliente.IdTipoCliente}`)
          .then((response) => response.json())
          .then((data) => {
            setPrecio(data.Precio);
          });
  
          fetch(`http://localhost:4000/api/tipocliente/${selectedCliente.IdTipoCliente}`)
          .then((response) => response.json())
          .then((data) => {
            setTipoTarifa(data.TipoTarifa);
          });
      }
    }
  }, [factura.IdCliente, cliente]);
  
  const handleGuardar = () => {

    // Definir la estructura del documento PDF

    
    const documentDefinition = {
      content: [
        {
          text: 'ELECTROMATIC',
          style: 'header',
        },
        {
          text: 'Compañía eléctrica',
          style: 'subHeader',
        },
        {
          text: 'Diagonal 5-10-50 zona 10 Internacional World Center Torre Sur Nivel 14',
          style: 'normalText',
        },
        {
          text: 'ATENCIÓN AL CLIENTE, TELEFONO 9876-5432',
          style: 'normalText',
        },
        {
          text: 'GUATEMALA, GUATEMALA',
          style: 'boldText',
        },
        {
          text: 'Factura Contingencia',
          style: 'boldText',
        },
//--------------------------------------------------------------------------------------------------------------------
{
  alignment: 'right', // Alineación a la derecha del texto
  columns: [
    { text: 'Fecha:', style: 'label' },
  ],
},

{
  alignment: 'right', // Alineación a la derecha del texto
  columns: [
    { text: factura.FechaEmision, style: 'label' },
  ],
},


        { text: 'Nombre:', style: 'label', },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.Nombre || '', style: 'valueLarge' },
    
        { text: 'NIS:', style: 'label' },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.Nis || '', style: 'valueLarge' },
    
        { text: 'Dirección:', style: 'labelBold' },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.Direccion || '', style: 'value' },
    
        { text: 'Email:', style: 'labelBold' },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.Email || '', style: 'value' },
    
        { text: 'Teléfono:', style: 'labelBold' },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.Telefono || '', style: 'value' },
    
        { text: '\n\n' }, // Agrega saltos de línea adicionales para aumentar el espacio
 
//--------------------------------------------------------------------------------------------------------------------
{
  alignment: 'right', // Alineación centrada del cuadro
  table: {
    
    widths: ['auto', 'auto'], // Ancho de las columnas del cuadro
    body: [
      [{ text: 'Consumo:', style: 'label', bold: true }, { text: factura.Consumo, style: 'label' }], // Contenido de la primera fila
      [{ text: 'Nombre Tarifa:', style: 'label', bold: true }, { text: TipoTarifa, style: 'label' }], // Contenido de la segunda fila
      [{ text: 'Tarifa:', style: 'label', bold: true }, { text: precio, style: 'label' }], // Contenido de la tercera fila
      [{ text: 'Total', style: 'label', bold: true, fontSize: 20 }, { text: factura.Total, style: 'label', fontSize: 20 }], // Encabezados de las columnas
      // ...puedes agregar más filas según sea necesario
    ],
  },
},

{ text: '\n\n' }, // Agrega saltos de línea adicionales para aumentar el espacio
//--------------------------------------------------------------------------------------------------------------------
{
  style: 'table',
  table: {
    widths: ['*', '*'], // Ancho de las columnas
    body: [
      // Primera parte
      [
        { text: 'No. Contador', style: 'label', bold: true, fontSize: 14  },
        { text: cliente.find((c) => c.Id === factura.IdCliente)?.NumeroContador || '', style: 'label' },                
      ],

      [
        { text: 'Lectura Antigua', style: 'label', bold: true, fontSize: 14  },
        { text: factura.LecturaAntigua, style: 'label' },
      ],
      // Segunda parte
      [
        { text: 'Lectura Actual', style: 'label', bold: true, fontSize: 14  },
        { text: factura.LecturaActual, style: 'label' },
      ],
      [
        { text: 'Consumo', style: 'label', bold: true, fontSize: 14  },
        { text: factura.Consumo, style: 'label' },
      ],
      [
        { text: 'Total', style: 'label', bold: true, fontSize: 14  },
        { text: factura.Total, style: 'label' },
      ],
    ],
  },
  layout: 'lightHorizontalLines', // Líneas horizontales ligeras
},

{ text: '\n\n' }, // Agrega saltos de línea adicionales para aumentar el espacio
//--------------------------------------------------------------------------------------------------------------------
{
  text: 'Recuerde mantener su cuenta al día y evite pagar intereses sobre montos adeudados \nEl plazo de vencimiento de la factura es de 30 días después de su fecha de emisión \nEl importe de las facturas vencidas no incluye intereses por mora con iva Sugeto a pegos trimestrales ',
  style: 'normalText',
},



        // Resto del contenido del PDF...
      ],
      styles: {
        header: {
          fontSize: 25,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subHeader: {
          fontSize: 23,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        normalText: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        boldText: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        label: {
          bold: true,
          fontSize: 12,
          margin: [0, 2, 0, 0],
        },
        labelBold: {
          bold: true,
          fontSize: 9,
          margin: [0, 2, 0, 0],
        },
        value: {
          fontSize: 9,
          margin: [0, 0, 0, 5],
        },
        valueLarge: {
          fontSize: 18,
          margin: [0, 0, 0, 5],
        },

        

      },
    };

    
    
    
    
    
    
    
    
    

    // Generar el PDF y abrirlo en una nueva ventana
    pdfMake.createPdf(documentDefinition).open();
    // Generar el PDF y descargarlo
    // const pdfDocGenerator = pdfMake.createPdf(documentDefinition); pdfDocGenerator.download('factura.pdf');
  };

  useEffect(() => {
    // Calcular el total multiplicando el precio por el consumo
    if (precio && factura.Consumo) {
      const total = parseFloat(precio) * parseFloat(factura.Consumo);
      setFactura((prevFactura) => ({ ...prevFactura, Total: total.toFixed(2) }));
    }
  }, [precio, factura.Consumo]);


  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? 'Editar Datos de Factura' : 'Añadir Nueva Factura'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={cliente}
              getOptionLabel={(option) => option.Nombre}
              value={cliente.find((option) => option.Id === factura.IdCliente) || null}
              onChange={handleClienteChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Cliente"
                  sx={{ display: 'block', margin: '.5rem 0' }}
                  name="IdCliente"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              )}
            />

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Nis:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.Nis || ''}
              </Typography>
            )}

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Direccion:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.Direccion || ''}
              </Typography>
            )}

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Email:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.Email || ''}
              </Typography>
            )}

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Telefono:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.Telefono || ''}
              </Typography>
            )}            

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>NumeroContador:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.NumeroContador || ''}
              </Typography>
            )}  

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>IdTipoCliente:</strong> {cliente.find((c) => c.Id === factura.IdCliente)?.IdTipoCliente || ''}
              </Typography>
            )}

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Tarifa:</strong> {TipoTarifa}
              </Typography>
            )}

            {factura.IdCliente && (
              <Typography variant="body1" sx={{ display: 'block', margin: '.5rem 0' }} color="white">
                <strong>Tarifa:</strong> {precio}
              </Typography>
            )}


            <Autocomplete
              options={empleado}
              getOptionLabel={(option) => option.Nombre}
              value={empleado.find((option) => option.Id === factura.IdEmpleado) || null}
              onChange={handleEmpleadoChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Empleado"
                  sx={{ display: 'block', margin: '.5rem 0' }}
                  name="IdEmpleado"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              )}
            />

            <Autocomplete
              options={observacion}
              getOptionLabel={(option) => option.Descripcion}
              value={observacion.find((option) => option.Id === factura.IdObservacion) || null}
              onChange={handleObservacionChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Observación"
                  sx={{ display: 'block', margin: '.5rem 0' }}
                  name="IdObservacion"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              )}
            />

            <TextField
              variant="filled"
              label="Lectura Actual"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="LecturaActual"
              value={factura.LecturaActual}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <TextField
              variant="filled"
              label="Lectura Antigua"
              sx={{ display: 'block', margin: '.5rem 0' }}
              name="LecturaAntigua"
              value={factura.LecturaAntigua}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <TextField
              variant="filled"
              label="Consumo"
               sx={{ display: 'block', margin: '.5rem 0', width: '300px', textAlign: 'right' }}
              name="Consumo"
              value={factura.Consumo}
              inputProps={{ readOnly: true, style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <TextField
              variant="filled"
              label="Total"
              sx={{ display: 'block', margin: '.5rem 0', width: '300px', textAlign: 'right' }}
              name="Total"
              value={factura.Total}
              onChange={handleChange}
              inputProps={{ readOnly: true, style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

          <Button variant="contained"
              color="primary"
              type="submit"
              disabled={
                !factura.IdCliente ||
                !factura.IdEmpleado ||
                !factura.LecturaActual ||
                !factura.LecturaAntigua ||
                !factura.FechaEmision ||
                !factura.IdObservacion ||
                !factura.Consumo ||
                !factura.Total
              }          
           onClick={handleGuardar}>
            Guardar y Generar PDF
            
          </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}