import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BotonVolver() {
  let navigate = useNavigate();

  return (
    <>
      <Button
        style={{ border: "1px solid #0c5774"}}
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
    </>
  );
}

export default BotonVolver;
