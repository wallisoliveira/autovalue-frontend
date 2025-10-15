// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <GlobalStyle />
      {/* O componente NavBar será fixo no topo de todas as páginas */}
      <NavBar />
      
      <Routes>
        {/* Rota inicial será o Dashboard de Avaliação */}
        <Route path="/" element={<Dashboard />} />
        {/* Você pode adicionar outras rotas aqui: /kanban, /settings, etc. */}
      </Routes>
    </Router>
  );
}

export default App;