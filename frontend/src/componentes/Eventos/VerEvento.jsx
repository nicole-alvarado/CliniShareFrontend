import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../API backend/api";
import { useParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BotonVolver from "../Botones/BotonVolver";
import MenuAppBar from "../Menu/MenuAppBar";

function VerEvento() {
  const params = useParams();

  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    importante: false,
    fecha: "",
    fechaVencimiento: "",
  });

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
  });

  useEffect(() => {
    (async () => {
      const eventoEncontrado = await api.obtenerEventoConPacienteYMedicoPorId(
        params.id
      );
      const pacienteDelEvento = eventoEncontrado.paciente;
      const medicoDelEvento = eventoEncontrado.medico;

      setEvento((estadoAnterior) => {
        return { ...estadoAnterior, ...eventoEncontrado };
      });
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteDelEvento };
      });
      setMedico((estadoAnterior) => {
        return { ...estadoAnterior, ...medicoDelEvento };
      });
    })();
  }, [params.id]);

  return (
    <>
    <MenuAppBar></MenuAppBar>
      <Typography
        component="h6"
        variant="h6"
        style={{
          backgroundColor: "#0c5774",
          color: "white",
          textAlign: "left",
          lineHeight: "2",
        }}
      >
        &nbsp;&nbsp;&nbsp;Datos del evento
      </Typography>
      <Card>
        <CardContent>
          {/* DATOS DEL EVENTO */}
          <Grid container direction="row" spacing={2}>
            {/* TÍTULO */}
            <Grid item xs={4} sm={10}>
              <TextField
                disabled
                label="Título"
                type="text"
                size="small"
                name="titulo"
                value={evento.titulo}
                margin="normal"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
            {/* FECHA DE CREACIÓN */}
            <Grid item xs={4} sm={2}>
              <LocalizationProvider
                adapterLocale="es"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  disabled
                  label="Fecha del evento"
                  inputFormat="DD/MM/YYYY"
                  name="fecha"
                  value={evento.fecha}
                  onChange={(e) => e.target.value}
                  renderInput={(params) => (
                    <TextField margin="normal" size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>
            {/* IMPORTANTE */}
            <Grid item xs={4} sm={2}>
              <TextField 
                disabled
                label="Situación"
                type="text"
                size="small"
                name="importante"
                value={evento.importante ? "Evento importante" : "Evento no importante"}
                margin="normal"
                variant="outlined"
              ></TextField>
            </Grid>
            {/* FECHA DE VENCIMIENTO */}
            <Grid item xs={4} sm={4}>
              {evento.importante ? (
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    disabled
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    value={evento.fechaVencimiento}
                    onChange={(e) => e.target.value}
                    renderInput={(params) => (
                      <TextField size="small" margin="normal" {...params} />
                    )}
                  />
                </LocalizationProvider>
              ) : null}
            </Grid>
          </Grid>
          {/* DATOS DEL PACIENTE */}
          <Typography
            component="h6"
            variant="h6"
            style={{
              color: "#0c5774",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            &nbsp;Datos del paciente
          </Typography>
          <Grid container direction="row" spacing={2}>
            {/* NOMBRE DEL PACIENTE */}
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="Nombre/s"
                type="text"
                size="small"
                name="nombre"
                value={paciente.nombre}
                margin="normal"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
            {/* APELLIDO DEL PACIENTE */}

            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="Apellido/s"
                type="text"
                size="small"
                name="apellido"
                value={paciente.apellido}
                margin="normal"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
            {/* DNI DEL PACIENTE */}
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="DNI"
                type="text"
                name="pacienteDni"
                value={paciente.dni}
                margin="normal"
                size="small"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          {/* DATOS DEL MÉDICO */}
          <Typography
            component="h6"
            variant="h6"
            style={{
              color: "#0c5774",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            &nbsp;Datos del médico
          </Typography>
          {/* NOMBRE DEL MÉDICO */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3} sm={3}>
              <TextField
                disabled
                label="Nombre/s"
                type="text"
                size="small"
                name="nombre"
                value={medico.nombre}
                margin="normal"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
            {/* APELLIDO DEL MÉDICO */}
            <Grid item xs={3} sm={3}>
              <TextField
                disabled
                label="Apellido/s"
                type="text"
                size="small"
                name="apellido"
                value={medico.apellido}
                margin="normal"
                fullWidth
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
          {/* DESCRIPCIÓN */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={12}>
              <TextField
                disabled
                label="Descripción"
                multiline
                size="small"
                margin="normal"
                fullWidth
                rows={6}
                value={evento.descripcion}
              />
            </Grid>
          </Grid>
          {/* VOLVER A ATRÁS */}
          <Grid item xs={10}>
            <BotonVolver></BotonVolver>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default VerEvento;
