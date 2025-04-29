// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const AdminPanel = () => {
  const [tickets, setTickets] = useState([]);
  const [comisionTotal, setComisionTotal] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(stored);
    setComisionTotal(stored.filter(t => t.verificado).length * 1250); // 5% de $25.000 = $1250
  }, []);

  const filteredTickets = tickets.filter((t) =>
    t.nombre.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.ticketId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Entradas Vendidas 🎟️
      </h2>

      <input
        type="text"
        placeholder="Buscar por nombre, email o ID..."
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left p-3 text-gray-600 dark:text-gray-300">Nombre</th>
              <th className="text-left p-3 text-gray-600 dark:text-gray-300">Email</th>
              <th className="text-left p-3 text-gray-600 dark:text-gray-300">ID del Ticket</th>
              <th className="text-left p-3 text-gray-600 dark:text-gray-300">Comisión Franco (5%)</th>
              <th className="text-left p-3 text-gray-600 dark:text-gray-300">Verificación</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((t, i) => (
              <motion.tr
                key={i}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">{t.nombre}</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">{t.email}</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">{t.ticketId}</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-green-700 dark:text-green-400 font-medium">$1.250</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  {t.verificado ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">✅ Verificado</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium">⏳ No verificado</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold text-green-700 dark:text-green-400">
          💰 Comisión total (solo tickets verificados): ${comisionTotal.toLocaleString()}
        </p>
      </div>

      {/* Botón para volver al menú */}
      <div className="mt-6 flex justify-end">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow transition"
        >
          <Home size={18} />
          Volver al Menú Principal
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminPanel;