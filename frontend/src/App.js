import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import ModificarEvento from "./componentes/Eventos/ModificarEvento";
import NuevoEvento from "./componentes/Eventos/NuevoEvento";
import NuevoPaciente from "./componentes/Pacientes/NuevoPaciente";
import VerEvento from "./componentes/Eventos/VerEvento";
import Home from "./componentes/Menu/Home";
import ModificarPaciente from "./componentes/Pacientes/ModificarPaciente";
import ListadoEventos from "./componentes/Eventos/ListadoEventos";
import ListadoPacientes from "./componentes/Pacientes/ListadoPacientes";
import VerPaciente from "./componentes/Pacientes/VerPaciente";
import RegistroMedico from "./componentes/Medicos/RegistroMedico";
import LoginForm from "./componentes/Login/LoginForm";
import ModificarMedico from "./componentes/Medicos/ModificarMedico";
import ListadoMedicos from "./componentes/Medicos/ListadoMedicos";
import BotonSincronizar from "./componentes/Botones/BotonSincronizar";
import Sincronizacion from "./componentes/Sincronizacion/Sincronizacion";
import PacientesParaActualizar from "./componentes/Sincronizacion/PacientesParaActualizar";
import ResolverConflictos from "./componentes/Sincronizacion/ResolverConflictos";
import RengloOpcion from "./componentes/Sincronizacion/RenglonOpcion";

import DescargarPDF from "./componentes/DescargarPDF";

const Rutas = () => {
  let routes = useRoutes([
    { path: "/eventos/id/:id", element: <ModificarEvento /> },
    { path: "/eventos/new/paciente/:id", element: <NuevoEvento /> },
    { path: "/pacientes/new", element: <NuevoPaciente /> },
    { path: "/eventos/all", element: <ListadoEventos></ListadoEventos> },
    { path: "/pacientes/all", element: <ListadoPacientes></ListadoPacientes> },
    { path: "/eventos/ver/id/:id", element: <VerEvento /> },
    { path: "/pacientes/id/:id", element: <ModificarPaciente /> },

    { path: "/pacientes/ver/id/:id", element: <VerPaciente /> },
    { path: "/home", element: <Home></Home> },
    { path: "/register/", element: <RegistroMedico></RegistroMedico> },
    { path: "/medicos/all", element: <ListadoMedicos></ListadoMedicos> },
    { path: "/", element: <LoginForm></LoginForm> },
    {
      path: "/configuracion/cuenta/",
      element: <ModificarMedico></ModificarMedico>,
    },
    {
      path: "/sincronizacion",
      element: <PacientesParaActualizar></PacientesParaActualizar>,
    },
    {
      path: "/sincronizacion/paciente/:id",
      element: <Sincronizacion></Sincronizacion>,
    },
    {
      path: "/resolver/conflictos/paciente/:dni",
      element: <ResolverConflictos></ResolverConflictos>,
    },
    {
      path: "/renglon/opcion",
      element: <RengloOpcion></RengloOpcion>,
    },

    // ...
  ]);
  return routes;
};

function App() {
  return (
    <>
      <Router>
        <Rutas></Rutas>
      </Router>

      {/* <BotonSincronizar /> */}
    </>
  );
}
export default App;
