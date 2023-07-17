import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import EventosDePaciente from "../Eventos/EventosDePaciente";
import EventosImportantes from "../Eventos/EventosImportantes";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import moment from "moment";
import BotonVolver from "../Botones/BotonVolver";
import validator from "validator";
import { api } from "../../API backend/api";
import { alertas } from "../alertas";
import MenuAppBar from "../Menu/MenuAppBar";
import InputTelefono from "../InputTelefono";

function ModificarPaciente() {
  const params = useParams();
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
  const [fechaAuxiliar, setFechaAuxiliar] = useState("");
  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    sexo: "",
    genero: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
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

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  useEffect(() => {
    (async () => {
      const pacienteRespuesta = await api.obtenerPacienteById(params.id);
      setFechaAuxiliar(pacienteRespuesta.fechaNacimiento);
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteRespuesta };
      });
    })();
  }, [params.id]);

  const update = async () => {
    if (
      paciente.nombre.length === 0 ||
      paciente.apellido.length === 0 ||
      paciente.dni.length === 0 ||
      paciente.fechaNacimiento.length === 0 ||
      paciente.direccion.length === 0 ||
      paciente.telefono.length === 0 ||
      paciente.email.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (
      !validator.isDate(paciente.fechaNacimiento) &&
      paciente.fechaNacimiento !== fechaAuxiliar
    ) {
      alertas.fechaErronea("nacimiento");
      return;
    } else if (paciente.fechaNacimiento > moment()) {
      alertas.fechaNacimientoPaciente();
      return;
    } else if (!isEmail(paciente.email)) {
      alertas.alertaEmailInvalido();
      return;
    } else {
      const respuesta = await api.modificarPaciente(params.id, { ...paciente });
      if (respuesta) {
        alertas.alertaModificacionExitosa("paciente");
        navigate(-1);
      } else {
        alertas.alertaProblemas();
      }
    }
  };
  return (
    <div>
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
        &nbsp;&nbsp;&nbsp;Datos del paciente / Edición
      </Typography>
      <Card>
        <CardContent>
          {/* DATOS DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              {/* DATOS DEL PACIENTE */}
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {/* NOMBRE */}

                <Grid item xs={4} sm={6}>
                  <TextField
                    label="Nombre/s"
                    type="text"
                    name="nombre"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.nombre}
                    onChange={handleChange}
                    size="small"
                  ></TextField>
                </Grid>
                {/* APELLIDO */}
                <Grid item xs={4} sm={6}>
                  <TextField
                    label="Apellido/s"
                    type="text"
                    name="apellido"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.apellido}
                    onChange={handleChange}
                    size="small"
                  ></TextField>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {/* DNI */}
                <Grid item xs={4} sm={6}>
                  <TextField
                    label="DNI"
                    type="text"
                    name="dni"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.dni}
                    onChange={handleChangeDni}
                    size="small"
                  ></TextField>
                </Grid>
                {/* FECHA DE NACIMIENTO */}
                <Grid item xs={4} sm={6}>
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      label="Fecha de nacimiento"
                      name="fechaNacimiento"
                      value={paciente.fechaNacimiento}
                      onChange={handleChangeFecha}
                      maxDate={moment().toDate()}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          fullWidth
                          variant="outlined"
                          helperText="Campo obligatorio"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <br></br>
              <Grid container direction="row" justifyContent="flex-end">
                {/* EVENTOS IMPORTANTES DEL PACIENTE */}
                <Grid item xs={4} sm={12}>
                  <EventosImportantes id={params.id}></EventosImportantes>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DOMICILIO */}
            <Grid item xs={4} sm={2}>
              <TextField
                label="Domicilio"
                type="text"
                name="direccion"
                margin="normal"
                fullWidth
                variant="outlined"
                value={paciente.direccion}
                onChange={handleChange}
                size="small"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* TELÉFONO */}
            <Grid item xs={4} sm={3}>
            <InputTelefono handleChangeTelefono={handleChangeTelefono} styles="small" telefono={paciente.telefono}></InputTelefono>

            </Grid>
            {/* CORREO ELECTRÓNICO */}
            <Grid item xs={4} sm={3}>
              <TextField
                label="Correo electróncio"
                type="text"
                name="email"
                margin="normal"
                fullWidth
                variant="outlined"
                value={paciente.email}
                onChange={handleChange}
                helperText="Campo obligatorio"
                size="small"
              ></TextField>
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
                value={paciente.genero}
                onChange={handleChange}
                size="small"
              ></TextField>
            </Grid>
            {/* SEXO */}
            <Grid item xs={4} sm={2}>
              <TextField
                id="outlined-select-sexo-native"
                select
                label="Sexo"
                name="sexo"
                value={paciente.sexo}
                margin="normal"
                size="small"
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
            <Grid item xs={2} sm={6}>
              <u
                style={{
                  color: "black",
                  textAlign: "left",
                  fontWeight: "bold",
                  lineHeight: 1,
                }}
              >
                <h3>Historia clínica</h3>
              </u>
            </Grid>
            <Grid item xs={2} sm={6}>
              <Box textAlign="right">
                <Link
                  to={"/eventos/new/paciente/" + params.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Tooltip title="Agregar evento">
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        backgroundColor: "#007FFF",
                      }}
                      startIcon={
                        <AddCircleOutlineTwoToneIcon
                          style={{ fontSize: 24 }}
                        ></AddCircleOutlineTwoToneIcon>
                      }
                    >
                      Agregar evento
                    </Button>
                  </Tooltip>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={12}>
              <EventosDePaciente id={params.id} />
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>

            <Grid item xs={4} sm={8}>
              <Box textAlign="right">
                <Button
                  size="medium"
                  variant="contained"
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#007FFF",
                  }}
                  startIcon={<SaveIcon style={{ fontSize: 24 }} />}
                  onClick={update}
                >
                  GUARDAR CAMBIOS
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ModificarPaciente;
