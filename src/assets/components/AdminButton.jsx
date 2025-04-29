// src/components/AdminButton.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 right-6"
    >
      <Link
        to="/admin"
        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
      >
        Ir al Panel del Organizador
      </Link>
    </motion.div>
  );
};

export default AdminButton;
