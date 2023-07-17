import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid } from "@mui/material";
function BotonEditar() {
  return (
    <>
      <Grid item xs={8}>
        <Button to="/" startIcon={<EditIcon />}>
          Editar
        </Button>
      </Grid>
    </>
  );
}

export default BotonEditar;
