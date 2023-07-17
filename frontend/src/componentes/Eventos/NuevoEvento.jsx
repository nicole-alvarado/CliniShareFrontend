import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import BotonVolver from "../Botones/BotonVolver";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import validator from "validator";
import { api } from "../../API backend/api";
import { alertas } from "../alertas";
import MenuAppBar from "../Menu/MenuAppBar";

function NuevoEvento() {
  const params = useParams();
  let navigate = useNavigate();
  moment.locale("es");

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const [evento, setEvento] = useState({
    titulo: "",
    importante: false,
    medicoId: usuario.medico.medicoId,
    pacienteId: params.id,
    descripcion: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    (async () => {
      const pacienteEncontrado = await api.obtenerPacienteById(params.id);

      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteEncontrado };
      });
    })();
  }, [params.id]);

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleOnchange = (e) => {
    if (e.target.name === "importante") {
      setEvento({ ...evento, [e.target.name]: e.target.checked });
    } else {
      setEvento({ ...evento, [e.target.name]: e.target.value });
    }
  };

  const handleChangeFecha = async (e) => {
    if (e === null) {
      e = {};
    } else {
      const value = e["$d"];

      setEvento((estadoAnterior) => {
        return { ...estadoAnterior, fechaVencimiento: value };
      });
    }
  };

  const handleSubmit = async (evento) => {
    try {
      if (evento.titulo.length === 0 || evento.descripcion.length === 0) {
        alertas.alertaCamposObligatorios();
        return;
      } else {
        let fechaActual = new Date();

        if (evento.fechaVencimiento === "") {
          evento.fechaVencimiento = null;
        } else {
          if (
            !validator.isDate(evento.fechaVencimiento) ||
            evento.fechaVencimiento.getFullYear() < fechaActual.getFullYear()
          ) {
            alertas.fechaErronea("vencimiento");
            return;
          }
        }
      }

      evento.pacienteId = params.id;
      evento.medicoId = usuario.medico.medicoId;
      const response = await api.crearEvento(evento);
      if (!response) {
        alertas.alertaProblemas();
      } else {
        alertas.alertaExito("evento");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          fontWeight: "bold",
          lineHeight: "2",
        }}
      >
        &nbsp;&nbsp;&nbsp;Nuevo evento / Datos del evento
      </Typography>

      <Card >
        <CardContent>
          {/* DATOS DEL EVENTO */}
          <Grid container direction="row" spacing={2}>
            {/* TÍTULO */}
            <Grid item xs={4} sm={9}>
              <TextField
                label="Título"
                type="text"
                name="titulo"
                value={evento.titulo}
                onChange={handleOnchange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* FECHA DE CREACIÓN */}
            <Grid item xs={4} sm={3}>
              <LocalizationProvider
                adapterLocale="es"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  disabled
                  label="Fecha del evento"
                  inputFormat="DD/MM/YYYY"
                  name="fecha"
                  onChange={handleOnchange}
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
              <br></br>
              <FormControlLabel
                name="importante"
                value={evento.importante}
                onChange={handleOnchange}
                control={<Checkbox />}
                label="Evento importante"
                size="small"
              />
            </Grid>
            {/* FECHA DE VENCIMIENTO */}
            <Grid item xs={4} sm={4}>
              {evento.importante ? (
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    disabled={!evento.importante}
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    value={evento.fechaVencimiento}
                    onChange={handleChangeFecha}
                    minDate={moment().add(1, "days")}
                    renderInput={(params) => (
                      <TextField size="small" margin="normal" {...params} />
                    )}
                  />
                </LocalizationProvider>
              ) : null}
            </Grid>
          </Grid>
          <br></br>
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
          {/* NOMBRE DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="Nombre"
                type="text"
                name="nombre"
                value={paciente.nombre}
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
              ></TextField>
            </Grid>
            {/* APELLIDO DEL PACIENTE */}
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="Apellido"
                type="text"
                name="apellido"
                value={paciente.apellido}
                margin="normal"
                fullWidth
                size="small"
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
                fullWidth
                variant="outlined"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          {/* DESCRIPCIÓN */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Descripción"
                multiline
                margin="normal"
                fullWidth
                name="descripcion"
                onChange={handleOnchange}
                rows={8}
                value={evento.descripcion}
                size="small"
                helperText="Campo obligatorio"
              />
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            {/* VOLVER A ATRÁS */}
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>
            {/* GUARDAR */}
            <Grid item xs={4} sm={8}>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  size="medium"
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#007FFF",
                  }}
                  endIcon={<SaveIcon style={{ fontSize: 24 }} />}
                  onClick={() => handleSubmit(evento)}
                >
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default NuevoEvento;
