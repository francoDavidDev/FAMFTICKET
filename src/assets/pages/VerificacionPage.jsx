import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Home, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerificacionPage = () => {
  const [inputId, setInputId] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(stored);
    setFiltered(stored);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    setInputId(value);

    const results = tickets.filter(
      (t) =>
        t.ticketId?.toUpperCase().includes(value) ||
        t.nombre?.toUpperCase().includes(value) ||
        t.dni?.toUpperCase().includes(value)
    );

    setFiltered(results);
  };

  const marcarComoVerificado = (ticketId) => {
    const updated = tickets.map((t) =>
      t.ticketId === ticketId ? { ...t, verificado: true } : t
    );
    localStorage.setItem('tickets', JSON.stringify(updated));
    setTickets(updated);
    setFiltered(updated.filter(
      (t) =>
        t.ticketId?.toUpperCase().includes(inputId) ||
        t.nombre?.toUpperCase().includes(inputId) ||
        t.dni?.toUpperCase().includes(inputId)
    ));
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
        placeholder="Buscar por ID, nombre o DNI"
        className="w-full max-w-md p-3 mb-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        value={inputId}
        onChange={handleSearch}
      />

      <div className="w-full max-w-6xl overflow-x-auto rounded-lg shadow">
        <table className="w-full table-auto border-collapse bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">DNI</th>
              <th className="p-3">ID</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((ticket, idx) => (
                <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{ticket.nombre}</td>
                  <td className="p-3">{ticket.email}</td>
                  <td className="p-3">{ticket.dni}</td>
                  <td className="p-3 font-mono">{ticket.ticketId}</td>
                  <td className="p-3">
                    {ticket.verificado ? (
                      <span className="text-green-500 font-medium">✅ Verificado</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">⏳ No verificado</span>
                    )}
                  </td>
                  <td className="p-3">
                    {!ticket.verificado && (
                      <button
                        onClick={() => marcarComoVerificado(ticket.ticketId)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Verificar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-600 dark:text-gray-300">
                  No se encontraron tickets con ese criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botones de navegación */}
      <div className="mt-10 flex gap-4">
        <Link to="/" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow transition">
          <Home size={18} /> Menú Principal
        </Link>
        <Link to="/admin" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition">
          <LayoutDashboard size={18} /> Panel del Organizador
        </Link>
      </div>
    </motion.div>
  );
};

export default VerificacionPage;
