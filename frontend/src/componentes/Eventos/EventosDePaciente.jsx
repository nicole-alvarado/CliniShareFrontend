import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { api } from "../../API backend/api";
import Grid from "@mui/material/Unstable_Grid2";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Button, TablePagination, TextField, Tooltip } from "@mui/material";
import EditOffIcon from "@mui/icons-material/EditOff";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DescargarPDFPaciente from "../DescargarPDFPaciente";

function EventosDePaciente(params) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formatearFecha = (fechaDeEvento) => {
    let fecha = new Date(fechaDeEvento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };

  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFin, setFechaFin] = useState(new Date());
  const [eventosImportantes, setEventosImportantes] = useState([]);

  const handleChangeFechaInicio = (event) => {
    console.log("EN HANDLE INICIO: " + event["$d"]);
    if (event === null) {
      event = {};
    } else {
      const value = new Date(event["$d"]);
      console.log(value);
      setFechaInicio(value);
    }
  };

  const handleChangeFechaFin = (event) => {
    console.log("EN HANDLE FIN: " + event["$d"]);

    if (event === null) {
      event = {};
    } else {
      const value = new Date(event["$d"]);
      console.log(value);
      setFechaFin(value);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [eventos, setEventos] = useState([]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventos.length) : 0;

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  useEffect(() => {
    const obtenerEventosPorPacienteId = async () => {
      const response = await api.obtenerEventosCompletosPorPacienteId(
        params.id
      );

      if (response.data.length !== 0) {
        setEventos(response.data);
      }
    };
    obtenerEventosPorPacienteId();
  }, [params.id]);

  const [pacienteAux, setPacienteAux] = useState({});
  useEffect(() => {
    (async () => {
      const pacienteRespuesta = await api.obtenerPacienteById(params.id);
      setPacienteAux((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteRespuesta };
      });
    })();
  }, [params.id]);


  useEffect(() => {
    const obtenerEventosImportantesPorPacienteId = async () => {
      const response =
        await api.obtenerEventosCompletosImportantesPorPacienteId(params.id);

        if (response.data.length !== 0) {
          setEventosImportantes(response.data);
        }
    };
    obtenerEventosImportantesPorPacienteId();
  }, [params.id]);


  const obtenerEventosPorFechas = async () => {
    const fechaInicioAux = formatearFecha(fechaInicio);
    const fechaFinAux = formatearFecha(fechaFin);
    const response = await api.obtenerEventosPorFechas(
      fechaInicioAux,
      fechaFinAux,
      params.id
    );

    console.log(response);
    setEventos(response);
  };

  const buscarEventosPorFechas = async () => {
    obtenerEventosPorFechas();
  };

  return (
    <>
      {eventos?.length ? (
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} container>
            {/* FECHA DE INICIO */}
            <Grid item xs={2}>
              <Box textAlign={"left"}>
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    label="Fecha inicio"
                    name="fechaInicio"
                    value={fechaInicio}
                    onChange={handleChangeFechaInicio}
                    renderInput={(params) => (
                      <TextField
                        margin="none"
                        size="small"
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* FECHA FIN */}
            <Grid item xs={2}>
              <Box textAlign={"left"}>
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    label="Fecha fin"
                    name="fechaFin"
                    value={fechaFin}
                    onChange={handleChangeFechaFin}
                    renderInput={(params) => (
                      <TextField
                        margin="none"
                        size="small"
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box textAlign={"left"}>
                <Button
                  variant="contained"
                  size="medium"
                  style={{ fontWeight: "bold" }}
                  onClick={buscarEventosPorFechas}
                >
                  Buscar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <DescargarPDFPaciente
                paciente={pacienteAux}
                eventos={eventos}
                eventosImportantes ={eventosImportantes}
              ></DescargarPDFPaciente>
            </Grid>
          </Grid>
          <TableContainer
            sx={{ maxHeight: 225, maxWidth: 1360 }}
            style={{ border: "1px solid #0c5774" }}
          >
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Importante
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Título
                  </TableCell>
                  <TableCell
                    style={{
                      width: "8%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    style={{
                      width: "30%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                    style={{
                      width: "15%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Médico
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Editar
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Ver
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((evento) => (
                    <TableRow
                      key={evento.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {evento.importante ? (
                          <CheckCircleOutlineRoundedIcon></CheckCircleOutlineRoundedIcon>
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>{evento.titulo}</TableCell>
                      <TableCell>{formatearFecha(evento.fecha)}</TableCell>
                      <TableCell>{evento.descripcion}</TableCell>
                      <TableCell>
                        {evento.medico.nombre} {evento.medico.apellido}
                      </TableCell>

                      {evento.medico.id === usuario.medico.medicoId ? (
                        <TableCell align="center" component="th" scope="row">
                          <Link to={"/eventos/id/" + evento.id}>
                            <Tooltip title="Editar evento">
                              <EditIcon color="info"></EditIcon>
                            </Tooltip>
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell align="center" component="th" scope="row">
                          <EditOffIcon color="disabled"></EditOffIcon>
                        </TableCell>
                      )}

                      <TableCell align="center" component="th" scope="row">
                        <Link to={"/eventos/ver/id/" + evento.id}>
                          <Tooltip title="Ver evento">
                            <VisibilityIcon color="info"></VisibilityIcon>
                          </Tooltip>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            size="small"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={eventos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Registros por página:"}
            labelDisplayedRows={() => {
              return `Registros: ${page * rowsPerPage + 1} – ${
                page * rowsPerPage + rowsPerPage
              } de ${
                eventos.length !== -1
                  ? eventos.length
                  : `more than ${rowsPerPage}`
              }`;
            }}
          />
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12} container>
              {/* FECHA DE INICIO */}
              <Grid item xs={3}>
                <Box textAlign={"left"}>
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      label="Fecha inicio"
                      name="fechaInicio"
                      value={fechaInicio}
                      onChange={handleChangeFechaInicio}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          size="small"
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              {/* FECHA FIN */}
              <Grid item xs={3}>
                <Box textAlign={"left"}>
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      label="Fecha fin"
                      name="fechaFin"
                      value={fechaFin}
                      onChange={handleChangeFechaFin}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          size="small"
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign={"left"}>
                  <Button
                    variant="contained"
                    size="large"
                    style={{ fontWeight: "bold", marginTop: 15 }}
                    onClick={buscarEventosPorFechas}
                  >
                    Buscar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <p style={{ color: "GrayText" }}>No hay ningún evento</p>
          </Grid>
        </>
      )}
    </>
  );
}

export default EventosDePaciente;
