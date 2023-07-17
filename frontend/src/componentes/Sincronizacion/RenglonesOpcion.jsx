import React from "react";
import RenglonOpcion from "./RenglonOpcion";

function RenglonesOpcion({ paciente, conflicto, setAtributoPacienteResuelto }) {
  let datosProcesados = [];

  function formatearFecha(fechaAFormatear) {
    let fecha = new Date(fechaAFormatear);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  }

  for (let atributo in paciente) {
    let valor = "";
    let valorConflicto = "";
    if (atributo === "fechaNacimiento" || atributo === "fechaDefuncion") {
      valor = formatearFecha(paciente[atributo]);
      valorConflicto = formatearFecha(conflicto[atributo]);
    } else {
      valor = paciente[atributo];
      valorConflicto = conflicto[atributo];
    }
    if (
      atributo !== "activo" &&
      atributo !== "id" &&
      atributo !== "dni" &&
      atributo !== "fechaNacimiento" &&
      atributo !== "fechaDefuncion" && atributo !== "genero"
    ) {
      datosProcesados.push({
        titulo: atributo,
        val1: valor,
        val2: valorConflicto,
      });
    }
  }
  return (
    <>
      {datosProcesados.map((dato) => {
        return (
          <div key={dato.titulo}>
            <RenglonOpcion 
              titulo={dato.titulo}
              val1={dato.val1}
              val2={dato.val2}
              setAtributoPacienteResuelto={setAtributoPacienteResuelto}
            ></RenglonOpcion>
          </div>
        );
      })}
    </>
  );
}

export default RenglonesOpcion;
