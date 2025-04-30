// ⏬ Instalar jspdf si no lo hiciste
// npm install jspdf

import jsPDF from "jspdf";
import { FaDownload, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TicketDownload = ({ nombre, torneo, fecha }) => {
  const navigate = useNavigate();

  const generateTicketPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎫 Ticket de Participación", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 20, 40);
    doc.text(`Torneo: ${torneo}`, 20, 50);
    doc.text(`Fecha: ${fecha}`, 20, 60);
    doc.text("¡Gracias por participar!", 20, 80);
    doc.save(`ticket_${torneo}.pdf`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
      <button
        onClick={generateTicketPDF}
        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition-all"
      >
        <FaDownload />
        Descargar Ticket PDF
      </button>

      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        <FaHome />
        Volver al Inicio
      </button>
    </div>
  );
};

export default TicketDownload;
