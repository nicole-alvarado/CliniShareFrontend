
import { useEffect, useState } from "react";
import { api } from "../API backend/api";

import ListadoEventos from "./Eventos/ListadoEventos";

function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    const response = await api.obtenerEventos();
    setEventos(response.data);
    // console.log("response: " + JSON.stringify(response));
  };

  return (
    <>
      {/* <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid xs={12}>
          <Item>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button>
                <Link to="/eventos/new" className="btn btn-dark">
                  Agregar
                </Link>
              </Button>
              <Button>
                <Link to="/eventos/id" className="btn btn-dark">
                  Modificar
                </Link>
              </Button>
            </ButtonGroup>
          </Item>
        </Grid>
      </Grid> */}

      Nada
      <ListadoEventos eventos={eventos}></ListadoEventos>
    </>
  );
}

export default Eventos;
