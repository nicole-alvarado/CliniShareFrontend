import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  InputAdornment,
  OutlinedInput,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../API backend/api";
import MenuAppBar from "../Menu/MenuAppBar";
import Menu from "../Menu/Menu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ListadoMedicos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchMedicos, setSearchMedicos] = useState("");
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    obtenerMedicos();
  }, []);

  const obtenerMedicos = async () => {
    const medicosObtenidos = await api.obtenerMedicos();
    setMedicos(medicosObtenidos.data);
  };

  return (
    <>
      <Grid container spacing={0} direction={"column"}>
        <MenuAppBar></MenuAppBar>
        <Grid item xs={12} style={{ marginTop: 10 }} container>
          <Grid item xs={0.1}></Grid>
          <Grid bgcolor={"lightblue"} item xs={1.9}>
            <Menu></Menu>
          </Grid>
          <Grid item xs={10} container spacing={0} marginTop={1}>
            <Grid item xs={12}>
              &nbsp;&nbsp;&nbsp;
              <OutlinedInput
                size="small"
                id="outlined-adornment-search-medicos"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                }
                onChange={(event) => {
                  setSearchMedicos(event.target.value);
                }}
                placeholder="Buscar médico..."
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer
                style={{
                  border: "1px solid gray",
                  height: 430,
                  width: "auto",
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Table stickyHeader size="small" aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          width: "20%",
                          backgroundColor: "#E9E9E9",
                          fontWeight: "bold",
                        }}
                      >
                        Nombre
                      </TableCell>
                      <TableCell
                        style={{
                          width: "20%",
                          backgroundColor: "#E9E9E9",
                          fontWeight: "bold",
                        }}
                      >
                        Apellido
                      </TableCell>
                      <TableCell
                        style={{
                          width: "20%",
                          backgroundColor: "#E9E9E9",
                          fontWeight: "bold",
                        }}
                      >
                        DNI
                      </TableCell>
                      <TableCell
                        style={{
                          width: "2%",
                          textAlign: "center",

                          backgroundColor: "#E9E9E9",
                          fontWeight: "bold",
                        }}
                      >
                        Ver
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicos
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((medico) => {
                        if (searchMedicos === "") {
                          return medico;
                        } else if (
                          medico.nombre
                            .toLowerCase()
                            .includes(searchMedicos.toLowerCase())
                        ) {
                          return medico;
                        }
                      })
                      .map((medico) => (
                        <TableRow
                          key={medico.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{medico.nombre}</TableCell>
                          <TableCell>{medico.apellido}</TableCell>
                          <TableCell>{medico.dni}</TableCell>

                          <TableCell align="center">
                            {/* <Link to={"/medicos/ver/id/" + paciente.id}> */}
                            <VisibilityIcon color="info"></VisibilityIcon>
                            {/* </Link> */}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              xs={12}
              bgcolor={"lightblue"}
              border={"1px black"}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              <TablePagination
                style={{ width: "auto", marginTop: 0 }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={medicos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Registros por página:"}
                labelDisplayedRows={() => {
                  return `Registros: ${page * rowsPerPage + 1} – ${
                    page * rowsPerPage + rowsPerPage
                  } de ${
                    medicos.length !== -1
                      ? medicos.length
                      : `more than ${rowsPerPage}`
                  }`;
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ListadoMedicos;
