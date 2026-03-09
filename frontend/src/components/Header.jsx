import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/profile.png'; 
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //função para alternar o menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="game-header">
        <button className="hamburger-btn" onClick={toggleMenu} title="Menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <h2 className="header-title">Batalha Naval</h2>

        <button className="profile-btn" onClick={() => navigate('/profile')} title="Editar Perfil">
          <img src={profileImg} alt="Perfil" className="profile-img" />
        </button>
      </header>

      <div 
        className={`sidebar-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
      ></div>

      <aside className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Opções</h3>
          <button className="close-btn" onClick={toggleMenu}>✕</button>
        </div>
        
        <nav className="sidebar-nav">
          {/*botão de ranking*/}
          <button 
            onClick={() => navigate('/ranking')}
            className="drawn-btn yellow-btn"
          >
            Ranking de Jogadores
          </button>
          
          {/*menu*/}
          <button 
            onClick={() => navigate('/home')} 
            className="drawn-btn blue-btn"
          >
            Menu Principal
          </button>
          
          {/*deslogar*/}
          <button 
            onClick={() => navigate('/login')} 
            className="drawn-btn red-btn"
          >
            Deslogar
          </button>
        </nav>
      </aside>
    </>
  );
}