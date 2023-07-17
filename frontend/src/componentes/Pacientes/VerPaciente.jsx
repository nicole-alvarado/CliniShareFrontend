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
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventosImportantes from "../Eventos/EventosImportantes";
import EventosDePaciente from "../Eventos/EventosDePaciente";
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BotonVolver from "../Botones/BotonVolver";
import { api } from "../../API backend/api";
import MenuAppBar from "../Menu/MenuAppBar";

function VerPaciente() {
  const params = useParams();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    sexo: "",
    genero: "",
    direccion: "",
    telefono: "",
    email: "",
  });

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

  useEffect(() => {
    (async () => {
      const paciente = await api.obtenerPacienteById(params.id);
      setNombreCompleto(paciente.nombre + " " + paciente.apellido);
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...paciente };
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
        }}
      >
        &nbsp;&nbsp;&nbsp;Datos del paciente / Visualización
      </Typography>
      <Card>
        <CardContent>
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
                {/* NOMBRE Y APELLIDO*/}
                <Grid item xs={4} sm={12}>
                  <TextField
                    disabled
                    label="Nombre completo"
                    type="text"
                    name="nombre"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    value={nombreCompleto}
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
                    disabled
                    label="DNI"
                    type="text"
                    name="dni"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    value={paciente.dni}
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
                      disabled
                      label="Fecha de nacimiento"
                      name="fechaNacimiento"
                      value={paciente.fechaNacimiento}
                      onChange={handleChangeFecha}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          fullWidth
                          variant="outlined"
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
          <Grid container direction="row" spacing={1}>
            {/* DOMICILIO */}
            <Grid item xs={4} sm={2}>
              <TextField
                disabled
                label="Domicilio"
                type="text"
                name="direccion"
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                value={paciente.direccion}
              ></TextField>
            </Grid>
            {/* DOMICILIO */}
            <Grid item xs={4} sm={3}>
              <TextField
                disabled
                label="Teléfono"
                type="text"
                name="telefono"
                margin="normal"
                fullWidth
                variant="outlined"
                size="small"
                value={paciente.telefono}
              ></TextField>
            </Grid>
            {/* CORREO ELECTRÓNICO */}
            <Grid item xs={4} sm={3}>
              <TextField
                disabled
                label="Correo electróncio"
                type="text"
                name="email"
                margin="normal"
                fullWidth
                variant="outlined"
                value={paciente.email}
                size="small"
              ></TextField>
            </Grid>
            {/* GÉNERO */}
            <Grid item xs={4} sm={2}>
              <TextField
                disabled
                label="Género"
                type="text"
                name="genero"
                margin="normal"
                fullWidth
                variant="outlined"
                value={paciente.genero}
                size="small"
              ></TextField>
            </Grid>
            {/* SEXO */}
            <Grid item xs={4} sm={2}>
              <TextField
                disabled
                type="text"
                label="Sexo"
                name="sexo"
                fullWidth
                value={paciente.sexo}
                variant="outlined"
                margin="normal"
                size="small"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <u>
                <h3
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontWeight: "bold",
                    lineHeight: 1,
                  }}
                >
                  Historia clínica
                </h3>
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

          <EventosDePaciente id={params.id} />

          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default VerPaciente;
