// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import Success from './assets/pages/Success';
import Admin from './assets/pages/Admin';
import VerificacionPage from './assets/pages/VerificacionPage';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/verificar" element={<VerificacionPage />} />
    </Routes>
  );
};

export default App;