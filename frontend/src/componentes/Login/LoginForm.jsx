import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { api } from "../../API backend/api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { alertas } from "../alertas";

function LoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    mostrarPassword: "",
  });
  const [usuario, setUsuario] = useState({
    nombre: "",
    token: "",
    email: "",
  });
  const [datosValidos, setDatosValidos] = useState(false);

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  useEffect(() => {
    const loggedCliniShareUserJSON = window.localStorage.getItem(
      "loggedCliniShareAppUser"
    );
    if (loggedCliniShareUserJSON) {
      const user = JSON.parse(loggedCliniShareUserJSON);
      setUsuario(user);
    }
  }, []);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      mostrarPassword: !values.mostrarPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleLogin();
    }
  }

  const handleLogin = async (event) => {
    try {
      const usuario = await api.login(correoElectronico, password);
      if (Object.keys(usuario).length !== 0) {
        setDatosValidos(true);
        window.localStorage.setItem(
          "loggedCliniShareAppUser",
          JSON.stringify(usuario)
        );
        setUsuario(usuario);
        setCorreoElectronico("");
        setPassword("");
        console.log(usuario);
        alertas.bienvenida(usuario.medico.nombre, usuario.medico.sexo);
      } else {
        alertas.errorLogin();
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "blue" };
  return (
    <>
      {/* Si los datos son válidos se accede a la pantalla principal, sino permanece acá */}
      {datosValidos ? (
        <Navigate to="/pacientes/all" />
      ) : (
        <Grid onKeyDown={handleKeyPress}>
          
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AccountCircleIcon />
              </Avatar>
              <h2>Login</h2>
            </Grid>
            <br></br>
            <InputLabel>Correo electrónico</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              value={correoElectronico}
              onChange={({ target }) => setCorreoElectronico(target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <AlternateEmailIcon></AlternateEmailIcon>
                </InputAdornment>
              }
              placeholder="Correo electrónico"
              required
            />
            <br></br>
            <br></br>
            <InputLabel>Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.mostrarPassword ? "text" : "password"}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.mostrarPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Contraseña"
              required
            />
            <br></br>
            <br></br>
            {/* Recordar contraseña */}
            {/* <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              onClick={handleLogin}
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              style={{ fontWeight: "bold" }}
            >
              INICIAR SESIÓN
            </Button>
            <br></br>
            <br></br>
            <Link
              to={"/register"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                size="large"
                style={{ fontWeight: "bold" }}
              >
                REGISTRARSE
              </Button>
            </Link>
            {/* <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link href="#">Sign Up</Link>
          </Typography> */}
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default LoginForm;
