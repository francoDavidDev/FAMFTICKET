// src/components/BackHomeButton.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackHomeButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 left-6"
    >
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Volver al Inicio
      </Link>
    </motion.div>
  );
};

export default BackHomeButton;
