import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { api } from "../../API backend/api";
import Grid from "@mui/material/Unstable_Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

function EventosImportantes(params) {
  const [eventosImportantes, setEventosImportantes] = useState([]);

  const formatearFecha = (fechaDeEvento) => {
    let fecha = new Date(fechaDeEvento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };

  useEffect(() => {
    const obtenerEventosImportantes = async () => {
      const response =
        await api.obtenerEventosCompletosImportantesPorPacienteId(params.id);

      setEventosImportantes(response.data);
    };
    obtenerEventosImportantes();
  }, [params.id]);

  return (
    <>
      <Grid
        xs={4}
        sm={6}
        style={{ border: "3px solid #007FFF", borderRadius: 6 }}
      >
        {/* <Box borderColor="red"> */}

        <ListItemText
          style={{
            textAlign: "center",
            color: "white",
            background: "#007FFF",
            fontStyle: "bold",
          }}
          sx={{ my: 0 }}
          primary="Eventos importantes"
          primaryTypographyProps={{
            fontSize: 19,
            letterSpacing: 0,
            fontWeight: "bold",
          }}
        />
        <List
          sx={{
            width: "100%",
            maxWidth: 660,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 100,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
                      {eventosImportantes?.length ? (

          <ul>
            {/* <ListSubheader>{`TÍTULO`} {`FECHA DE VENCIMIENTO`}</ListSubheader> */}
            {eventosImportantes.map((evento) => (
              <ListItem style={{ textAlign: "center" }} key={`${evento.id}`}>
                <ListItemText     
                  primary={`Título: ${evento.titulo}`}
                  primaryTypographyProps={{
                    fontSize: 16,
                    fontWeight: 'medium',
                    lineHeight: '16px',
                    mb: '2px',
                    padding:0
                  }}
                  secondary={evento.fechaVencimiento!==null?`Fecha de vencimiento: ${formatearFecha(
                    evento.fechaVencimiento
                  )}`:`Sin fecha de vencimiento`}
                  // secondary={`Fecha de vencimiento: ${formatearFecha(
                  //   evento.fechaVencimiento
                  // )}`}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 15,
                    lineHeight: '16px',
                    padding:0,
                    color:"red",
                    fontWeight:"bold",
                    
                  }}
                />
                <Link to={"/eventos/ver/id/" + evento.id}>
                <Tooltip title="Ver evento">
                  <VisibilityIcon color="info" fontSize="medium" ></VisibilityIcon>
                </Tooltip>
                </Link>
              </ListItem>
            ))}
          </ul>
          ) : <p style={{textAlign:"center", color:"GrayText"}}>Sin eventos</p>}
        </List>
        {/* </Box> */}
      </Grid>
    </>
  );
}

export default EventosImportantes;
