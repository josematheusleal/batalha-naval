import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Game } from './pages/Game'; // <-- Importe a tela que acabamos de criar

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Adicionei esse Navigate só pra te jogar direto pro jogo quando abrir o localhost */}
        <Route path="/" element={<Navigate to="/jogo" />} />
        
        <Route path="/cadastro" element={<div>Tela de Cadastro</div>} />
        <Route path="/menu" element={<div>Menu de Modos de Jogo</div>} />
        
        {/* Rota do Jogo renderizando nosso componente novo! */}
        <Route path="/jogo" element={<Game />} /> 
        
        <Route path="/ranking" element={<div>Ranking</div>} />
      </Routes>
    </Router>
  );
};