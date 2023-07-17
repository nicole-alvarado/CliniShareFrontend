import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { api } from "../../API backend/api";
import { alertas } from "../alertas";
import { Navigate } from "react-router-dom";
import BotonVolver from "../Botones/BotonVolver";
import "dayjs/locale/es";
import moment from "moment";
import validator from "validator";
import InputTelefono from "../InputTelefono";

function RegistroMedico() {
  const [registrado, setRegistrado] = useState(false);
  const [passwordAVerificar, setPasswordAVerificar] = useState("");

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

  const verificarPassword = (password) => password === medico.password;

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    genero: "",
    sexo: "Femenino",
    telefono: "",
    direccion: "",
  });

  const guardar = async function () {
    if (
      medico.nombre.length === 0 ||
      medico.apellido.length === 0 ||
      medico.dni.length === 0 ||
      medico.matricula.length === 0 ||
      medico.email.length === 0 ||
      medico.password.length === 0 ||
      passwordAVerificar.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (!validator.isDate(medico.fechaNacimiento)) {
      alertas.fechaErronea("nacimiento");
      return;
    } else if (!isEmail(medico.email)) {
      alertas.alertaEmailInvalido();
      return;
    } else if (medico.password.length < 4) {
      alertas.passwordMinimaInvalida();
      return;
    } else if (!verificarPassword(passwordAVerificar)) {
      alertas.contraseñasDiferentes();
      return;
    } else {
      const medicoGuardado = await api.guardarMedicoUsuario(medico);
      if (medicoGuardado) {
        alertas.alertaExito("médico");
        setRegistrado(true);
      } else {
        alertas.alertaProblemas();
        return;
      }
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeVerificar = (event) => {
    let value = event.target.value;

    setPasswordAVerificar(value);
  };

  const handleChangeDni = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  const handleChangeTelefono = (event) => {
    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, telefono: event };
    });
  };

  const handleChangeFecha = (event) => {
    if (event === null) {
      event = {};
    } else {
      const value = event["$d"];
      setMedico((estadoAnterior) => {
        return { ...estadoAnterior, fechaNacimiento: value };
      });
    }
  };

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        style={{
          backgroundColor: "#4D4C4C",
          color: "white",
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
        }}
      >
        &nbsp;&nbsp;&nbsp;Registrarse
      </Typography>
      <Card>
        <CardContent>
          {/* DATOS DEL MÉDICO */}
          <Grid container direction="row" spacing={2}>
            {/* NOMBRE */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Nombre/s"
                type="text"
                name="nombre"
                value={medico.nombre}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* APELLIDO */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Apellido/s"
                type="text"
                name="apellido"
                value={medico.apellido}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* SEXO */}
            <Grid item xs={4} sm={2}>
              <TextField
                id="outlined-select-genero-native"
                select
                label="Sexo"
                name="sexo"
                value={medico.sexo}
                margin="normal"
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Seleccione su sexo"
                size="small"
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
                value={medico.dni}
                onChange={handleChangeDni}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* MÁTRICULA */}
            <Grid item xs={4} sm={3}>
              <TextField
                label="Mátricula habilitante"
                type="text"
                name="matricula"
                value={medico.matricula}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* FECHA DE NACIMIENTO */}
            <Grid item xs={4} sm={3}>
              <LocalizationProvider
                adapterLocale="es"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  label="Fecha de nacimiento"
                  name="fechaNacimiento"
                  value={medico.fechaNacimiento}
                  onChange={handleChangeFecha}
                  maxDate={moment().subtract(18, "years").toDate()}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      helperText="Campo obligatorio"
                      size="small"
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
                value={medico.genero}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DIRECCIÓN */}
            <Grid item xs={4} sm={8}>
              <TextField
                label="Dirección"
                type="text"
                name="direccion"
                value={medico.direccion}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
            {/* TELÉFONO */}
            <Grid item xs={4} sm={4}>
            <InputTelefono handleChangeTelefono={handleChangeTelefono} telefono={medico.telefono} styles="small"></InputTelefono>

            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>
            {/* CORREO ELECTRÓNICO */}
            <Grid item xs={4} sm={12}>
              <TextField
                label="Correo electrónico"
                type="text"
                name="email"
                value={medico.email}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Contraseña"
                type="password"
                name="password"
                value={medico.password}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Vuelva a escribir la contraseña"
                type="password"
                name="contraseñaVerificada"
                value={passwordAVerificar}
                onChange={handleChangeVerificar}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>
            {/* BOTÓN REGISTRARSE */}
            <Grid item xs={4} sm={8}>
              <Box textAlign="right">
                <Button
                  size="large"
                  variant="contained"
                  onClick={guardar}
                  style={{ fontWeight: "bold" }}
                >
                  REGISTRARSE
                </Button>
              </Box>
              {registrado ? <Navigate to={"/"}></Navigate> : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default RegistroMedico;
