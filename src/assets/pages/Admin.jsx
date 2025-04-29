// src/pages/Admin.jsx
import AdminPanel from '../components/AdminPanel';
import { motion } from 'framer-motion';

const Admin = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          🧾 Panel del Organizador
        </h1>
        <AdminPanel />
      </div>
    </motion.div>
  );
};

export default Admin;
