import { Box, Button, Grid, Typography } from "@mui/material";
import { api } from "../../API backend/api";
import SyncIcon from "@mui/icons-material/Sync";
function BotonSincronizar() {
  return (
    <>
    <Box textAlign={"center"} style={{marginTop:2}}>
      <Button
        style={{ backgroundColor: "white", marginTop:8, marginBottom:5 }}
        variant="contained"
        onClick={() => api.sincronizar()}
        endIcon={
          <SyncIcon style={{ color: "#0c5774", fontWeight: "bold" }}></SyncIcon>
        }
      >
        <Typography variant="h7" color={"#0c5774"} fontWeight={"bold"}>
          SINCRONIZAR
        </Typography>
            </Button>
            </Box></>
  );
}

export default BotonSincronizar;
