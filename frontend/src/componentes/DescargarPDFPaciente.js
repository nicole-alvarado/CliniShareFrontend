import { Button, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import PDFFilePaciente from "./PDFFilePaciente";

const DescargarPDFPaciente = ({ paciente={}, eventos=[], eventosImportantes=[] }) => {
  console.log(paciente);

  const nombrePDF =
    "Historia clínica-" + paciente.nombre + " " + paciente.apellido;

  console.log(nombrePDF);
  return (
    <div>
      <PDFDownloadLink
      style={{textDecoration:"inherit"}}
        document={<PDFFilePaciente paciente={paciente} eventos={eventos} eventosImportantes={eventosImportantes}/>}
        fileName={nombrePDF}
      >
        <Box textAlign={"left"}>
        <Button
          variant="contained"
          size="medium"
          style={{ fontWeight: "bold"}}
        >
          Descargar historia clínica
        </Button>
        </Box>
      </PDFDownloadLink>
    </div>
  );
};

export default DescargarPDFPaciente;
