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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BotonVolver from "../Botones/BotonVolver";
import moment from "moment";
import validator from "validator";
import { api } from "../../API backend/api";
import { alertas } from "../alertas";
import MenuAppBar from "../Menu/MenuAppBar";

function ModificarEvento() {
  const params = useParams();
  let navigate = useNavigate();

  const [evento, setEvento] = useState({
    titulo: "",
    importante: false,
    fecha: "",
    fechaVencimiento: "",
    descripcion: "",
  });

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  useEffect(() => {
    (async () => {
      const eventoEncontrado = await api.obtenerEventoConPacienteYMedicoPorId(
        params.id
      );
      setEvento((estadoAnterior) => {
        return { ...estadoAnterior, ...eventoEncontrado };
      });

      const pacienteDelEvento = eventoEncontrado.paciente;
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteDelEvento };
      });
    })();
  }, [params.id]);

  const update = async () => {
    let fechaActual = new Date();
    if (evento.titulo.length === 0 || evento.descripcion.length === 0) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (evento.importante) {
      if (evento.fechaVencimiento !== null) {
        if (!validator.isDate(evento.fechaVencimiento)) {
          alertas.fechaErronea("vencimiento");
          return;
        } else if (evento.fechaVencimiento < fechaActual) {
          alertas.fechaInvalidaMenor("vencimiento");
          return;
        }
      }
    } else if (!evento.importante) {
      evento.fechaVencimiento = null;
    }
    //else if (
    //   evento.importante &&
    //   JSON.stringify(evento.fechaVencimiento) === "null"
    // ) {
    //   console.log("EVENTO IMPORTANTE CON FECHA VACÍA");
    //   console.log(evento.fechaVencimiento);
    // } else if (evento.importante && evento.fechaVencimiento !== null) {
    //   console.log("EVENTO IMPORTANTE Y FECHA DE VENCIMIENTO != NULL");
    //   console.log("Fecha de vencimiento: ", evento.fechaVencimiento);
    //   if (!validator.isDate(evento.fechaVencimiento)) {
    //     console.log("FECHA INVÁLIDA");
    //     alertas.fechaErronea("vencimiento");
    //     return;
    //   }
    //   if (
    //     evento.fechaVencimiento < fechaActual &&
    //     JSON.stringify(evento.fechaVencimiento) !== "null"
    //   ) {
    //     console.log("FECHA MENOR A HOY");
    //     alertas.fechaInvalidaMenor("vencimiento");
    //     return;
    //   }
    // } else if (!evento.importante) {
    //   console.log("FECHA NO IMPORTANTE");
    //   console.log(
    //     "Fecha de vencimiento: ",
    //     JSON.stringify(evento.fechaVencimiento)
    //   );
    //   evento.fechaVencimiento = null;
    // }
    const respuesta = await api.modificarEvento(params.id, { ...evento });
    if (respuesta) {
      alertas.alertaModificacionExitosa("evento");
      navigate(-1);
    } else {
      alertas.alertaProblemas();
    }
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
        &nbsp;&nbsp;&nbsp;Modificar evento / Datos del evento
      </Typography>
      <Card>
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
                  value={evento.fecha}
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
            <Grid item xs={12} container >
              <Grid item xs={2} style={{marginTop:12, marginBottom:10}}>
                <FormControlLabel 
                  size="small"
                  name="importante"
                  checked={evento.importante}
                  onChange={handleOnchange}
                  control={<Checkbox />}
                  label="Evento importante"
                />
              </Grid>
              {/* FECHA DE VENCIMIENTO */}
              <Grid item xs={4}>
                {evento.importante ? (
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
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
                size="small"
                fullWidth
                variant="outlined"
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
                variant="outlined"
                size="small"
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
          {/* ACÁ VENDRÍAN LOS DATOS DEL MÉDICO */}

          {/* DESCRIPCIÓN */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Descripción"
                multiline
                size="small"
                margin="normal"
                fullWidth
                rows={8}
                name="descripcion"
                value={evento.descripcion}
                onChange={handleOnchange}
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
                  onClick={update}
                >
                  Guardar cambios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ModificarEvento;
