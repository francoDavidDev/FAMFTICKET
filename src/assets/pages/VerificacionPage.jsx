// src/pages/VerificacionPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Home, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerificacionPage = () => {
  const [inputId, setInputId] = useState('');
  const [ticket, setTicket] = useState(null);
  const [estado, setEstado] = useState(null); // 'ok', 'usado', 'invalido'

  const handleVerificar = () => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]');
    const encontrado = stored.find(t => t.ticketId === inputId.trim().toUpperCase());

    if (!encontrado) {
      setTicket(null);
      setEstado('invalido');
      return;
    }

    if (encontrado.verificado) {
      setTicket(encontrado);
      setEstado('usado');
      return;
    }

    setTicket(encontrado);
    setEstado('ok');
  };

  const marcarComoVerificado = () => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]');
    const index = stored.findIndex(t => t.ticketId === inputId.trim().toUpperCase());
    if (index !== -1) {
      stored[index].verificado = true;
      localStorage.setItem('tickets', JSON.stringify(stored));
      setEstado('usado');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        🔎 Verificación de Entradas
      </h1>

      <input
        type="text"
        placeholder="Ingresar ID del Ticket"
        className="w-full max-w-md p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />

      <button
        onClick={handleVerificar}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
      >
        Verificar Ticket
      </button>

      {/* Resultado: Ticket válido */}
      {estado === 'ok' && ticket && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md max-w-md w-full text-center">
          <CheckCircle className="text-green-600 mx-auto mb-2" size={40} />
          <p className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">✅ Ticket válido</p>
          <p><strong>Nombre:</strong> {ticket.nombre}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>ID:</strong> {ticket.ticketId}</p>
          <button
            onClick={marcarComoVerificado}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Marcar como verificado
          </button>
        </div>
      )}

      {/* Resultado: Ticket ya verificado */}
      {estado === 'usado' && ticket && (
        <div className="mt-8 p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertTriangle className="text-yellow-600 mx-auto mb-2" size={40} />
          <p className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Ticket ya fue verificado</p>
          <p><strong>Nombre:</strong> {ticket.nombre}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>ID:</strong> {ticket.ticketId}</p>
        </div>
      )}

      {/* Resultado: Ticket inválido */}
      {estado === 'invalido' && (
        <div className="mt-8 p-6 bg-red-100 dark:bg-red-900 rounded-lg shadow-md max-w-md w-full text-center">
          <XCircle className="text-red-600 mx-auto mb-2" size={40} />
          <p className="text-lg font-semibold text-red-700 dark:text-red-300">❌ Ticket no válido</p>
          <p>No se encontró ningún ticket con ese ID.</p>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="mt-10 flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <Home size={18} />
          Menú Principal
        </Link>

        <Link
          to="/admin"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <LayoutDashboard size={18} />
          Panel del Organizador
        </Link>
      </div>
    </motion.div>
  );
};

export default VerificacionPage;
