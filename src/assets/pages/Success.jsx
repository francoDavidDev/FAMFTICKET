// src/pages/Success.jsx
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const Success = () => {
  const { state } = useLocation();
  const { nombre, email, ticketId } = state || {};
  const ticketRef = useRef();

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

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6 flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🎟️ Ticket visible y descargable */}
      <div
        ref={ticketRef}
        style={{
          background: '#ffffff',
          color: '#000000',
          padding: '24px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '400px',
          fontFamily: 'sans-serif',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '20px', marginBottom: '16px', fontWeight: 'bold' }}>🎟️ Entrada generada</h1>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>ID del Ticket:</strong> <span style={{ color: '#2563eb', fontFamily: 'monospace' }}>{ticketId}</span></p>
        <p style={{ marginTop: '20px', color: 'green', fontWeight: '500' }}>
          Mostrá este ID en el ingreso al evento.
        </p>
      </div>

      {/* Botón para descargar */}
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
      >
        Descargar Ticket 🎫
      </motion.button>
    </motion.div>
  );
};

export default Success;
