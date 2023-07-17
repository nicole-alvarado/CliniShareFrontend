import Swal from "sweetalert2";

export const alertas = {
  pacienteConDniExistente,
  alertaCamposObligatorios,
  alertaExito,
  alertaProblemas,
  alertaModificacionExitosa,
  alertaEmailInvalido,
  contraseñasDiferentes,
  fechaErronea,
  errorLogin,
  bienvenida,
  medicoExiste,
  fechaNacimientoPaciente,
  passwordMinimaInvalida,
  pacienteConCorreoExistente,
  fechaInvalidaMenor,
  passwordVacia,
  passwordAVerificarVacia
};

async function pacienteConDniExistente(pacienteDni) {
  Swal.fire({
    icon: "warning",
    title: "",
    html: `<p>Ya existe el paciente con <b>DNI ${pacienteDni}</b></p>`,
  });
}

async function pacienteConCorreoExistente(email) {
  Swal.fire({
    icon: "warning",
    title: "",
    html: `<p>Ya existe un paciente con ese correo electrónico</p>`,
  });
}

async function alertaCamposObligatorios() {
  Swal.fire({
    icon: "warning",
    title: "",
    text: "Faltan datos por completar",
  });
}

async function alertaExito(entidad) {
  Swal.fire({
    title: "Éxito",
    html: `<p>El <b>${entidad}</b> se guardó exitosamente</p>`,
    icon: "success",
    timer: "1000",
    position: "center",
  });
}

async function alertaProblemas() {
  Swal.fire({
    title: "",
    text: "Problemas al guardar",
    icon: "error",
  });
}

async function alertaEmailInvalido() {
  Swal.fire({
    title: "",
    text: "Email inválido",
    icon: "error",
  });
}

async function contraseñasDiferentes() {
  Swal.fire({
    title: "",
    text: "Las contraseñas no coinciden",
    icon: "error",
  });
}

// ALERTAS FECHAS

async function fechaErronea(tipo) {
  Swal.fire({
    title: "",
    html: `<p>La <b>fecha de ${tipo}</b> es inválida</p>`,
    icon: "error",
  });
}

async function fechaInvalidaMenor(tipo) {
  Swal.fire({
    title: "",
    html: `<p>La <b>fecha de ${tipo}</b> es menor al día de hoy.</p>`,
    icon: "error",
  });
}

async function fechaNacimientoPaciente() {
  Swal.fire({
    html: `<p>La fecha de nacimiento es superior al día de hoy</p>`,
    icon: "error",
  });
}

async function errorLogin() {
  Swal.fire({
    title: "Error",
    html: `<p>Usuario no encontrado o contraseña incorrecta</p>`,
    icon: "warning",
  });
}

async function alertaModificacionExitosa(entidad) {
  Swal.fire({
    title: "Éxito",
    html: `<p>El <b>${entidad}</b> se actualizó exitosamente</p>`,
    icon: "success",
    position: "center",
  });
}

async function bienvenida(nombreMedico, sexo) {
  if (sexo === "Femenino"){
    Swal.fire({
      html: `<p>¡Bienvenida Dra. <b>${nombreMedico}</b>!</p>`,
      icon: "success",
      timer: "3000",
      position: "center",
    });
  }else if (sexo === "Masculino"){
    Swal.fire({
      html: `<p>¡Bienvenido Dr. <b>${nombreMedico}</b>!</p>`,
      icon: "success",
      timer: "3000",
      position: "center",
    });
  }
}

// ALERTAS REGISTRO MÉDICO
async function medicoExiste(nombreCampo, dni, matricula) {
  if (nombreCampo === "matricula") {
    Swal.fire({
      icon: "warning",
      html: `<p>Ya existe un médico con la mátricula <b>${matricula}</b></p>`,
    });
  } else if (nombreCampo === "dni") {
    Swal.fire({
      icon: "warning",
      html: `<p>Ya existe un médico con el DNI <b>${dni}</b></p>`,
    });
  } else {
    Swal.fire({
      icon: "warning",
      html: `<p>Ya existe un médico con la mátricula <b>${matricula}</b> y DNI <b>${dni}</b></p>`,
    });
  }
}

async function passwordMinimaInvalida() {
  Swal.fire({
    html: `<p>La contraseña debe ser mayor a 4 carácteres</p>`,
    icon: "error",
  });
}

async function passwordVacia() {
  Swal.fire({
    html: `<p>Debe ingresar una nueva contraseña o la misma</p>`,
    icon: "error",
  });
}

async function passwordAVerificarVacia() {
  Swal.fire({
    html: `<p>Debe verificar la contraseña</p>`,
    icon: "error",
  });
}


