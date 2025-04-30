import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { FaDownload, FaHome } from 'react-icons/fa';

const Success = () => {
  const { state } = useLocation();
  const { nombre, email, dni, ticketId } = state || {};
  const ticketRef = useRef();
  const navigate = useNavigate();

  const handleDownload = () => {
    if (!ticketRef.current) return;
    html2canvas(ticketRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.download = `${ticketId || 'ticket'}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/png');
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎟️ Entrada al evento", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre || '-'}`, 20, 40);
    doc.text(`Email: ${email || '-'}`, 20, 50);
    doc.text(`DNI: ${dni || '-'}`, 20, 60);
    doc.text(`ID del Ticket: ${ticketId || '-'}`, 20, 70);
    doc.text("Mostrá este ID en el ingreso al evento.", 20, 90);
    doc.save(`ticket_${ticketId || 'evento'}.pdf`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6 flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={ticketRef}
        className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">🎟️ Entrada generada</h1>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>DNI:</strong> {dni}</p>
        <p><strong>ID del Ticket:</strong> <span className="text-blue-600 font-mono">{ticketId}</span></p>
        <p className="mt-4 text-green-600 font-medium">
          Mostrá este ID en el ingreso al evento.
        </p>
      </div>

     
      <motion.button
        onClick={generatePDF}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-lg shadow flex items-center gap-2"
      >
        <FaDownload /> Descargar Ticket PDF
      </motion.button>

      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow flex items-center gap-2"
      >
        <FaHome /> Volver al Inicio
      </motion.button>
    </motion.div>
  );
};

export default Success;
