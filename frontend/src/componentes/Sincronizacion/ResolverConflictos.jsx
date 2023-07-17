import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../API backend/api";
import BotonVolver from "../Botones/BotonVolver";
import MenuAppBar from "../Menu/MenuAppBar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import RenglonesOpcion from "./RenglonesOpcion";
import { alertas } from "../alertas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ResolverConflictos() {
  const navigate = useNavigate();
  const params = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [pacienteExterno, setPacienteExterno] = useState({
    conflictoId: "",
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    genero: "",
    sexo: "",
    telefono: "",
    direccion: "",
    email: "",
    computadoraId: "",
  });

  const [estadoPacienteExterno, setEstadoPacienteExterno] = useState({
    conflictoId: true,
    nombre: false,
    apellido: false,
    dni: true,
    fechaNacimiento: true,
    fechaDefuncion: false,
    genero: false,
    sexo: false,
    telefono: false,
    direccion: false,
    email: false,
    computadoraId: true,
  });

  const [pacienteLocal, setPacienteLocal] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    genero: "",
    sexo: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const [estadoPacienteLocal, setEstadoPacienteLocal] = useState({
    nombre: false,
    apellido: false,
    dni: false,
    fechaNacimiento: false,
    fechaDefuncion: false,
    genero: false,
    sexo: false,
    telefono: false,
    direccion: false,
    email: false,
  });

  const guardar = async function () {
    resolverConflictos(pacienteResueltoAux);
  };

  const resolverConflictos = async function (p) {
    const respuesta = await api.resolverConflictos(p);
    if (respuesta === "") {
      alertas.alertaModificacionExitosa("paciente");
      navigate(-1);
    } else {
      alertas.alertaProblemas();
    }
  };

  function setAtributoPacienteResuelto(atributo, valor) {
    pacienteResueltoAux[atributo] = valor;
    console.log("PACIENTE  : ", pacienteResueltoAux);
  }

  const pacienteResueltoAux = pacienteExterno;

  useEffect(() => {
    (async () => {
      const respuestaPacienteConflictivo = await api.obtenerPacienteConflictivo(
        params.dni
      );
      setPacienteExterno((estadoAnterior) => {
        return { ...estadoAnterior, ...respuestaPacienteConflictivo };
      });

      const respuestaPaciente = await api.obtenerPacienteByDni(params.dni);
      setPacienteLocal((estadoAnterior) => {
        return { ...estadoAnterior, ...respuestaPaciente };
      });
    })();
  }, [params.dni]);

  useEffect(() => {
    // setPacienteResuelto({ ...pacienteExterno });
    console.log("AUX: ", pacienteResueltoAux);
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "auto" }}>
        <Grid container direction="row">
          <Grid item xs={4} sm={12}>
            <MenuAppBar></MenuAppBar>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} style={{marginBottom:10}}>
          <Grid item xs={12}>
            <Typography
              style={{
                backgroundColor: "#0c5774",
                color: "white",
                textAlign: "center",
                lineHeight: "2",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Conflictos en datos del paciente
            </Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid sm={2.67}>
            <Typography
              style={{
                color: "#0c5774",
                textAlign: "center",
                lineHeight: "2",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              DATOS INTERNOS
            </Typography>
          </Grid>
          <Grid sm={2.55}>
            <Typography
              style={{
                color: "#0c5774",
                textAlign: "center",
                lineHeight: "2",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              DATOS EXTERNOS
            </Typography>
          </Grid>
          <Grid sm={2.55}>
            <Typography
              style={{
                marginLeft:20,
                color: "#0c5774",
                textAlign: "left",
                lineHeight: "2",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Paciente actualizado
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={10}>
            <RenglonesOpcion
              paciente={pacienteLocal}
              conflicto={pacienteExterno}
              setAtributoPacienteResuelto={setAtributoPacienteResuelto}
            ></RenglonesOpcion>
          </Grid>
          <Grid item xs={1.5}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box textAlign="right">
              <Button
                size="large"
                variant="contained"
                style={{ fontWeight: "bold" }}
                onClick={guardar}
              >
                &nbsp;&nbsp;Guardar&nbsp;&nbsp;
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid item xs={12} container style={{ marginTop: 15 }}>
        <Button
          style={{ border: "1px solid #0c5774", marginLeft: 18 }}
          variant="outlined"
          startIcon={
            <ArrowBackIcon
              style={{ color: "#0c5774", fontWeight: "bold" }}
            ></ArrowBackIcon>
          }
          onClick={() => navigate(-1)}
        >
          <Typography variant="h7" color={"#0c5774"} fontWeight={"bold"}>
            Volver
          </Typography>
        </Button>
      </Grid>
    </>
  );
}

export default ResolverConflictos;
