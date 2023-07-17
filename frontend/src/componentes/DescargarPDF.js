import { IconButton, Tooltip } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "./PDFFIle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DescargarPDF = ({ paciente }) => {
  const nombrePDF =
    "Historia clínica-" + paciente.nombre + " " + paciente.apellido;
  return (
    <div>
      <PDFDownloadLink
        document={<PDFFile paciente={paciente} />}
        fileName={nombrePDF}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <Tooltip title="Descargar historia clínica">
            <FileDownloadIcon />
          </Tooltip>
        </IconButton>
      </PDFDownloadLink>
    </div>
  );
};

export default DescargarPDF;
