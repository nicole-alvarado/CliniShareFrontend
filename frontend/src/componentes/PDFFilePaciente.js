import {
  Page,
  Document,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import logoClinishare from "../utilidades/logoCliniShare.png";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  header: {
    fontSize: 23,
    marginBottom: 10,
    textAlign: "left",
    color: "black",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  headerHistoriaClinica: {
    fontSize: 23,
    marginBottom: 10,
    marginTop: 15,
    textAlign: "right",
    color: "black",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  headerEventosImportantes: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "left",
    color: "gray",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  image: {
    height: "60",
    width: "175",
    marginHorizontal: 360,
    marginBottom: 10,
  },
});

const stylesTable = StyleSheet.create({
  table: {
    width: "100%",
    border: "1px solid black",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid black",
    borderRight: "1px  black",
    borderLeft: "1px  black",

    padding: 0,
  },
  rowEncabezado: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
    padding: 0,
    border: "1px black",
  },
  header: {
    borderTop: "none",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    padding: 0,
  },
  encabezado: {
    fontFamily: "Times-Roman",
    backgroundColor: "#E9E9E9",
    fontWeight: "bold",
    textAlign: "center",
  },
  rowImportante: {
    width: "2%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",

    lineHeight: "0",
  },
  rowTitulo: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFecha: {
    width: "14%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFechaVencimiento: {
    width: "14%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowDescripcion: {
    width: "30%",
    margin: 2,
    fontSize: 10,
    textAlign: "left",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowMedico: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
});

const stylesTableEventosImportantes = StyleSheet.create({
  rowHeaderTitulo: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    lineHeight: "0",
  },
  rowHeaderFecha: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",

    lineHeight: "0",
  },
  rowHeaderFechaVencimiento: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",

    lineHeight: "0",
  },
  rowHeaderDescripcion: {
    width: "30%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",

    lineHeight: "0",
  },
  rowHeaderMedico: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",

    lineHeight: "0",
  },
  rowTitulo: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFecha: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFechaVencimiento: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowDescripcion: {
    width: "30%",
    margin: 2,
    fontSize: 10,
    textAlign: "left",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowMedico: {
    width: "20%",
    margin: 2,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  textAbreviaciones: {
    fontSize: 10,
    textAlign: "left",
    fontFamily: "Times-Roman",
    margin: 2,
  },
});

const PDFFilePaciente = ({ paciente, eventos, eventosImportantes }) => {
  const formatearFecha = (fechaNacimiento) => {
    let fecha = new Date(fechaNacimiento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };
  
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image fixed style={styles.image} src={logoClinishare} />
        <Text style={styles.header}>Datos generales del paciente:</Text>
        <Text style={styles.text}>
          Apellido y Nombre:&nbsp;&nbsp;{paciente.apellido}&nbsp;
          {paciente.nombre}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sexo:&nbsp;&nbsp;
          {paciente.sexo}
        </Text>
        <Text style={styles.text}>
          Domicilio:&nbsp;&nbsp;{paciente.direccion}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teléfono:&nbsp;&nbsp;
          {paciente.telefono}
        </Text>

        <Text style={styles.text}>
          Fecha de nacimiento:&nbsp;&nbsp;
          {formatearFecha(paciente.fechaNacimiento)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DNI:&nbsp;&nbsp;
          {paciente.dni}
        </Text>

        <Text style={styles.headerEventosImportantes}>
          Eventos importantes:
        </Text>
        <View style={stylesTable.table}>
          <View
            fixed
            style={[stylesTable.encabezado, stylesTable.rowEncabezado]}
          >
            <Text style={stylesTableEventosImportantes.rowHeaderTitulo}>
              Título
            </Text>
            <Text style={stylesTableEventosImportantes.rowHeaderFecha}>
              Fecha
            </Text>
            <Text
              style={stylesTableEventosImportantes.rowHeaderFechaVencimiento}
            >
              Fecha de vencimiento
            </Text>
            <Text style={stylesTableEventosImportantes.rowHeaderDescripcion}>
              Descripción
            </Text>
            <Text style={stylesTableEventosImportantes.rowHeaderMedico}>
              Médico
            </Text>
          </View>
          {eventosImportantes.map((row, i) => (
            <View key={i} style={stylesTable.row} wrap={false}>
              <Text style={stylesTableEventosImportantes.rowTitulo}>
                {row.titulo}
              </Text>
              <Text style={stylesTableEventosImportantes.rowFecha}>
                {formatearFecha(row.fecha)}
              </Text>
              <Text style={stylesTableEventosImportantes.rowFechaVencimiento}>
                {row.fechaVencimiento !== null
                  ? formatearFecha(row.fechaVencimiento)
                  : "Sin fecha"}
              </Text>
              <Text style={stylesTableEventosImportantes.rowDescripcion}>
                {row.descripcion}
              </Text>
              <Text style={stylesTableEventosImportantes.rowMedico}>
                {row.medico.nombre} {row.medico.apellido}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.headerHistoriaClinica}>Historia clínica</Text>
        <Text style={stylesTableEventosImportantes.textAbreviaciones}>I: Importante.</Text>
        <Text style={stylesTableEventosImportantes.textAbreviaciones}>F. de vto.: Fecha de vencimiento.</Text>

        <View style={stylesTable.table}>
          <View
            fixed
            style={[stylesTable.encabezado, stylesTable.rowEncabezado]}
          >
            <Text style={stylesTable.rowImportante}>I.</Text>
            <Text style={stylesTable.rowTitulo}>Título</Text>
            <Text style={stylesTable.rowFecha}>Fecha</Text>
            <Text style={stylesTable.rowFechaVencimiento}>F. de vto.</Text>

            <Text style={stylesTable.rowDescripcion}>Descripción</Text>
            <Text style={stylesTable.rowMedico}>Médico</Text>
          </View>

          {eventos.map((row, i) => (
            <View key={i} style={stylesTable.row} wrap={false}>
              <Text style={stylesTable.rowImportante}>
                {row.importante ? "Si" : "No"}
              </Text>
              <Text style={stylesTable.rowTitulo}>{row.titulo}</Text>
              <Text style={stylesTable.rowFecha}>
                {formatearFecha(row.fecha)}
              </Text>
              <Text style={stylesTable.rowFechaVencimiento}>
                {row.fechaVencimiento !== null
                  ? formatearFecha(row.fechaVencimiento)
                  : "Sin fecha"}
              </Text>
              <Text style={stylesTable.rowDescripcion}>{row.descripcion}</Text>
              <Text style={stylesTable.rowMedico}>
                {row.medico.nombre} {row.medico.apellido}
              </Text>
            </View>
          ))}
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        ></Text>
      </Page>
    </Document>
  );
};

export default PDFFilePaciente;
