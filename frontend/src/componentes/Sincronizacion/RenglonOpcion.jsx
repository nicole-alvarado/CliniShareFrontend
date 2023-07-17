import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";

function RenglonOpcion({ titulo, val1, val2, setAtributoPacienteResuelto }) {
  const [valorActual, setValorActual] = useState(val2);

  useEffect(() => {
    setValorActual(val2);
  }, [val2]);

  const [checkedPacienteInterno, setChekedPacienteInterno] = useState({
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
  });
  const [checkedPacienteExterno, setChekedPacienteExterno] = useState({
    conflictoId: true,
    nombre: true,
    apellido: true,
    dni: true,
    fechaNacimiento: true,
    fechaDefuncion: true,
    genero: true,
    sexo: true,
    telefono: true,
    direccion: true,
    email: true,
    computadoraId: true,
  });

  function capitalizarTitulo(titulo) {
    if (titulo === "dni") {
      return titulo.toUpperCase() + ":";
    } else if (titulo === "genero") {
      return "Género:";
    } else if (titulo === "fechaNacimiento") {
      return "Fecha de nacimiento:";
    } else if (titulo === "fechaDefuncion") {
      return "Fecha de defunción:";
    } else if (titulo === "Teléfono") {
      return "Teléfono";
    } else if (titulo === "direccion") {
      return "Dirección:";
    }else if (titulo === "email") {
      return "Correo electrónico:";
    } else {
      return titulo.charAt(0).toUpperCase() + titulo.slice(1) + ":";
    }
  }

  const handleChangePacienteInterno = (event) => {
    let checked = event.target.checked;
    setChekedPacienteInterno({ ...checkedPacienteInterno, [titulo]: checked });
    if (checked == true) {
      setAtributoPacienteResuelto(titulo, val1);
      setValorActual(val1);
      setChekedPacienteExterno({ ...checkedPacienteExterno, [titulo]: false });
    }
  };

  const handleChangePacienteExterno = (event) => {
    let checked = event.target.checked;
    setChekedPacienteExterno({ ...checkedPacienteExterno, [titulo]: checked });
    if (checked == true) {
      setAtributoPacienteResuelto(titulo, val2);
      setValorActual(val2);
      setChekedPacienteInterno({ ...checkedPacienteInterno, [titulo]: false });
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={0}>
        <Grid xs={0.2}></Grid>
        <Grid xs={2.9} style={{ border: "1px solid gray" }}>
          <Typography>&nbsp;&nbsp;{capitalizarTitulo(titulo)}</Typography>
          &nbsp;&nbsp;
            <FormControlLabel
              disabled={checkedPacienteInterno[titulo] ? true : false}
              control={
                <Checkbox
                  checked={checkedPacienteInterno[titulo]}
                  onChange={handleChangePacienteInterno}
                  name={capitalizarTitulo(titulo)}
                />
              }
              label={val1}
              labelPlacement="end"
            />
        </Grid>
        <Grid xs={0.2}></Grid>
        <Grid xs={2.9} style={{ border: "1px solid gray" }}>
          <Typography>&nbsp;&nbsp;{capitalizarTitulo(titulo)}</Typography>
          &nbsp;&nbsp;
          <FormControlLabel
            disabled={checkedPacienteExterno[titulo] ? true : false}
            control={
              <Checkbox
                checked={checkedPacienteExterno[titulo]}
                onChange={handleChangePacienteExterno}
                name={capitalizarTitulo(titulo)}
              />
            }
            label={val2}
            labelPlacement="end"
          />
        </Grid>
        <Grid xs={0.2}></Grid>

        <Grid xs={4.8}>
          <br></br>
          <InputLabel>
            &nbsp;&nbsp;
            {capitalizarTitulo(titulo) + " "}
            <OutlinedInput
              disabled
              id={"outlined-adornment-" + { titulo }}
              type="text"
              value={valorActual}
              size="small"
            />
          </InputLabel>
        </Grid>
      </Grid>
    </>
  );
}

export default RenglonOpcion;
