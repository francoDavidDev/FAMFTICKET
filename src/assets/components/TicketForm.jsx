// src/components/TicketForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const TicketForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = `EVENTO-${uuidv4().slice(0, 8).toUpperCase()}`;
    const ticketData = { ...formData, ticketId };

    const existing = JSON.parse(localStorage.getItem('tickets') || '[]');
    localStorage.setItem('tickets', JSON.stringify([...existing, ticketData]));

    navigate('/success', { state: ticketData });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Comprar Entrada
      </h2>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Nombre:</label>
        <input
          type="text"
          name="nombre"
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email:</label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Comprar Entrada
      </motion.button>
    </motion.form>
  );
};

export default TicketForm;
