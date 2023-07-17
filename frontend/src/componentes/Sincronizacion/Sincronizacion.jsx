import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PacienteASincronizar from "./PacienteASincronizar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BotonVolver from "../Botones/BotonVolver";
import MenuAppBar from "../Menu/MenuAppBar";
import { api } from "../../API backend/api";

function Sincronizacion() {
  const params = useParams();

  const [pacienteExterno, setPacienteExterno] = useState({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    domicilio: "",
    genero: "",
    sexo: "",
  });

  const [estadoPacienteExterno, setEstadoPacienteExterno] = useState({
    idNuevo: false,
    nombreNuevo: false,
    apellidoNuevo: false,
    dniNuevo: false,
    fechaNacimientoNuevo: false,
    telefonoNuevo: false,
    domicilioNuevo: false,
    generoNuevo: false,
    sexoNuevo: false,
  });

  const [pacienteLocal, setPacienteLocal] = useState({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    domicilio: "",
    genero: "",
    sexo: "",
  });

  const [estadoPacienteLocal, setEstadoPacienteLocal] = useState({
    idNuevo: false,
    nombreNuevo: false,
    apellidoNuevo: false,
    dniNuevo: false,
    fechaNacimientoNuevo: false,
    telefonoNuevo: false,
    domicilioNuevo: false,
    generoNuevo: false,
    sexoNuevo: false,
  });

  const pacientesLocalesData = [
    {
      id: "1",
      nombre: "Nicole",
      apellido: "Alvarado",
      dni: "43032135",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "2",
      nombre: "Gianella",
      apellido: "Zeballos",
      dni: "43036123",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "3",
      nombre: "Teodoro",
      apellido: "Fernández",
      dni: "41238023",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "4",
      nombre: "Ismael",
      apellido: "Cruz",
      dni: "40026199",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
  ];

  const pacientesOtrosData = [
    {
      id: "1",
      nombre: "Nicol",
      apellido: "Alvarado Rodriguez",
      dni: "43032135",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "2",
      nombre: "Yanela",
      apellido: "Zeballos",
      dni: "43036123",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "3",
      nombre: "Teo",
      apellido: "Fernandez",
      dni: "41238023",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "4",
      nombre: "Ismael Teo",
      apellido: "Cruz",
      dni: "40026199",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
  ];

  const handleChangePacienteLocal = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;

    console.log("CHECKED " + event.target.checked);
    console.log("NAME " + event.target.name);

    setEstadoPacienteLocal({ ...estadoPacienteLocal, [name]: checked });
  };

  const handleChangePacienteExterno = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;

    console.log("CHECKED " + event.target.checked);
    console.log("NAME " + event.target.name);

    setEstadoPacienteExterno({ ...estadoPacienteExterno, [name]: checked });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const obtenerPacienteLocal = () => {
    const pacienteLocal = pacientesLocalesData.find(
      (element) => element.id === params.id
    );
    setPacienteLocal((estadoAnterior) => {
      return { ...estadoAnterior, ...pacienteLocal };
    });
    setEstadoPacienteLocal((estadoAnterior) => {
      return { ...estadoAnterior, ...estadoPacienteLocal };
    });
  };

  const obtenerPacienteExterno = () => {
    const pacienteExterno = pacientesOtrosData.find(
      (element) => element.id === params.id
    );
    setPacienteExterno((estadoAnterior) => {
      return { ...estadoAnterior, ...pacienteExterno };
    });
    setEstadoPacienteExterno((estadoAnterior) => {
      return { ...estadoAnterior, ...estadoPacienteExterno };
    });
  };

  useEffect(() => {
    (async () => {
      const response =
      await api.obtenerPacienteConConflictos();

      obtenerPacienteLocal();
      obtenerPacienteExterno();
    })();
  }, []);
  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "auto" }}>
        <Grid container direction="row">
          <Grid item xs={4} sm={12}>
            <MenuAppBar></MenuAppBar>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Item>Conflictos en datos del paciente</Item>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={6}>
            <Typography>&nbsp;&nbsp;Datos del paciente localmente</Typography>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombreNuevo"
                  checked={estadoPacienteLocal.nombreNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.nombre}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Apellido:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="apellidoNombre"
                  checked={estadoPacienteLocal.apellidoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.apellido}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel component="legend">DNI:</FormLabel>
                  <FormControlLabel
                    value="start"
                    size="small"
                    name="dniNuevo"
                    checked={estadoPacienteLocal.dniNuevo}
                    control={<Checkbox />}
                    onChange={handleChangePacienteLocal}
                    label={pacienteLocal.dni}
                    labelPlacement="start"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaNacimientoNuevo"
                  checked={estadoPacienteLocal.fechaNacimientoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.fechaNacimiento}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Sexo:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="sexoNuevo"
                  checked={estadoPacienteLocal.sexoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.sexo}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Género:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="generoNuevo"
                  checked={estadoPacienteLocal.generoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.genero}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Domicilio:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="domicilioNuevo"
                  checked={estadoPacienteLocal.domicilioNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.domicilio}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Teléfono:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="telefonoNuevo"
                  checked={estadoPacienteLocal.telefonoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.telefono}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Typography>&nbsp;&nbsp;Datos del paciente externo</Typography>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombreNuevo"
                  checked={estadoPacienteExterno.nombreNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.nombre}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Apellido:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="apellidoNombre"
                  checked={estadoPacienteExterno.apellidoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.apellido}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel component="legend">DNI:</FormLabel>
                  <FormControlLabel
                    value="start"
                    size="small"
                    name="dniNuevo"
                    checked={estadoPacienteExterno.dniNuevo}
                    control={<Checkbox />}
                    onChange={handleChangePacienteExterno}
                    label={pacienteExterno.dni}
                    labelPlacement="start"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaNacimientoNuevo"
                  checked={estadoPacienteExterno.fechaNacimientoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.fechaNacimiento}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Sexo:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="sexoNuevo"
                  checked={estadoPacienteExterno.sexoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.sexo}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Género:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="generoNuevo"
                  checked={estadoPacienteExterno.generoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.genero}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Domicilio:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="domicilioNuevo"
                  checked={estadoPacienteExterno.domicilioNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.domicilio}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Teléfono:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="telefonoNuevo"
                  checked={estadoPacienteExterno.telefonoNuevo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.telefono}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <br></br>
        <BotonVolver> </BotonVolver>
        <br></br>
        <br></br>
        {/* <Button variant="outlined" onClick={actualizarPaciente}>
          Actualizar
        </Button> */}
      </Box>
    </>
  );
}

export default Sincronizacion;
