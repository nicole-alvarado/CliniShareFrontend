import MenuList from "@mui/material/MenuList";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import GroupsIcon from "@mui/icons-material/Groups";

function Menu() {
  const [verEventos, setVerEventos] = useState(false);
  const [verPacientes, setVerPacientes] = useState(false);

  const handleListadoEventos = () => {
    setVerPacientes(false);
    setVerEventos(true);
  };

  const handleListadoPacientes = () => {
    setVerEventos(false);
    setVerPacientes(true);
  };

  return (
    <>
      {/* <Grid
        item
        xs={4}
        sm={2}
        style={{ backgroundColor: "#007FFF", border: "3px solid #007FFF" }}
      >
        <Paper square={true}> */}
      <MenuList>
        <MenuItem disabled>
          <ListItemText
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
              textAlign: "center",
            }}
          >
            Menú
          </ListItemText>
        </MenuItem>
        <Divider></Divider>

        <Link to={"/pacientes/all"} style={{ textDecoration: "inherit" }}>
          <MenuItem>
            <ListItemText
              style={{
                color: "#0c5774",

                marginBottom: 61,
                marginTop: 61,

                textAlign: "center",
              }}
            >
              Mis pacientes
            </ListItemText>
            <ListItemIcon>
              <GroupsIcon
                style={{ color: "#0c5774" }}
                fontSize="medium"
              ></GroupsIcon>
            </ListItemIcon>
          </MenuItem>
        </Link>
        <Divider></Divider>

        <Link to={"/medicos/all"} style={{ textDecoration: "inherit" }}>
          <MenuItem>
            <ListItemText
              style={{
                color: "#0c5774",
                marginBottom: 61,
                marginTop: 61,
                textAlign: "center",
              }}
            >
              Médicos
            </ListItemText>
            <ListItemIcon>
              <Diversity1Icon
                style={{ color: "#0c5774" }}
                fontSize="medium"
              ></Diversity1Icon>
            </ListItemIcon>
          </MenuItem>
        </Link>
        <Divider></Divider>
        <Link to={"/sincronizacion"} style={{ textDecoration: "inherit" }}>
          <MenuItem>
            <ListItemText
              style={{
                color: "#0c5774",
                marginBottom: 61,
                marginTop: 61,

                textAlign: "center",
              }}
            >
              Conflictos
            </ListItemText>

            <ListItemIcon>
              <SyncProblemIcon
                style={{ color: "#0c5774" }}
                fontSize="medium"
              ></SyncProblemIcon>
            </ListItemIcon>
          </MenuItem>
        </Link>
        {/* <Link
              to={"/eventos/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem>Eventos</MenuItem>
            </Link> */}
      </MenuList>
    </>
  );
}

export default Menu;
