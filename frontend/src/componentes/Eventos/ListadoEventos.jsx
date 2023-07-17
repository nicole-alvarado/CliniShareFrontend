import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import { api } from "../../API backend/api";
import Menu from "../Menu/Menu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ListadoEventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const formatearFecha = (fechaDeEvento) => {
    let fecha = new Date(fechaDeEvento);
    // console.log("fecha en bd: ", fecha);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    // console.log("fecha formateada: ", fechaFormateada);
    return fechaFormateada;
  };

  const obtenerEventos = async () => {
    const response = await api.obtenerEventosCompletos();
    setEventos(response.data);
  };

  return (
    <>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
          <Grid xs={12}>
            <Item></Item>
          </Grid>
        </Grid>
        <br></br>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Menu></Menu>

        <Grid xs={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ver evento</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Fecha</TableCell>

                  <TableCell>Descripción</TableCell>
                  <TableCell>Médico</TableCell>
                  <TableCell>Editar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map((evento) => (
                  <TableRow
                    key={evento.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={"/eventos/ver/id/" + evento.id}>
                        <VisibilityIcon color="info"></VisibilityIcon>
                      </Link>
                    </TableCell>
                    <TableCell>{evento.titulo}</TableCell>
                    <TableCell>{formatearFecha(evento.fecha)}</TableCell>

                    <TableCell>{evento.descripcion}</TableCell>
                    <TableCell>
                      {evento.medico.nombre} {evento.medico.apellido}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={"/eventos/id/" + evento.id}>
                        <EditIcon color="info"></EditIcon>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default ListadoEventos;
