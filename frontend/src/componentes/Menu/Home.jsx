import { Box } from "@mui/material";
import Menu from "./Menu";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuAppBar from "./MenuAppBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={4} sm={12}>
          <MenuAppBar></MenuAppBar>
        </Grid>
      </Grid>
      <br></br>
      <Grid container direction="row" spacing={2} >
        <Menu></Menu>
      </Grid>
      
    </>
  );
}

export default Home;
