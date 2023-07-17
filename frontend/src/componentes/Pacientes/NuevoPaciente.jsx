import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { api } from "../../API backend/api";
import SaveIcon from "@mui/icons-material/Save";
import BotonVolver from "../Botones/BotonVolver";
import { alertas } from "../alertas";
import "dayjs/locale/es";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import validator from "validator";
import MenuAppBar from "../Menu/MenuAppBar";
import InputTelefono from "../InputTelefono";

function NuevoPaciente() {
  let navigate = useNavigate();
  const sexos = [
    {
      value: "Femenino",
      label: "Femenino",
    },
    {
      value: "Masculino",
      label: "Masculino",
    },
  ];
  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );
  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    sexo: "Femenino",
    genero: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  async function pacientePorDni(pacienteDni) {
    const pacientesExistentes = await api.obtenerPacientes();

    return pacientesExistentes.data.some((element) => {
      return element.dni === pacienteDni;
    });
  }

  async function pacientePorEmail(email) {
    const pacientesExistentes = await api.obtenerPacientes();

    return pacientesExistentes.data.some((element) => {
      return element.email === email;
    });
  }

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGuardar();
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeFecha = (event) => {
    if (event === null) {
      event = {};
    } else {
      const value = event["$d"];
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, fechaNacimiento: value };
      });
    }
  };

  const handleChangeDni = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  const handleChangeTelefono = (event) => {

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, telefono: event };
    });
  };

  const handleGuardar = async function () {
    const dniExistente = await pacientePorDni(Paciente.dni);
    const emailExistente = await pacientePorEmail(Paciente.email);

    if (
      Paciente.nombre.length === 0 ||
      Paciente.apellido.length === 0 ||
      Paciente.dni.length === 0 ||
      Paciente.fechaNacimiento.length === 0 ||
      Paciente.sexo.length === 0 ||
      Paciente.direccion.length === 0 ||
      Paciente.telefono.length === 0 ||
      Paciente.email.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (dniExistente) {
      alertas.pacienteConDniExistente(Paciente.dni);
      return;
    } else if (!validator.isDate(Paciente.fechaNacimiento)) {
      alertas.fechaErronea("nacimiento");
      return;
    } else if (Paciente.fechaNacimiento > moment()) {
      alertas.fechaNacimientoPaciente();
    } else if (emailExistente) {
      alertas.pacienteConCorreoExistente();
    } else if (!isEmail(Paciente.email)) {
      alertas.alertaEmailInvalido();
      return;
    } else {
      const pacienteGuardado = await api.guardarPaciente(Paciente);
      if (pacienteGuardado === true) {
        alertas.alertaExito("paciente");
        navigate(-1);
      }
    }
  };

  return (
    <div onKeyDown={handleKeyPress}>
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
        &nbsp;&nbsp;&nbsp;Datos del paciente / Nuevo paciente
      </Typography>
      {/* DATOS DEL PACIENTE */}
      <Card >
        <CardContent>
          {/* DATOS DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            {/* NOMBRE */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Nombre/s"
                type="text"
                name="nombre"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                value={Paciente.nombre}
                onChange={handleChange}
              ></TextField>
            </Grid>
            {/* APELLIDO */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Apellido/s"
                type="text"
                name="apellido"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                value={Paciente.apellido}
                onChange={handleChange}
              ></TextField>
            </Grid>
            {/* SEXO */}
            <Grid item xs={4} sm={2}>
              <TextField
                id="outlined-select-sexo-native"
                select
                label="Sexo"
                name="sexo"
                value={Paciente.sexo}
                margin="normal"
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Seleccione el sexo"
              >
                {sexos.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DNI */}
            <Grid item xs={4} sm={4}>
              <TextField
                label="DNI"
                type="text"
                name="dni"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                value={Paciente.dni}
                onChange={handleChangeDni}
              ></TextField>
            </Grid>
            {/* FECHA DE NACIMIENTO */}
            <Grid item xs={4} sm={4}>
              <LocalizationProvider
                adapterLocale="es"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  label="Fecha de nacimiento"
                  name="fechaNacimiento"
                  value={Paciente.fechaNacimiento}
                  onChange={handleChangeFecha}
                  maxDate={moment()}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      helperText="Campo obligatorio"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* GÉNERO */}
            <Grid item xs={4} sm={2}>
              <TextField
                label="Género"
                type="text"
                name="genero"
                margin="normal"
                fullWidth
                variant="outlined"
                value={Paciente.genero}
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DOMICILIO */}
            <Grid item xs={4} sm={9}>
              <TextField
                label="Domicilio"
                type="text"
                name="direccion"
                margin="normal"
                fullWidth
                variant="outlined"
                value={Paciente.direccion}
                onChange={handleChange}
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* TELÉFONO */}
            <Grid item xs={4} sm={3}>
              <InputTelefono handleChangeTelefono={handleChangeTelefono} styles="medium"></InputTelefono>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* CORREO */}
            <Grid item xs={4} sm={8}>
              <TextField
                label="Correo electrónico"
                type="text"
                name="email"
                margin="normal"
                fullWidth
                variant="outlined"
                value={Paciente.email}
                onChange={handleChange}
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            {/* VOLVER A ATRÁS */}
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>
            {/* BOTÓN GUARDAR PACIENTE */}
            <Grid item xs={4} sm={8}>
              <Box textAlign="right">
                <Tooltip title="Guardar">
                  <Button
                    variant="contained"
                    endIcon={<SaveIcon style={{ fontSize: 24 }} />}
                    onClick={handleGuardar}
                    size="medium"
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      backgroundColor: "#007FFF",
                    }}
                  >
                    Guardar
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default NuevoPaciente;
