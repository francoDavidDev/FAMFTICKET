// src/pages/Home.jsx
import TicketForm from '../components/TicketForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScanSearch } from 'lucide-react'; // Asegurate de tener lucide-react instalado

const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🎫 Compra tu entrada
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Valor de la entrada: <strong className="text-green-700 dark:text-green-400">$25.000</strong>
        </p>

        <TicketForm />

        {/* Botón al panel del organizador */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            to="/admin"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            Ver Panel del Organizador
          </Link>

          <Link
            to="/verificar"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
          >
            <ScanSearch size={18} />
            Verificación de Tickets
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
