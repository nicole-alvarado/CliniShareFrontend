import { Checkbox, FormControlLabel, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function PacienteASincronizar({paciente, esPacienteLocal, enviarPaciente}) {

  const [pacienteASincronizar, setPacienteASincronizar] = useState({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPacienteASincronizar((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  useEffect(() => {

    (async () => {
      const pacienteU = await paciente;
      setPacienteASincronizar((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteU };
      });
    })();
  }, [paciente.id]);

  //   useEffect(() => {
  //     (async () => {
  //       const usuario = await JSON.parse(
  //         window.localStorage.getItem("loggedCliniShareAppUser")
  //       );
  //       setMedico((estadoAnterior) => {
  //         return { ...estadoAnterior, ...usuario.medico };
  //       });
  //     })();
  //   }, []);

  return (
    <>
      {/* component="h6" variant="h6" style=
      {{
        backgroundColor: "#5090D3",
        color: "white",
        textAlign: "left",
        fontWeight: "bold",
        lineHeight: "2",
      }} */}
      {esPacienteLocal==true ? (
        <Typography>&nbsp;&nbsp;Datos del paciente localmente</Typography>
      ) : (
        <Typography>&nbsp;&nbsp;Datos del paciente recibido</Typography>
      )}
      <br></br>
      <InputLabel>&nbsp;&nbsp;Nombre</InputLabel>
      <OutlinedInput
        id="outlined-nombre"
        type="text"
        value={pacienteASincronizar.nombre}
        onChange={handleChange}
        size="small"
        fullWidth
        margin="none"
      />

      {/* <FormControlLabel
                size="small"
                name="nombre"
                checked={paciente.nombre}
                onChange={handleChange}
                control={<Checkbox />}
                label="Nombre"
              /> */}
      <br></br>
      <br></br>
      <InputLabel>&nbsp;&nbsp;Apellido</InputLabel>
      <OutlinedInput
        id="outlined-apellido"
        type="text"
        value={pacienteASincronizar.apellido}
        onChange={handleChange}
        size="small"
        fullWidth
      />
      <br></br>
      <br></br>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <InputLabel>&nbsp;&nbsp;DNI</InputLabel>
          <OutlinedInput
            id="outlined-dni"
            type="text"
            value={pacienteASincronizar.dni}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>&nbsp;&nbsp;Fecha de nacimiento</InputLabel>
          <OutlinedInput
            id="outlined-fechaDeNacimiento"
            type="text"
            // value={pacienteASincronizar.apellido}
            // onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <br></br>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <InputLabel>&nbsp;&nbsp;Sexo</InputLabel>
          <OutlinedInput
            id="outlined-sexo"
            type="text"
            // value={pacienteASincronizar.apellido}
            // onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>&nbsp;&nbsp;Género</InputLabel>
          <OutlinedInput
            id="outlined-genero"
            type="text"
            // value={pacienteASincronizar.apellido}
            // onChange={handleChange}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <br></br>
      <InputLabel>&nbsp;&nbsp;Domicilio</InputLabel>
      <OutlinedInput
        id="outlined-domicilio"
        type="text"
        // value={pacienteASincronizar.apellido}
        // onChange={handleChange}
        size="small"
        fullWidth
      />
      <br></br>
      <br></br>
      <InputLabel>&nbsp;&nbsp;Teléfono</InputLabel>
      <OutlinedInput
        id="outlined-telefono"
        type="text"
        // value={pacienteASincronizar.apellido}
        // onChange={handleChange}
        size="small"
        fullWidth
      />
    </>
  );
}

export default PacienteASincronizar;
